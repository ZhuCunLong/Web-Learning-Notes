let s: string
s = 'abc'
let u: unknown
u = {a: 123}

// s = u as string // 正常编译
s = <string>u

console.log(s)