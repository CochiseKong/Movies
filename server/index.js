const Koa = require("koa")
const app = new Koa
const statics = require('koa-static')
const path = require('path')

const staticPath = '../web/build'

app.use(statics(
  path.join(__dirname, staticPath)
))

app.listen(8080)