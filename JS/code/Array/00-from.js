let arr = Array.from({length: 5}, (v, i) => 1);
console.log(arr)

arr = Array.from({length:5}, x=>{
   return  {x}
})
console.log(arr)

arr = Array.from([1, 2, 3], (x,i) => x + i*2);
// [2, 4, 6]

console.log(arr)
