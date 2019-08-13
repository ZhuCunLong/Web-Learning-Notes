const Todo = require('../model/todo')

const getTodoList = async () => {
	return new Promise((resolve, reject) => {
		Todo.find((err, ret) => {
			if (err) {
				err.status = 500
				reject(err)
			} else {
				resolve({
					code: 1,
					data: ret,
					msg: '数据获取成功'
				})
			}
		})
	})
}

const addTodo = async (title) => {
	if (await Todo.exists({title})) {
		const e = new Error(`${title}已存在，请勿重复添加`)
		e.status = 200
		return Promise.reject(e)
	}
	return new Promise(async (resolve, reject) => {
		const todo = new Todo({title, isFinished: false})
		todo.save(err => {
			if (err) {
				reject(err)
			} else {
				resolve({
					status: 1,
					msg: '插入成功，verygood'
				})
			}
		})
	})
}

module.exports = {
	getTodoList,
	addTodo
}
