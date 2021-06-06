async function async1() {
  console.log('async1 start')
  await async2().then(() => {
    console.log("async2 end!")
  });
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
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
