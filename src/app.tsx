import type { PropsWithChildren } from 'react'
import { Component } from 'react'

import './app.css'

import './styles/tailwind.css'

class App extends Component<PropsWithChildren<any>> {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
