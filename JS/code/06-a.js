function A() {
	this.foo = 'hello';
}

/*if (!global._foo) {
	global._foo = new A();
}*/

if(!global._foo) {
	global._foo = {
		foo : 'hello'
	}
}

module.exports = global._foo;
