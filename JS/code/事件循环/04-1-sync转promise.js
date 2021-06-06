function async1() {
  console.log('async1 start')
  async2().then(() => {
    console.log("async2 end!")
  }).then(() => {
    console.log('async1 end')
  })
}

function async2() {
  console.log('async2')
  return new Promise(resolve => resolve())
}

console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

// script start
// async1 start
// async2
// promise1
// async2 end!
// async1 end 错
// promise2   错
// setTimeout

/**
 script start
 async1 start
 async2
 promise1
 async2 end!
 promise2
 async1 end
 setTimeout
 */
