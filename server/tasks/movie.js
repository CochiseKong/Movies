const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

  ; (async () => {
    const script = resolve(__dirname, '../crawler/trailer-list.js')
    const child = cp.fork(script, [])
    let invoked = false

    child.on('error', err => {
      if (invoked) return
      invoked = true
      console.log(err);
    })

    child.on('exit', code => {
      if (invoked) return
      invoked = false
      let err = code === 0 ? null : new Error('exit code' + code)
      console.log(err);
    })

    child.on('message', data => {
      let result = data.result
      result.forEach(async item => {
        let movie = await Movie.findOne({  //对比数据库中的ID
            doubanId : item.doubanId
        })
        if (!movie) {  //不存在就新建一条
          movie = new Movie(item)
          await movie.save()
        }
      })
      // console.log(result);
    })

  })()