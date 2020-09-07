const reg = /\w(?=\d)/g
const reg1 = /\w(?!\d)/g
str = 'a1b2c3d4'
str1 = 'a2*34vv'
console.log(str.match(reg))
console.log(str.match(reg1))

console.log(str1.replace(reg, 'x'))
console.log(str1.replace(reg1, 'x'))

