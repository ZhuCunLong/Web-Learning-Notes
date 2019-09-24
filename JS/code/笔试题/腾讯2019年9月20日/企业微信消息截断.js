function fn(str, limit, lastMsg) {
	if (!lastMsg) {
		lastMsg = "\n\nToo large to show...";
	}

/*	if (limit < lastMsg.length) {
		throw Error(`限制的长度应该大于 ${lastMsg.length}`);
	}*/

	if(str.length>limit){
		const times = Math.floor(str.length/limit);
		for(let i = 0;i<times;i++){
			const index = limit*(i+1)+lastMsg.length*i
			str = str.slice(0,index)+lastMsg+str.slice(index);
		}
	}

	return str;
}

let str = 'hello';
for(let i = 0;i<3;i++){
	str += str;
}
console.log(fn(str,3,"\n\nToo large to show..."))
