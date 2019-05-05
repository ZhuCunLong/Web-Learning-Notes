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
