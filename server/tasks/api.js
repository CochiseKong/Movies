const rp = require('request-promise-native')  //http请求库
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

// 请求封装
async function fetchMovie(item) {
  const url = `https://api.douban.com/v2/movie/subject/${item.duobanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`
  const res = await rp(url)
  let body
  try {
    body = JSON.parse(res)
  } catch (error) {
    console.log(error);
  }
  console.log(body);

  return body
}


; (async () => {

  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false } },
      { summary: null },
      { summary: '' },
      { year: { $exists: false } },
      { title: '' },
    ]
  })

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)

    if (movieData) {
      let tags = movieData.tags || []

      movie.tags = []
      movie.summary = movieData.summary || ''
      movie.title = movieData.alt_title || movieData.title
      movie.rawTitle = movieData.title || ''
      movie.year = movieData.year || ''
      movie.movieTypes = movieData.genres || []

      let dates = movieData.pubdates || []
      let pubdates = []

      dates.map(item => {
        if (item && item.split('(').length > 0) {
          let parts = item.split('(')
          let date = parts[0]
          let country = '未知'

          if (parts[1]) {
            country = parts[1].split(')')[0]
          }

          pubdates.push({
            date: new Date(date),
            country
          })
        }
      })

      movie.pubdate = pubdates

      tags.forEach(tag => {
        movie.tags.push(tag)
      })

      await movie.save()
    }
  }

})()