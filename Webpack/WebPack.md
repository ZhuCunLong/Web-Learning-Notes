# WebPack

## webpack安装

- 安装本地的webpak
- 需要安装两个包，分别是`webpack`，`webpack-cli`

```shell
npm i webpack webpack-cli
```

## webpack可以进行0配置

- 打包工具- -> 输出后的结果（js模块）

执行以下命令开始0配置打包

```shell
npx webpack
```

## 手动配置webpack

- 默认配置文件的名字`webpack.config.js`

### 修改配置文件的名称

- `package.json`文件中修改`scripts.build`的值就可以修改默认配置文件

```json
{
  "name": "First-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.my.js",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "css-loader": "^2.1.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
  }
}
```

执行以下命令开始根据配置文件信息进行打包

```shell
npm run build
```

### 修改默认的项目入口以及打包位置

- `webpack.config.js`

```js
// webpack 是node写出来的 node的写法
let path = require('path')

module.exports = {
  mode: 'development', // 模式 默认两种 production development
	entry: './src/index.js',  // 设置项目入口
	output: {
		filename: "main.js", // 设置打包好之后的文件名称
		path: path.resolve(__dirname, 'build')  // 设置打包路径
	}
}
```

### 添加服务器相关配置

在`module.exports`中添加如下`key-value`

```js
devServer:{ // 开发服务器的配置
  port: 3000,      //端口号
  progress: true,   //进度条
  contentBase: './build',  // 默认根目录
  compress:true  // 是否压缩
}
```

### 添加html插件

- 安装`html-webpack-plugin`插件

```shell
npm i html-webpack-plugin
```

- 引包

```js
let HtmlWebpackPlugin = require('html-webpack-plugin')
```

在`module.exports`中添加如下`key-value`

```js
plugins: [ // 数组 放着所有的webpack插件
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: "index.html",
    minify: {    // 压缩html代码
      removeAttributeQuotes: true,  // 去掉标签中属性的分号
      collapseWhitespace: true // 将html文件压缩为单行
    },
    hash: true
  })
]
```

使用minify会对生成的html文件进行压缩。默认是false。

`html-webpack-plugin`内部集成了 `html-minifier`,因此，还可以对minify进行配置：

> 注意，虽然minify支持BooleanObject,但是不能直接这样写：minify: true , 这样会报错 `ERROR in TypeError: Cannot use 'in' operator to search for 'html5' in true` , 使用时候必须给定一个 `{ } `对象 

### 添加解析css的相关依赖

- 安装`css-loader`

```shell
npm i css-loader --save
```

用来解析`@import`这种语法

- 安装`style-loader`

```shell
npm i style-loader --save
```

把css插入到head标签中

在`module.exports`中添加如下`key-value`

```js
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
```

### 抽离css插件

上面的那种加载css的方法会把所有的css通过`<style></style>`标签加入到html文件中，容易造成阻塞

- `mini-css-extract-plugin`

```shell
npm install mini-css-extract-plugin --save
```

在`plugins`数组中新增一个对象

```js
new MiniCssExtractPlugin({
  filename: 'main.css'
})
```

### 自动给css属性添加前缀

- `postcss-loader`和`autoprefixer`

```js
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
```

>要注意`css-loader`和`postcss-loader`的先后顺序

- 同时还要添加配置文件`postcss.config.js`

```js
module.exports = {
	plugins: [require('autoprefixer')]
}
```

会自动给css属性中类似`transform`等属性加上前缀`-webkit-`

### 压缩css

- `optimize-css-assets-webpack-plugin`

- 引包

```js
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
```

在`module.exports`中添加如下`key-value`

```js
optimization:{
  minimizer:[
    new OptimizeCss()
  ]
}
```

### es6转换

- `babel`相关插件

## Plugins和Loader

plugins和loader很容易搞混，说都是外部引用有什么区别呢？ 事实上他们是两个完全不同的东西。这么说**loaders负责的是处理源文件的如css、js，一次处理一个文件。而plugins并不是直接操作单个文件，**它直接对整个构建过程起作用下面列举了一些我们常用的plugins和他的用法