const Router = require('koa-router')
const services = require('../services/todo')

const router = new Router()

router.get('/', (ctx, next) => {
  ctx.titile = 'KOA'
  ctx.body = 'hello koa'
})

router.post('/todo/add', async (ctx, next) => {
	let data
	try{
		const title = ctx.request.body.title
		data = await services.addTodo(title)
	} catch (e) {
		ctx.response.status = e.status || 500
		data = {
			status: 0,
			msg: e.message
		}
	}
	ctx.body = data
})

router.get('/todo/list', async (ctx, next) => {
	let data
	try{
		data = await services.getTodoList()
	} catch (e) {
		ctx.response.status = 500
		data = {
			code: 0,
			msg: '获取列表失败'
		}
	}
	ctx.body = data
})

module.exports = router
