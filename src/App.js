import React, { Suspense } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import Routes from './routes'
import 'antd/dist/antd.css'
import './assets/placeholder.sass'
import './assets/common.sass'

export default () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {
        Routes.map(
          ({ name, path, exact = true, component }) => (
            <Route path={path} exact={exact} component={component} key={name} />
          )
        )
      }
    </Switch>
  </Suspense>
)
