const Koa = require("koa")
// const statics = require('koa-static')
// const router = require('./routes/movie')
// const path = require('path')
const { database, initSchemas } = require('./database/init')
import { join } from 'path'
import R from 'ramda'
const MIDDLEWARES = ['router']

// const staticPath = '../web/build'

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        e => e(app)
      ),
      require,
      name => join(__dirname, `./middleware/${name}`)
    )
  )(MIDDLEWARES)
}

  // 启动数据库
  ; (async () => {
    await database()
    // require('./tasks/trailer')
    require('./tasks/api')
    const app = new Koa
    await useMiddlewares(app)
    app.listen(4545)
  })()
