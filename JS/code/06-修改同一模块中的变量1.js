var b = require('./06-修改同一模块中的变量')
var a = require('./06-a')

console.log(a.foo);

console.log(global._foo);
console.log(global);

