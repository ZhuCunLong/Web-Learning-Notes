function foo(){
  console.log('this is ' + this.a)
  const obj = {
    a:1
  }
  return obj
}
foo.prototype.b=function (){
  console.log(this.a);
}
const f1 = new foo()
console.log(f1.a);
f1.b()
