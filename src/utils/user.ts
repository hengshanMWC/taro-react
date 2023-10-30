import Taro from '@tarojs/taro'
import { $enum } from 'ts-enum-util'
import { UserCacheKey } from '../constant'

export async function getToken() {
  const { data } = await Taro.getStorage<string>({
    key: UserCacheKey.TOKEN,
  })
  return data
}

export function setToken(data: string) {
  return Taro.setStorage({
    key: UserCacheKey.TOKEN,
    data,
  })
}

export function clearUserInfo() {
  const cacheKeyList = $enum(UserCacheKey).getValues()
  const list = cacheKeyList.map((key) => {
    return Taro.removeStorage({ key })
  })
  return Promise.all(list)
}
