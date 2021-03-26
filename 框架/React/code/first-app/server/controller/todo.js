const services = require('../services/todo')

const addTodo = async (ctx) => {
	let data
	try {
		const {title} = ctx.request.body
		data = await services.addTodo(title)
	} catch (e) {
		ctx.response.status = e.status || 500
		data = {
			status: 0,
			msg: e.message
		}
	}
	ctx.body = data
}

const getTodoList = async (ctx) => {
	let data
	try {
		data = await services.getTodoList()
	} catch (e) {
		ctx.response.status = 500
		data = {
			code: 0,
			msg: e.message
		}
	}
	ctx.body = data
}

const deleteTodo = async (ctx) => {
	let data
	try {
		const {title} = ctx.request.body
		data = await services.deleteTodo(title)
	} catch (e) {
		ctx.response.status = e.status || 500
		data = {
			code: 0,
			msg: e.message
		}
	}
	ctx.body = data
}

const toggleTodo = async (ctx) => {
	let data
	try {
		const {title, isFinished} = ctx.request.body
		data = await services.toggleTodo(title, isFinished)
	} catch (e) {
		ctx.response.status = e.status || 500
		data = {
			code: 0,
			msg: e.message
		}
	}
	ctx.body = data
}

module.exports = {
	getTodoList,
	addTodo,
	deleteTodo,
	toggleTodo
}
