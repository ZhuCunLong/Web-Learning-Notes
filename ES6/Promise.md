# Promise

为了解决回调地狱问题，所以在ES 6中新增了一个API：`Promise`

![1556869600994](.\assets\1556869600994.png)

Promise基本语法

```js
const fs = require('fs')

//console.log(1)

// promise本身不是异步
const p1 = new Promise(function (resolve, reject) {
	//console.log(2)
	fs.readFile('./data/aa.txt', 'utf-8', function (err, data) {
		if (err) {
			//console.log(err)

			reject(err)
		} else {
			/*console.log(3)
			console.log(data)*/

			resolve(data)
		}
	})
})

//console.log(4)

// 执行结果1 2 4 3

p1.then(data =>{
	console.log(data)
}, err => {
	console.log('读取文件失败了', err)
})
```

封装Promise版本的`readFile`

```js
const fs = require('fs')

function pReadFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

pReadFile('./data/a.txt').then(data => {
	console.log(data)
	return pReadFile('./data/b.txt')
}).then(data => {
	console.log(data)
	return pReadFile('./data/c.txt')
}).then(data => {
	console.log(data)
})
```



