function foo() {
	const a = 23
	console.log(a)
	bar()
}
function bar(){
	console.log(a)
}
var a = '12'
foo()
