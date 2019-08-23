const puppteer = require('puppeteer')  //爬虫库
const base = `https://movie.douban.com/subject/`  //数据网站
const duobanId = '26884354'
const videoBase = `https://movie.douban.com/trailer/248591`

// 异步睡眠
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

  // 自执行异步函数
  ; (async () => {
    console.log('Start Crawler');
    // 创建爬虫对象
    const browser = await puppteer.launch({
      args: ['--no-sandbox'],
      dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(base + duobanId, {
      waitUntil: 'networkidle2'
    })
    await sleep(1000)

    const result = await page.evaluate(() => {
      // 获取 JQ 对象
      var $ = window.$
      // 获取视频元素
      var it = $('.related-pic-video')

      if (it && it.length > 0) {
        var link = it.attr('href')
        var cover = it.css('background-image').replace('url(\"', '').replace('\")', '')
        return {
          link,
          cover
        }
      }

      return {}
    })

    let video 

    // 判断是否有视频链接
    if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(2000)
      // 爬取视频
      video = await page.evaluate(() => {
        var $ = window.$
        var it = $('source')
        if (it && it.length > 0) {
          return it.attr('src')
        }
        return ''
      })
    }

    const data = {
      video,
      duobanId,
      cover: result.cover
    }


    browser.close()  //关闭爬虫
    process.send(data)  //发送数据
    process.exit(0)   //关闭

  })()