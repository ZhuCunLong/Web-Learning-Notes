// const url= 'https://www.nowcoder.com/test/question/8b3c9b90fcb7476b97c671dfaaad2cbd?pid=27974724&tid=41286293'
var readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal:false
});

let cur_line = 0
let range = 0
let min=0, max = 0
let res = 0
const handleProgress = () => {
  res = parseInt((min + max) /2 )
  console.log('中位数为', res)
  console.log('请选择大还是小。大：1 小：2')
}
console.log('请输入范围')
rl.on('line', function(line){
	if(cur_line === 0){
    range = Number(line)
    max = range
    cur_line ++ 
    handleProgress()
	} else if(cur_line > 0){
    const choice = Number(line)
    if(choice === 3){
      cur_line = 0
      min = 0,max = 0
      console.log('请输入范围')
      return 
    }
    if(choice === 2){
      min = res
    } else {
      max = res
    }
    handleProgress()
	}
})

