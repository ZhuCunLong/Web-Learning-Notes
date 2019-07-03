# Iterator

类似c++之中的迭代器

原生具备Iterator接口的数据结构如下

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

也就是说，这些数据结构中都有`Symbol.iterator`属性

## 原生数据对象实现`for...of`遍历数据

- 类数组对象

  比较简单

  ```js
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
  ```

- 常规对象

  借助Generator函数

  ```js
  function* objectEntries() {
  	let propKeys = Object.keys(this)
  
  	for (let propKey of propKeys) {
  		yield [propKey, this[propKey]]
  	}
  }
  
  let obj = {
  	first: 'Jane',
  	last: 'Doe',
  	[Symbol.iterator]: objectEntries
  }
  
  for (let [key, value] of obj) {
  	console.log(`${key}: ${value}`);
  }
  ```

  