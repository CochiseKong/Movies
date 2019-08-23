const { getAllMovies, getSingleMovie, getRelativeMovies } = require('../database/service/movie')

const { Controller, Get, Post, Put, Delete } = require('../lib/decorator')
//声明路由装饰器
@Controller('/api/movies')
export class movieController {
  @Get('/')
  async getMovies(ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)
    ctx.body = {
      movies
    }
  }

  @Get('/:id')
  async getMoviesDetail(ctx, next) {
    const id = ctx.params.id
    const movies = await getSingleMovie(id)
    const relativeMovies = await getRelativeMovies(movie)
    ctx.body = {
      data: {
        movies,
        relativeMovies
      },
      success: true
    }
  }
}

