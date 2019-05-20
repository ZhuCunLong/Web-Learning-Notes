let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'development', // 模式 默认两种 production development
	entry: './src/index.js',
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [ // 数组 放着所有的webpack插件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: "index.html",
		}),
		new MiniCssExtractPlugin({
			filename: 'main.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				]
			}
		]
	}
}
