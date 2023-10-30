import type { AxiosError, AxiosInstance } from 'axios'
import { isUndefined } from 'lodash-es'
import errCode from 'err-code'
import { AppHttpCode } from '@/constant'

export interface RequestEvent {
  getToken?: () => Promise<string> | string
  tokenExpire?: (error: AxiosError<any>) => void
  serverError?: (error: Error & errCode.Extensions) => void
}
export function createBusinessRequest(
  request: AxiosInstance,
  on: RequestEvent = {},
) {
  request.interceptors.request.use(async (config) => {
    let token: string = ''
    if (on.getToken) {
      token = await on.getToken()
    }

    if (token && !config.headers.Authorization)
      config.headers.Authorization = `Bearer ${token}`

    return config
  })

  request.interceptors.response.use(
    (response) => {
      const res = response?.data
      // res 有值
      if (res || response.config?.responseType === 'blob') {
        if (!(isUndefined(res.code) || isUndefined(res.msg))) {
          if (res.code === AppHttpCode.SUCCESS)
            return res.data || null

          else
            return Promise.reject(errCode(new Error(res.msg), res.code))
        }
        else {
          return res
        }
      }
      return null
    },
    async (error: AxiosError<any>) => {
      const response = error.response
      if (response?.status === 401) {
        on.tokenExpire && on.tokenExpire(error)
      }
      else {
        on.serverError && on.serverError(error)
        const data = error?.response?.data
        return Promise.reject(errCode(new Error(data.msg), data.code, { data: data.error }))
      }
    },
  )
}
