let ret

function add(x,y){
	setTimeout(function () {
		ret = x+ y;
	}, 1000)
}

add(10, 20)

// 第二个参数设为比1秒小的话是无法获取到ret的值的
setTimeout(function () {
	console.log(ret);
}, 999)
