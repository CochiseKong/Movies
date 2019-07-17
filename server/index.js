const Koa = require("koa")
const app = new Koa
const views = require('koa-views')
const statics = require('koa-static')
const path = require('path')

const staticPath = './static'

app.use(statics(
  path.join(__dirname, staticPath)
))

app.listen(8080)