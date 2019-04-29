const express = require('express')
const Student = require('./student')

const router = express.Router()

router.get('/', function (req, res) {
	res.send('hello express!')
})

router.get('/about', function (req, res) {
	res.send('你好，我是express')
})

router.get('/index', function (req, res) {
	Student.find(function (err, students) {
		if(err){
			return res.status(500).send('Server error')
		}
		res.render('index.html', {
			students:students
		})
	})
})

module.exports = router
