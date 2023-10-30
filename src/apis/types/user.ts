export interface FetchTokenResult {
  token: string
}

export interface UserInfo {
  nickname: string
  introduction: string
  mobile: string
  sex: string
  avatar: string
}

export interface FetchUserInfoResult {
  user: UserInfo
}

export interface FetchCreateUserData {
  rawData: string
  signature: string
  encryptedData: string
  iv: string
}
