const { getAllMovies, getSingleMovie, getRelativeMovies } = require('../database/service/movie')

const { Controller, Get, Post, Put, Delete } = require('../lib/decorator')
//声明路由装饰器
@Controller('/movies')
export default class MovieRouter {
  @Get('/all')
  async getMovieList(ctx, next) {
    const type = ctx.query.type
    const year = ctx.query.year
    const movies = await getAllMovies(type, year)

    ctx.body = {
      data: movies,
      success: true
    }
  }

  @Get('/detail/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getSingleMovie(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}

