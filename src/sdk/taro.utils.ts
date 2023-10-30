import Taro from '@tarojs/taro'

export function toast(title: string | Taro.showToast.Option) {
  let obj = title
  if (typeof title !== 'object') {
    obj = {
      title,
      icon: 'none',
    }
  }
  return Taro.showToast(obj as Taro.showToast.Option)
}

export function errorToast(title: string) {
  toast({
    title,
    icon: 'error',
  })
}
