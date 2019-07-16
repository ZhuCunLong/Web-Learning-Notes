/*
let obj = null
console.log(typeof obj) // obj

let obj1 = undefined
console.log(typeof obj1) // undefined

//var obj2
let obj2
//const obj2 = undefined
console.log(obj2 === obj1)  // true
*/

/*console.log(obj3)

let obj3 = 1*/

/*
console.log(null == undefined)
console.log(null === undefined)
*/

/*var temp;
console.log(temp);
console.log(typeof temp);
console.log(typeof temp2);
console.log(temp==undefined);
console.log(temp2==undefined);*/

/*function foo(val1,val2){
	console.log(val2)
}

foo(1)*/

obj = {
	a: 'hello',
	b: function () {
		console.log(this.a)
	},
	d: null
}

/*console.log(obj.c())*/

obj.c ? console.log(true):console.log(false)
obj.d ? console.log(true):console.log(false)
