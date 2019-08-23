
import { Controller, Request, RequestMethod } from './decorator'

@Controller({ prefix: '/hello' })
class HelloController {
  @Request({ url: '/', method: RequestMethod.GET })
  async hello(ctx) {
    ctx.body = 'Hello World'
  }
}


module.exports = HelloController