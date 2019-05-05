const fs = require('fs')


// ./a.txt 相对于当前文件路径
// ./a.txt 相对于执行node命令所处的终端路径
// 这不是错误，Node就是这样设计的
// 就是说，文件操作路径中，相对路径设计的就是相对执行node命令所处的路径
/*fs.readFile('./a.txt','utf8', (err, data) => {
	if(err){
		throw err
	}
	console.log(data)
})*/

fs.readFile(__dirname + '/a.txt','utf8', (err, data) => {
	if(err){
		throw err
	}
	console.log(data)
})
