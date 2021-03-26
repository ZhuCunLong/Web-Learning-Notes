const Todo = require('../model/todo')

const getTodoList = async () => {
	return new Promise((resolve, reject) => {
		Todo.find((err, ret) => {
			if (err) {
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
					msg: `${title}插入成功，very good`
				})
			}
		})
	})
}

const deleteTodo = async (title) => {
	if (await Todo.exists({title})) {
		return new Promise((resolve, reject) => {
			Todo.deleteOne({title},async (error) => {
				if(error){
					reject(error)
				} else {
					const {data} = await getTodoList()
					resolve({
						status: 1,
						data,
						msg: `${title}删除成功,very good`
					})
				}
			})
		})
	} else {
		const err = new Error(`"${title}"不存在，删除失败`)
		err.status = 200
		return Promise.reject(err)
	}
}

const toggleTodo = async (title, isFinished) => {
	if(await Todo.exists({title})){
		return new Promise(async (resolve, reject) => {
			try {
				isFinished = !isFinished
				await Todo.updateOne({title},{isFinished})
				// const {data} = await getTodoList()
				const data = await Todo.find()
				resolve({
					data,
					status: 1,
					msg: '状态切换成功'
				})
			} catch (e) {
				reject(e)
			}
		})
	} else {
		const err = new Error(`"${title}"不存在，切换失败`)
		err.status = 200
		return Promise.reject(err)
	}
}

module.exports = {
	getTodoList,
	addTodo,
	deleteTodo,
	toggleTodo
}
