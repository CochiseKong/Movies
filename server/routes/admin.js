import mongoose from 'mongoose'
import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
  Delete,
} from '../lib/decorator'
import { checkPassword, findOneRemove } from '../database/service/admin'
import { getAllMovies } from '../database/service/movie'

@Controller('/admin')
export default class AdminRouter {
  @Post('/login')
  @Required({
    body: ['email', 'password']
  })
  @Auth
  async adminLogin(ctx, next) {

    const { email, password } = ctx.request.body

    const data = await checkPassword(email, password)
    const { user, match } = data

    if (match) {
      ctx.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.username
      }

      return (ctx.body = {
        success: true,
        data: {
          email: user.email,
          username: user.username
        }
      })
    }

    return (ctx.body = {
      success: false,
      err: '密码错误'
    })

  }

  @Delete('/delete')
  @Required({
    query: ['id']
  })

  async remove(ctx, next) {
    const id = ctx.query.id
    await findOneRemove(id)
    const movies = await getAllMovies()
    
    return (ctx.body = {
      data: movies,
      success: true
    })
  }

}
