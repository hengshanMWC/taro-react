import type { ApiResult, FetchCreateUserData, FetchTokenResult, FetchUserInfoResult } from './types'
import { request } from '@/helpers'

export function fetchToken(code: string): ApiResult<FetchTokenResult> {
  return request.get('/api/v2/wx/user/', {
    params: {
      code,
    },
  })
}

export function fetchCreateUser(code: string, data: FetchCreateUserData): ApiResult<FetchUserInfoResult> {
  return request.post('/api/v2/wx/user/', data, {
    params: {
      code,
    },
  })
}

export function fetchUserInfo(): ApiResult<FetchUserInfoResult> {
  return request.get('/api/v1/user/info')
}
