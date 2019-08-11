// @ts-ignore
const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx: any, next: any) => {
  ctx.body = 'hello koa'
})

router.get('/test', (ctx: any, next: any) => {
  ctx.body = '测试页面'
})

module.exports = router
