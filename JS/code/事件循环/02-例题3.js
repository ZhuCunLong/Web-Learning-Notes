console.log(1)
setTimeout(()=>{
  console.log(2)
  new Promise(resolve=>{
    console.log(3)
    resolve()
  }).then(()=>{
    console.log(4)
  })
},10)

new Promise(resolve=>{
  console.log(5)
  setTimeout(()=>{
    console.log(6)
  })
  resolve()
}).then(()=>{
  console.log(7)
})

// 1 5 7 2 3 6 4 
