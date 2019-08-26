const testData = {
	a_bbb: 123,
	a_g: [1, 2, 3, 4],
	a_d: {
		s: 2,
		s_d: 3
	},
	a_f: [1, 2, 3, {
		a_g: 5
	}],
	a_d_s: 1
}

/**
 * 将一个json数据的所有key从下划线改为驼峰
 *
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */
function mapKeysToCamelCase(data) {
	if(Array.isArray(data)){
		return data.map(item => {
			return mapKeysToCamelCase(item);
		})
	} else if (typeof data === 'object'){
		const res = {};
		for(let key in data){
			res[fn(key)] = mapKeysToCamelCase(data[key]);
		}
		return res;
	} else {
		return data;
	}
}

// 将字符串转换成小驼峰输出
function fn(str){
	const arr = str.split('_');
	return arr.reduce((pre,cur,index) => {
		if(index>0){
			if(cur[0]){
				cur=cur.charAt(0).toUpperCase() + cur.slice(1)
			}
			return pre+cur;
		} else {
			return cur;
		}
	}, '')
}

console.log(mapKeysToCamelCase(testData))

// {
//     aBbb: 123,
//     aG: [1, 2, 3, 4],
//     aD: {
//         s: 2,
//         sD: 3
//     },
//     aF: [1, 2, 3, {
//         aG: 5
//     }],
//     aDS: 1
// }
