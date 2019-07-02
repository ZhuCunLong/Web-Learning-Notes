const zcl = Symbol('zcl')
const obj = {
	a:'a',
	b:'b',
	c:'c',
	d:() => console.log('hi'),
	e(){
		console.log('hi e')
	},
	f:function () {
		console.log('hi f')
	},
	[zcl]:'i am zcl'
}

Object.defineProperty(obj, 'g', {enumerable: false, value:  function () {console.log('hi g')},});

console.log(obj[zcl])

for(let key in obj){
	console.log(key)
}

console.log(Object.keys(obj))

console.log(Object.getOwnPropertyNames(obj))

console.log(Reflect.ownKeys(obj))
