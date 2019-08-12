const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/first_app', { useNewUrlParser: true })

const todoSchema = new Schema({
	title: String,
	isFinished: Boolean
})

// 将文档发布为模型
// 第一个参数传入一个大写名词单数字符串用来表示库表（集合）名称，mongoose会自动将大写名词的字符串
// 生成小写复数形式的集合名称
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
