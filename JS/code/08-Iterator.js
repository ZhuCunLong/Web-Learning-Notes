let iterable = {
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
}
