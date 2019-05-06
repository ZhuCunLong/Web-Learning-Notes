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
	module: {
		rules: [
			{
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
