var a = 0
let obj = {
  a: 1,
  b: function () {
    console.log(this.a)
  }
}
const obj1 = {
  a: 2
}
const fun = obj.b;
fun();  // 0
fun.apply(obj)  // 1
fun.bind(obj1).apply(obj)  // 1
const fun1 = fun.bind(obj1)
new fun()  // undefined*/

/*var a = 1;
let c = 3;
const obj = {
    a: 2,
    c: 4,
    b: function(){
        console.log(this.a)
        console.log(this.c)
    }
}
const obj1 = {
    a: 5,
    c: 6
}
const fun = obj.b;
fun.bind(obj1).apply(obj)

function Foo () {
    getName = function () {
        console.log(1)
    }
    console.log('this is' + this)
    return this
}*/

