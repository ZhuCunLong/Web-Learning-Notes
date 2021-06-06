const path = require('path')

module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				//loader: 'loader1'
				//loader: path.resolve(__dirname, 'loaders', 'loader1')
				use: [
					'loader1',
					'loader2',
					{
						loader: 'loader3',
						options: {
							name: '爷的自定义loader'
						}
					}
				]
			}
		]
	},
	// 配置loader解析规则，去哪找loader
	resolveLoader: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'loaders')
		]
	}
}
