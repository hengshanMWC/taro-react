import { Button, Image, Text, View } from '@tarojs/components'
import React, { useCallback } from 'react'
import { useEnv, useModal, useNavigationBar, useToast } from 'taro-hooks'
import logo from './hook.png'

import './index.css'

function Index() {
  const env = useEnv()
  const { setTitle } = useNavigationBar({ title: 'Taro Hooks' })
  const showModal = useModal({
    title: 'Taro Hooks Canary!',
    showCancel: false,
    confirmColor: '#8c2de9',
    confirmText: '支持一下',
  })
  const { show } = useToast({ mask: true })

  const handleModal = useCallback(() => {
    showModal({ content: '不如给一个star⭐️!' }).then(() => {
      show({ title: '点击了支持!' })
    })
  }, [show, showModal])

  return (
    <View className="flex flex-col">
      <Image className="block mt-0 mb-0 mr-auto ml-auto w-32 h-32" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro! 更多信息可以查看新版文档: https://next-version-taro-hooks.vercel.app/
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle('Taro Hooks Nice!')}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
    </View>
  )
}

export default Index
