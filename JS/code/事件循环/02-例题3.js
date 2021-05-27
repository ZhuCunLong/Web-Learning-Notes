console.log(1)
setTimeout(()=>{
  console.log(2)
  new Promise(resolve=>{
    console.log(3)
    //setTimeout(resolve)
    resolve()
  }).then(()=>{
    console.log(4)
  })
})

new Promise(resolve=>{
  console.log(5)
  setTimeout(()=>{
    console.log(6)
  })
  resolve()
}).then(()=>{
  console.log(7)
  setTimeout(() => {
    console.log(8)
  })
  new Promise(resolve => {
    resolve()
  }).then(() => {
    console.log(9)
  })
  new Promise(resolve => {
    new Promise(resolve1 => {
      resolve1()
    }).then(resolve)
  }).then(() => {
    console.log(10)
  })
})

// 1 5 7 2 3 4 6
