/*let obj = {}
obj[0] = 'a';
console.log(obj)*/

let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
	console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
	console.log(i); //  "3", "5", "7"
}
