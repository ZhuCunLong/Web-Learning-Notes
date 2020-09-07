const reg = /((\w\d){3})/g
const reg1 = /(\w\d){3}/g
let str = 'a1b2c3d4'

/*console.log(reg.exec(str))
console.log(reg1.exec(str))*/

// ['a1b2c3', 'a1b2c3', 'c3', index: 0, input: 'a1b2c3d4', groups: undefined]
// ['a1b2c3', 'c3', index: 0, input: 'a1b2c3d4', groups: undefined ]

/*const reg2 = /abc(dd|ee)fg/g
str = 'abcddfgabceefg'
console.log(reg2.exec(str))
console.log(reg2.exec(str))*/

// 忽略捕获分组
/*const reg2 = /abc(?:dd|ee)fg/g
str = 'abcddfgabceefg'
console.log(reg2.exec(str))
console.log(reg2.exec(str))*/

const reg2 = /(very)\2/g
str = 'you are veryveryvery good'
console.log(str.match(reg2))
console.log(reg2.exec(str))
