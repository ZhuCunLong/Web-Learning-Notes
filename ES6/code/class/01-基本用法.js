// class Point{
//   constructor(x,y){
//     this.x = x;
//     this.y = y;
//   }

//   toString(){
//     return `(${this.x},${this.y})`
//   }
// }

// const p1 = new Point(1,1)
// console.log(p1);

//console.log(typeof Point)

function Person(name){
  this.name = name
}

console.log(Object.keys(Person.prototype))