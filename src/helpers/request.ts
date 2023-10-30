import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import Taro from '@tarojs/taro'
import { createBusinessRequest, errorToast } from '@/sdk'
import appConfig from '@/config'
import { getToken } from '@/utils'
import { useUserStore } from '@/stores/user'

const config: CreateAxiosDefaults = {
  timeout: appConfig.api.timeout,
  baseURL: appConfig.api.baseUrl,
}

const request = axios.create(config)
const refreshTokenRequest = axios.create(config)

createBusinessRequest(request, {
  getToken,
  tokenExpire() {
    useUserStore.getState().clear()
    Taro.switchTab({
      url: '/pages/login/index',
    })
  },
  serverError(error) {
    if (error.code === 500) {
      errorToast('网络错误!')
    }
    else if (error.code === 404) {
      errorToast('接口404')
    }
    else if (error.code === 429) {
      errorToast('您太快了,请稍后重试!')
    }
    else if (error.code === 403) {
      errorToast('您无权访问')
    }
    else if (error.code === 400 || error.code === 422) {
      errorToast(error.response.data.message)
    }
  },
  error(error) {
    console.log('request error', error)
  },
})

export {
  request,
  refreshTokenRequest,
}
