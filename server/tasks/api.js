const rp = require('request-promise-native')  //http请求库

// 请求封装
async function fetchMovie(item) {
  const url = `https://api.douban.com/v2/movie/subject/${item.duobanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`
  const res = await rp(url)
  return res
}

; (async () => {
  let movies = [
    {
      duobanId: 30201138,
      title: '机动战士高达NT',
      star: 6.2,
      poster:
        'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2558661806.webp'
    },
    // {
    //   duobanId: 26884354,
    //   title: '狮子王',
    //   star: 7.4,
    //   poster:
    //     'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2559742751.webp'
    // },
  ]

  // 遍历列表ID获取详情
  movies.map(async movie => { 
    let movieData = await fetchMovie(movie)
    try {
      movieData = JSON.parse(movieData)
      console.log(movieData);
    } catch (error) {
      console.log(error);    
    }
  })


})()