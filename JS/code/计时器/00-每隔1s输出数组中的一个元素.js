function print(arr) {
	for (let i = 0; i < arr.length; i++) {
		setTimeout(() => {
			if (i < arr.length) {
				console.log(arr[i])
			}
		}, 1000)
	}
}

function print1(arr){
	for(let i = 0; i < arr.length; i++){
		(function(a){
			var timer = setInterval(function(){       //注意定义timer的时候，要放在自执行函数中，也是由于setInterval的异步特性，避免在清除定时器时，清除的是无效的timer
				console.log(arr[a]);
				clearInterval(timer);        //在每次执行完任务时，直接清除掉定时器
			},1000);
		})(i);
	}
}

function print2(arr){
	var i = 0;       //在外面定义一个变量作为判断的标准
	var timer = setInterval(function(){
		console.log(arr[i]);
		i++;
		if(i > arr.length-1){       //因为i++的原因，所以当i的值大于数组的长度-1的时候，清除定时器
			clearInterval(timer);
		}
	},1000);
}


arr = [1,2,3,4,5]
print2(arr);
