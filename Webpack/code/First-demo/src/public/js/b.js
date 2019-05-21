/*export var a = 123
export var b = 'hello'
export function c(){
	console.log('ccc')
}
export var d = {
	foo: 'bar'
}*/

var a = 123
var b = 'hello'
function c() {
	console.log('ccc')
}
var d = {
	foo: 'bar'
}

var test = {
	a: a,
	b: b,
	c: c,
	d: d
}

/*export { test }*/

export default test
