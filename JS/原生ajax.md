# 原生ajax

## XHR基本用法

ajax的核心技术是XMLHttpRequest对象（简称XHR），这种技术就是无须刷新页面即可从服务器取得数据。

先来看一个简单的例子

```js
var xhr = new XMLHttpRequest();
xhr.open('get','http://xxxxx',false);
xhr.onreadystatechange = function(){
  if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304){
    console.log(xhr.responseText);
  } else {
    console.log('Request was unsuccessful:' + xhr.status)
  }
}
xhr.send(null)
```

分析下每行代码

1. 创建xhr对象

2. 调用open()方法，表示创建一个具体的请求，该方法有三个参数，其中两个参数非常常见，请求方式和请求的url，第三个参数是一个bool类型，表示该请求是同步还是异步，false为同步，true为异步

3. onreadystatechange，顾名思义，从这个属性的名字来看，是当`readyState`这个属性发生变化的时候触发的回调事件，那么readyState的所有取值以及意义是什么呢如下：

   - 0：未初始化。尚未调用open()方法
   - 1：启动。已经调用open()方法，但尚未调用send()方法。
   - 2：发送。已经调用send()方法，但尚未接收到响应。
   - 3：接收。已经接收到部分响应数据。
   - 4：完成。已经接收到全部响应数据，而且已经可以再客户端使用了。

   由于该例子中使用的是同步的方法，所以只有当数据全部获取完之后才会触发这个回调函数。

4. 调用send()方法，发送请求。注意，在调用open()方法时，并未真正的发送请求，在调用send()方法时，之前创建的请求才会真正发送。

上文中的代码是一个同步ajax请求，onreadstatechange只会在收到响应请求结束之后才调用，但是一般为了优化性能，会将ajax设置为异步，那么只需要在onreadstatechange事件中加一层判断

```js
// ...
xhr.onreadystatechange = function(){
  if(xhr.readyState===4){
    // TO ADD
  }
}
// ...
```

## 给请求添加头部信息

如果我们现在要提交一个表单，那么是不是得在请求头中添加这样一个请求头

Content-Type: application/x-www-form-urlencoded

具体做法，在调用send()方法之前调用setRequestHeader()方法

```js
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
```

## 手写封装ajax

```js
function ajax(args){
  const xhr = new XMLHttpRequest();
  xhr.open(args.type, args.url,args.async);
  xhr.setRequestHeader('Content-type',args.contenType);
  xhr.onreadystatechange = function(){
    if(this.readyState === 4){
      if(this.status >= 200 && this.status < 300 || this.status === 304){
        args.success(this.response.data);
      } else {
        args.error && args.error(this)
      }
    }
  }
}
ajax({
  type: 'post',
  url: 'http://127.0.0.1/admin/list/',
  data: JSON.stringify(list),
  contentType: "application/json;charset=UTF-8",
  async: true,
  success: function(res){
    console.log(res)
  },
  error: function(e){
    console.log(e.status);
    console.log(e.responseText);
  }
});
```

