# post请求下载文件(兼容IE)

有时候由于下载文件的url携带的参数过多，导致整个url长度超过get请求的上限，这个时候需要更换为post请求，具体实现如下

```js
function downLoadFile (url, params, fileName) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.responseType = 'blob'
  xhr.send(JSON.stringify(params))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 兼容IE，只有IE浏览器的navigator有这个方法，谷歌浏览器没有
      if (navigator.msSaveBlob) {
        return navigator.msSaveBlob(xhr.response, fileName)
      }
      const blobUrl = URL.createObjectURL(xhr.response)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
      link.click()
    }
  }
}
```

与get请求方式不同的地方，不单单是请求参数的形式变换，这里使用原生xhr对象实现，实际项目中使用axios和fetch应该都是能够实现这个功能的，在请求中加上了`responseType`属性，设置为`blob`

## 兼容IE

为了兼容IE，需要用到`window.navigator.msSaveBlob`这个方法，看到`ms`就容易想到微软，MDN文档里面甚至没有把这个方法加到navigator对象的methods列表中，因为这玩意压根不是标准，也就懒得深究它了，这么用就完事了

## 标准浏览器

在非IE浏览器中，首先使用`URL`对象的`createObjectURL`方法创建一个url

MDN上对URL对象的这个api说明如下

> **`URL.createObjectURL()`** 静态方法会创建一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 绑定。这个新的URL 对象表示指定的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。

简而言之，就是将post请求的响应结果Blob对象，转换为一个特殊的url，访问这个url就可以获得这个blob对象

那么聪明的你一定发现了，嘿，有了这个url不就可以用`window.location.href`了吗，因为聪明的我也是这么想的，但是实际上用`window.location.href`确实可以下载这个blob，但是文件名称是乱码并且没有文件扩展名，所以需要通过创建`a`标签的方式来手动加上文件名称，这种做法需要前端给文件命名，所以看似是使用post请求进行文件下载，本质上还是get请求，只不过url是通过post请求的结果产生的

