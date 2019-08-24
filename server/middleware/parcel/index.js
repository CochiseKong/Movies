// 判断当前进程是开发环境还是生成模式
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

module.exports = require(`./${env}.js`)
