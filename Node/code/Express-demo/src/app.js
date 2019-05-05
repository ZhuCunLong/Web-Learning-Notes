var express = require('express')
var router = require('./router')

var app = express()

app.set('views', '../views')
// 公开指定目录
// 只要这样做了，你就可以直接通过/public/xx 的方式访问public目录中的所有资源了
app.use('/public/', express.static('../public'))
app.use('/node_modules', express.static('../node_modules'))
//去掉第一个参数，url可以通过 省略/public的方式来访问资源
//app.use(express.static('./public'))

//app.use('/a/', express.static('./public'))

/*app.use('/',function(req, res, next){
	console.log(1)
	next()
})*/
app.engine('html', require('express-art-template'))

app.use(router)

app.use(function (req, res) {
	res.render('404.html')
})

app.listen(3000, function () {
	console.log('app is running ...')
})
