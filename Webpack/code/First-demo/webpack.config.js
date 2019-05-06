// webpack 是node写出来的 node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devServer:{ // 开发服务器的配置
		port:3000,
		progress:true,
		contentBase: './build',
		compress:true
	},
	mode: 'development', // 模式 默认两种 production development
	entry: './src/index.js',
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, 'build')
	},
	plugins: [ // 数组 放着所有的webpack插件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: "index.html",
			minify: {    // 压缩html代码
				removeAttributeQuotes: true,
				collapseWhitespace: true
			},
			hash: true
		})
	],
	module: { // 模块
		rules: [ // 规则
			{ // css loader 解析@import这种语法
				// style-loader 它是把css插入到head的标签中
				// loader的特点 希望单一
				// loader的用法 字符串只用一个loader
				// 多个loader需要[]
				// loader的顺讯 默认是从右向左执行  从下到上执行
				// loader还可以写成  对象方式
				test: /\.css$/,
				use: [
					{
						loader:'style-loader',
						options: {
							insertAt: 'top'
						}
					},
					'css-loader'
				]
			}
		]
	}
}
