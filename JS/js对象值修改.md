## 使用场景

在数组中修改某项的所有属性

```js
var student = {
  id: 1,
  name: '李四',
  age: 15
}

var stu = sdudents.find(function (item){
  return item.id === student.id
})

for(var key in student){  // for循环中的studet简直精髓，为什么不用stu，有原因的
  stu[key] = student[key]
}
```

