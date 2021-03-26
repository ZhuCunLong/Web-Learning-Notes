# js的访问器属性

在解决双向绑定问题之前，先了解js对象的访问器属性（`getter`和`setter`）

参考资料：https://www.cnblogs.com/hahazexia/p/5276655.html

访问器属性的作用：对某个属性设置存值函数和取值函数，拦截该属性的存取行为，换句话说，在对设置了访问器属性的属性赋值时就会触发。

```js
var person = {
  currentyear: 2019,
  age:0
};
Object.defineProperty(person, 'born', {
  get: function(){
    return this.born;
  },
  set: function(newValue){
    this.age = this.currentyear - newValue;
  }
});
person.born = 1995;
console.log(person.age); // 24
```

