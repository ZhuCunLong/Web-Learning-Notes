let p1 = Promise.resolve(1)
let p2 = new Promise(resolve=>{
  setTimeout(() => {
    resolve(2)
  },3000)
})

async function fn(){
  console.log(1)
  let result1 = await p2
  console.log(3)
  let result2 = await p1
  console.log(4)
}

fn()

console.log(2)

// 1 2 3 4