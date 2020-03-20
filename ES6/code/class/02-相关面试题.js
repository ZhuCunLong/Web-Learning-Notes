class Foo{
  constructor(){
    bar = function(){
      console.log(1)
    }
  }
}

Foo.bar = function(){
  console.log(2)
}

Foo.prototype.bar = function(){
  console.log(3)
}

var bar = function(){
  console.log(4)
}

function bar(){
  console.log(5)
}

Foo.bar() //2
bar() //4
new Foo().bar() //3
bar() //1
new Foo.bar() //2 
new new Foo().bar() //3
