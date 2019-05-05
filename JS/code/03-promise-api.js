const fs = require('fs')

console.log(1)
const p1 = new Promise(function (resolve, reject) {
	console.log(2)
	fs.readFile('./data/a.txt', 'utf-8', function (err, data) {
		if (err) {
			reject(err)
		} else {
			console.log(3)
			resolve(data)
		}
	})
})

const p2 = new Promise(function (resolve, reject) {
	console.log(4)
	fs.readFile('./data/b.txt', 'utf-8', function (err, data) {
		if (err) {
			reject(err)
		} else {
			console.log(5)
			resolve(data)
		}
	})
})

const p3 = new Promise(function (resolve, reject) {
	console.log(6)
	fs.readFile('./data/c.txt', 'utf-8', function (err, data) {
		if (err) {
			reject(err)
		} else {
			console.log(7)
			resolve(data)
		}
	})
})

console.log(8)

p1.then(data =>{
	console.log(data)
	return p2
}, err => {
	console.log('读取文件失败了', err)
}).then(data => {
	console.log(data)
	return p3
}, err => {
	console.log('读取文件失败了', err)
}).then(data => {
	console.log(data)
}, err => {
	console.log('读取文件失败了', err)
})

console.log(9)
