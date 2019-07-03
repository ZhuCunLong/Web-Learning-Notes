// 类数组对象实现for...of遍历
/*let iterable = {
	0: 'a',
	1: 'b',
	2: 'c',
	length:3,
	[Symbol.iterator](){
		const _this = this
		let index = 0;
		return {
			next(){
				if(index < _this.length){
					return{
						value: _this[index++],
						done:false
					}
				} else {
					return {
						done: true
					}
				}
			}
		}
	}
}

for(let it of iterable){
	console.log(it);
}*/

function* objectEntries() {
	let propKeys = Object.keys(this)

	for (let propKey of propKeys) {
		yield [propKey, this[propKey]]
	}
}

let obj = {
	first: 'Jane',
	last: 'Doe',
	a: 'a',
	[Symbol.iterator]: objectEntries
}

for (let [key, value] of obj) {
	console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
