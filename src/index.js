import "babel-polyfill"
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

const rootElement = document.getElementById('app')

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)

// if (module.hot) {
//   module.hot.dispose(function () {
//     // 模块即将被替换时
//     console.log('module will be replaced')
//   })

//   module.hot.accept(function () {
//     // 模块或其依赖项之一刚刚更新时
//     console.log('module update')
//   })
// }

