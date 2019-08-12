const Router = require('koa-router')
const services = require('../services/todo')

const router = new Router()

router.get('/', (ctx, next) => {
  ctx.titile = 'KOA'
  ctx.body = 'hello koa'
})

router.get('/todo/add', async (ctx, next) => {
	let data
	try{
		data = await services.addTodo('吃饭')
	} catch (e) {
		data = {
			code: 0,
			msg: e
		}
	}
	ctx.body = data
})

router.get('/todo/list', async (ctx, next) => {
	let data
	try{
		data = {
			data: await services.getTodoList()
		}
	} catch (e) {
		data = {
			code: 0,
			msg: '获取列表失败'
		}
	}
	ctx.body = data
})

module.exports = router
