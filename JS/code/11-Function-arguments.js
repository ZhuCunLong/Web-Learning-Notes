//"use strict"

/*function func(a, b = 2) {
	a = 111;
	console.log(arguments[0]);
}
func(10);

function func2(a, b) {
	a = 111
	console.log(arguments[0]);
}
func2(10);

function func3(a, ...args) {
	a = 111
	console.log(arguments[0])
}
func3(10, 2, 3);  // [1,2,3]

// 解构赋值不能在这用啊。
/!*function func4(a, [b, c] = [2,3]) {
	a = 111
	console.log(arguments[0])
}
func4(10, 2, 3);  // [1,2,3]*!/

function add(a,...args){
	return a + args.reduce((previous, current) => {
		return previous + current;
	});
}

console.log(add(1,2,3,4,5))*/

/*var obj = {
	a:function(data){
		console.log(arguments)
		//console.log(typeof arguments)
	}
}

obj.a('hello','world',1,2)*/

var arr = ['hello','world','node','js']
var arr1 = arr.reduce((newarr,current) => {
	return newarr + current + ' '
},'')
console.log(arr1)
