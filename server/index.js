const Koa = require("koa")
const { database, initSchemas } = require('./database/init')
import { join } from 'path'
import R from 'ramda'
const MIDDLEWARES = ['general','router', 'parcel']


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
    // require('./tasks/qiniu')
    const app = new Koa
    await useMiddlewares(app)
    app.listen(4545)
  })()
