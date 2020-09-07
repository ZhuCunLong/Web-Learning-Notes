/*
*  在添加标识符g后，lastIndex属性会更新
* */

/*const myRe = /d(b+)d/g
console.log(myRe.lastIndex)
let myArray = myRe.exec("caaadbbddbdsbz")
console.log(myArray)
console.log(myRe.lastIndex)
myArray = myRe.exec("cdbbdbsbz")
console.log(myArray)
console.log(myRe.lastIndex)*/

const myRe = /d(b+)d/g
console.log(myRe.lastIndex)
let myArray = myRe.test("caaadbbddbdsbz")
console.log(myArray)
console.log(myRe.lastIndex)
myArray = myRe.test("cdbbdbsbz")
console.log(myArray)
console.log(myRe.lastIndex)


