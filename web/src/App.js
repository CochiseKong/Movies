import React from 'react';
import { GlobalStyle } from "./style";  //导入公共样式
import { Provider } from "react-redux";  //状态管理
import store from "./store";
import Router from "./router";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
