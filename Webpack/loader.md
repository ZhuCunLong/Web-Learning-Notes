# loader

## 常用loader

### babel-loader

- 依赖：
  - babel-loader
  -  @babel/core 
- 功能，对js文件做兼容处理，可配合@babe/preset-env等插件(？)

```js
module:{
  rules:[
    {
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options:{
        presets:['@babel/preset'],
        cacheDirectory: true // 开启babel缓存
      }
    }
  ]
}
```

#### 相关插件

- @babel/preset-env 只能转换基本语法，如promise不能转换

- @babel/polyfill 全部js兼容性处理

  可以通过在想要做兼容性处理的js文件中import这个库即可，但是这样会把全部兼容性代码引入，体积太大，否则使用core-js包

- core-js

  可以按需加载polyfill

  ```js
  module:{
    rules:[
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options:{
          presets:[
            '@babel/preset',
          	{
              // 按需加载
              useBuiltIns: 'usage',
              // 指定core-js版本
              corejs: {
                version: 3
              },
              targets:{
                chrome: '60',
                filefox: '60',
                ie: '9'
              }
            }]
        }
      }
    ]
  }
  ```

### postcss-loader

对css文件做兼容性处理

## loder实现

loder本质上是一个函数，用来处理文件

详细demo见code目录

- 默认方法，包含三个参数，倒序执行

```js
module.exports = function (content, map, meta) {
	console.log('1111')
	console.log('content:', content)
	console.log('map:', map)
	console.log('meta:', meta)
	return content
}
```

- pitch方法，顺序执行

```js
module.exports.pitch = function () {
	console.log('1111')
}
```

### 同步/异步loader

- 同步方式

上述是一种同步loader的实现方式，下面介绍第二种

```js
module.exports = function (content, map, meta) {
	console.log('1111')
	console.log('content:', content)
	console.log('map:', map)
	console.log('meta:', meta)
  // 第一个参数为错误信息
	this.callback(null, content, map, meta)
}
```

- 异步方式

  推荐使用这种方式来实现loader？

```js
module.exports = function (content, map, meta) {
  const callback = this.async()
  setTimeout(() => {
    console.log('1111')
    console.log('content:', content)
    console.log('map:', map)
    console.log('meta:', meta)
    callback(null, content)
  })
}
```

### 获取loader的option

使用`loader-utils`插件，但是我发现`this`上本身就有一个getOptions方法，很奇怪

```js
const { getOptions } = require('loader-utils')
module.exports = function (content, map, meta) {
 console.log('3333')
 console.log(this.getOptions())
 const options = getOptions(this)
 console.log(333, options)
 return content
}
```

### 实战：实现babel-loader

