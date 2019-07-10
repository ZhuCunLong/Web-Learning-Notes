function Foo() {
	/*console.log(this)
	console.log(this === Foo)*/
	Foo.a = function() {
		console.log(1)
	}
	/*this.a = function() {
		console.log(2)
	}*/
}
Foo.prototype.a = function() {
	console.log(3)
}
/*Foo.a = function() {
	console.log(4)
}*/
let obj = new Foo();
/*obj.__proto__.a()
obj.a();
Foo.a();*/

console.log(obj.prototype)
