import { lazy } from 'react' //懒加载
// import AC from './components/async_load'
export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: lazy(() => import('./views/home'))
  },
  {
    name: '详情页',
    path: '/detail/:id',
    component: lazy(() => import('./views/movie/detail'))
  },
  {
    name: '登录',
    path: '/login',
    component: lazy(() => import('./views/login'))
  }
  // {
  //   name: '类型列表页',
  //   path: '/list/:type',
  //   component: lazy(() => import('./views/home'))
  // },
  // {
  //   name: '年份列表页',
  //   path: '/year/:year',
  //   component: lazy(() => import('./views/home'))
  // },
  // {
  //   name: '后台入口',
  //   icon: 'admin',
  //   path: '/admin',
  //   component: lazy(() => import('./views/login'))
  // },
  // {
  //   name: '后台列表页面',
  //   icon: 'admin',
  //   path: '/admin/list',
  //   component: lazy(() => import('./views/admin'))
  // }
]
