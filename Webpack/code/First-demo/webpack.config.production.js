// webpack 是node写出来的 node的写法
let path = require('path')

module.exports = {
	mode: 'development', // 模式 默认两种 production development
	entry: './src/index.js',
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, 'dist')
	}
}
