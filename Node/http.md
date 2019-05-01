# Node是如何做服务端的工作的

```javascript
var http = require('http');
var server = http.createServer();
server.on('request',function(req, res){
  //console.log('收到请求了，请求路径是：' + req.url);

  //res.write('hello world');
  //res.end();

  //上面的方法比较麻烦
  //res.end('hello world');

  // 告诉浏览器返回的信息是utf-8编码，防止浏览器出现中文乱码
  res.setHeader('Content-Type', 'text/plain; charset = utf-8');
  var url = req.url;
  if(url === '/'){
    res.end('index page');
  } else if(url === '/login'){
    res.end('login page');
  } else {
    res.end('404 Not Found');
  }
});

server.listen(3000, function(){
    console.log('服务器启动成功，可以访问了。。。');
});
```

>[Content-Type对照表参考](http://tool.oschina.net/commons)

## 实现一个简单的Apache服务器

即浏览器通过url访问服务器资源

```js
var http = require('http');
var fs = require('fs');
var server = http.createServer();

var wwwDir = 'C:/www/app';   //服务器根目录，可配置
server.on('request',function(req, res){
  var url = req.url;
  var filePath = '/index.html';
  if(url !== '/'){
    filePath = url;
  }

  fs.readFile(wwwDir + filePath, function(err, data){
    if(err){
      return res.end('404 Not Found.');
    }
    res.end(data);
  })
});

server.listen(3000, function(){
  console.log('服务器启动成功，可以访问了。。。');
});
```

- 浏览器通过url访问服务器资源

    - 浏览器直接输入url访问
    - 请求的文档中通过src和herf来访问静态资源
    - 404.html
    - 重定向  P32
    - 表单提交，get请求  P31

