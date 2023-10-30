import { create } from 'zustand'
import type { UserInfo } from '@/apis'

type StoreUserInfo = UserInfo | null

interface UseUserStore {
  userInfo: StoreUserInfo
  isLogin: () => boolean
  setUserInfo: () => void
  clear: () => void
}

export const useUserStore = create<UseUserStore>((set, get) => ({
  userInfo: null,
  isLogin: () => !!get().userInfo,
  setUserInfo: () => set(state => ({ userInfo: state.userInfo })),
  clear: () => set(() => ({ userInfo: null })),
}))
