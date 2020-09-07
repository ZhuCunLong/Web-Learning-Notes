// const str = 'abc dbbbd a dbd dd'
/*console.log(Array.isArray(str.match(/d(b+)d/)))
console.log(str.match(/d(b+)d/g))*/

/*const reg = new RegExp('d(b+)d')

console.log(reg.lastIndex)
console.log(str.match(reg))
console.log(reg.lastIndex)*/

const reg = /((\w\d){3})/g
const reg1 = /(\w\d){3}/g
const str = 'a1b2c3d4'
console.log(str.match(reg))
console.log(str.match(reg1))

console.log(reg.exec(str))
console.log(reg1.exec(str))


