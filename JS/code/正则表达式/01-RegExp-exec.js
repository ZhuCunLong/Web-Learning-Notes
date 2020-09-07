const myRe = /d(b+)d/g
const str = 'abc dbbbd a dbd dd'
let result = myRe.exec(str)
console.log(result)

console.log(myRe.exec(str))

console.log(/d(b+)d/g.exec(str))
console.log(/d(b+)d/g.exec(str))


