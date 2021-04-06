# loader

## babel-loader

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

### 相关插件

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

## postcss-loader

对css文件做兼容性处理

