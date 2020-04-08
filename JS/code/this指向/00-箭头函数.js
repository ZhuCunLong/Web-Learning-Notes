var helperObj = {
  name: 'one piece'
}
name = 'window'
var obj = {
  name: 'lufy',
  say() {
    console.log(`${this.name}`)
  },
  say2: () => {
    console.log(`${this.name}`)
  },
  say3() {
    var f = function () {
      console.log(`${this.name}`)
    }
    f();
  },
  say4() {
    var f = () => console.log(`${this.name}`);
    f();
  },
  say5() {
    var f = () => console.log(`${this.name}`)
    f.call(helperObj)
  },
  embed: {
    name: 'solon',
    say() {
      console.log(`${this.name}`)
    }
  }
}

var obj1  = {
  name:'zcl',
  say(){
    var f = obj.say2;
    f()
  }
}

obj1.say()

// obj.say();
// obj.say2();
// obj.say3();
// obj.say4();
// obj.say5();
// obj.embed.say();
