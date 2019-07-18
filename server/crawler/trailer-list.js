const url = `https://movie.douban.com/cinema/nowplaying/guangzhou/`  //数据网站
const puppteer = require('puppeteer')  //爬虫库

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
    await page.goto(url, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)

    // 获取页面查看全部按钮
    await page.waitForSelector('.more')

    await sleep(2000)
    // 点击查看全部
    await page.click('.more')

    const result = await page.evaluate(() => {
      // 获取 JQ 对象
      var $ = window.$
      // 获取数据元素
      var items = $('#nowplaying .lists .list-item')
      var links = []

      if (items.length >= 1) {
        items.each((index, item) => {
          let it = $(item)
          let duobanId = Number(it.attr('id'))
          let title = it.data('title')
          let star = it.data('score')
          let poster = it.find('.poster img').attr('src').replace('s_ratio', 'l_ratio')

          // 数据拼接
          links.push({
            duobanId,
            title,
            star,
            poster
          })

        })
      }
      return links
    })

    browser.close()  //关闭爬虫
    process.send({ result })  //发送数据
    process.exit(0)   //关闭

  })()