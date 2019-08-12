const Todo = require('../model/todo')

const getTodoList = async () => {
	return new Promise((resolve, reject) => {
		Todo.find((err, ret) => {
			if (err) {
				reject(err)
			} else {
				resolve(ret)
			}
		})
	})
}

const addTodo = async (title) => {
	return new Promise(async (resolve, reject) => {
		if(await Todo.exists({ title })){
			reject(`${title}已存在，请勿重复添加`)
		} else {
			const todo = new Todo({title, isFinished: false})
			todo.save(err => {
				if (err) {
					reject(err)
				} else {
					resolve({
						code: 200,
						msg: '插入成功，verygood'
					})
				}
			})
		}
	})
}

module.exports = {
	getTodoList,
	addTodo
}
