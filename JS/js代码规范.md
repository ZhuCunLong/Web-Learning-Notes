> [js代码规范参考地址]:<https://standardjs.com/readme-zhcn.html>

# 关于js中的分号

有三种情况分号是必不可少的

当一行代码是以

1. `(`
2. `[`
3. `

开头的时候，则需要在前面补上一个分号

1.  ```js
   var say(){
     console.log('hi')
   }
   say()
   ;(function(){
     console.log('hello')
   })()
   ```

2. ```js
   var say(){
     console.log('hi')
   }
   say()
   ;['香蕉', '牛奶'].forEach(function(item){
     console.log(item)
   })
   ```

3. ```js
   // '`' 符号是es6中扩展的一个符号，和''类似，但是能表达的功能比一般的字符串要强，
   // 它是支持换行的
   var say(){
     console.log('hi')
   }
   say()
   ;`hello`.toString()
   ```

