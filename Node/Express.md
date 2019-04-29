# Express

原生的http在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码更高度统一。

- <http://expressjs.com/>

## 修改完代码自动重启

使用一个第三方命名行工具：`nodemon`来帮我们解决频繁修改代码重启服务器。

```shell
# 在任意目录执行该命令都可以
npm install --global nodemon
```

安装完毕之后，使用：

```shell
node app.js

# 使用nodemon
nodemon app.js
```

## 基本路由

get:

```js
app.get('/getxxx', function(req, res){
  res.send('helloworld')
})
```

post:

```js
app.post('/postxxx', function(req, res){
  res.send('Got a POST request')
})
```

## 静态服务

```js
// /public资源
app.use(express.static('public'))

// /public/xxx
app.use('/public', express.static('public'))
// /static/xxx
app.use('/static', express.static('public'))

app.use('/static', express.static(path.join(__dirname, 'public')))
```

## 在Express中配置使用`art-template`模板引擎

- [art-template-GitHub仓库](<https://github.com/aui/art-template>)

- [art-template 官方文档](<https://aui.github.io/art-template/zh-cn/index.html>)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

使用：

```js
app.get('/', function(req,res){
  res.render('index.html', {
    title: 'hello world'
  })
})
```

如果希望修改默认的`views`视图渲染存储目录，可以

```js
// 注意：第一个参数view千万不要写错
app.set('views', 目标路径)
```

## 在Express中获取表单GET请求参数

Express内置了一个API，可以直接通过`req.query`来获取

## 在Express中获取表单POST请求体数据

使用一个中间件`body-parser`

