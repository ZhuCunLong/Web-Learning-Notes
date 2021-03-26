const Router = require('koa-router')
const services = require('../services/todo')
const controller = require('../controller/todo')

const router = new Router()

router.get('/', (ctx, next) => {
  ctx.titile = 'KOA'
  ctx.body = 'hello koa'
})

router.get('/todo/list', async (ctx, next) => {
	await controller.getTodoList(ctx)
})

router.post('/todo/add', async (ctx, next) => {
	await controller.addTodo(ctx)
})

router.post('/todo/delete', async (ctx, next) => {
	await controller.deleteTodo(ctx)
})

router.post('/todo/toggle', async (ctx, next) => {
	await controller.toggleTodo(ctx)
})

module.exports = router
