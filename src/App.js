import React, { Component } from 'react'

import glam, { Div } from 'glamorous'
import 'antd/dist/antd.css'
import { Layout } from 'antd'

import Header from './containers/Header'
import Routes from './components/Routes'

const AppBase = glam(Layout)({
  minHeight: '100vh',
})

const Content = glam(Layout.Content)({ padding: 50 })

class App extends Component {
  render() {
    return (
      <AppBase>
        <Header />
        <Content>
          <Routes />
        </Content>
      </AppBase>
    )
  }
}

export default App
