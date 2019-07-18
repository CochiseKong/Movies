import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
import Home from './pages/home/loadable';
import NoMatch from './pages/NoMatch';

export default class ERouter extends React.Component {

  render() {
    return (
      <BrowserRouter>
          <Switch>
            {/* 独立路由页面 */}
            <Route path="/login" component={Login} />
            {/* 拥有子路由页面 */}
            <Route path="/" render={() =>
              <Admin>  {/* 子路由主页 */}
                <Switch>
                  <Route path='/home' component={Home} />
                  <Redirect to="/home" /> 无匹配重定向
                  {/* <Route component={NoMatch} /> 无匹配指定跳转 */}
                </Switch>
              </Admin>
            } />
          </Switch>
      </BrowserRouter>
    );
  }
}