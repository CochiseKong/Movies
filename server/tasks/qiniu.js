const qiniu = require("qiniu")
const nanoid = require('nanoid')
const config = require('../../config')
const path = require('path');

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const bucketManager = new qiniu.rs.BucketManager(mac, cfg);

// 上传七牛函数
const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    bucketManager.fetch(url, bucket, key, function (err, respBody, respInfo) {
      if (err) {
        reject(err)
      } else {
        if (respInfo.statusCode == 200) {
          resolve({ key })
          console.log(respBody);
        } else {
          reject(respInfo)
        }
      }
    });
  })
}

// 自执行函数
  ; (async () => {
    let movies = [{
      duobanId: 26884354,
      video: 'http://vt1.doubanio.com/201907191320/525262403cbd11cce1d264142e559912/view/movie/M/402480591.mp4',
      title: '狮子王',
      star: 7.4,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2559742751.webp',
      cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559742751.webp'
    }]

    movies.map(async movie => {
      if (movie.video && !movie.key) {
        try {
          let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
          let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
          let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')
          if (videoData.key) {
            movie.videoKey = videoData.key
          }
          if (coverData.key) {
            movie.coverData = coverData.key
          }
          if (posterData.key) {
            movie.posterData = posterData.key
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  })()