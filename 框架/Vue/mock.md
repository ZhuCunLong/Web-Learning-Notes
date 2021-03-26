# 数据mock

1. vue-cli假数据，利用webpack-dev-server中内置的express

```js
module.exports = {
  configureWebpack: {
    // 扩展webpack
    devServer: {
      before(app) {
        // app其实就是个express
        app.get('/api/goods', function (req, res) {
          res.json({
            list: [
              { text: '百万年薪架构师', price: 100 },
              { text: 'web全栈架构师', price: 80 },
              { text: 'Python爬虫', price: 60 }
            ]
          });
        });
      }
    }
  }
}
```

2. easy-mock + proxy

开发项目大部分 都会采用swagui 或者easy-mock这种接口文档工具

