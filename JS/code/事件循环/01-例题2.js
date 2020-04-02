// console.log(1)
// setTimeout(()=>{
//   console.log(2)
// })

// async function fn() {
//   console.log(3)
//   setTimeout(() => {
//     console.log(4)
//   })
//   return Promise.reject()
// }

// async function run() {
//   console.log(5)
//   await fn()
//   console.log(6)
// }

// run()

// for(let i = 0;i<90000000;i++){
// }

setTimeout(() => {
  console.log(7)
  new Promise(resolve => {
    console.log(8)
    resolve()
  }).then(()=>{
    console.log(9)
  })
})

console.log(10)

new Promise(resolve => {
  console.log(11)
  setTimeout(()=>{
    console.log(12)
  },5000)
  resolve()
}).then(()=>{
  console.log(13)
})

// 1 5 3 4 2 7 8 9  错

