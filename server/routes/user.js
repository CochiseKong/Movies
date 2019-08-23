import { checkPassword } from '../database/service/admin';

const { Controller, Get, Post, Put, Delete } = require('../lib/decorator')

@Controller('/api/user')  //声明路由装饰器
export class userController {
  @Post('/')
  async login(ctx, next) {
    const { email, password } = ctx.require.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (cxt.body = {
        success: false,
        err: '用户不存在'
      })
    }
    if (matchData.match) {
      retuen(ctx.body = {
        success: true
      })
    }

    retuen(ctx.body = {
      success: false,
      err: '密码不正确'
    })

  }
}

