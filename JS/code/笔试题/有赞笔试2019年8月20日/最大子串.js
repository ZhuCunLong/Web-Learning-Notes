var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal:false
});

rl.on('line', function(line) {
  console.log(fn(line))
})

function fn(str) {
  let tmpmax = 1;
  let index = 0;
  let max = 0;
  for(let i = 1;i<str.length;i++){
    const tmp = str.slice(index,index+tmpmax);
    const tindex = tmp.indexOf(str[i]);
    if(tindex === -1){
      tmpmax++;
    } else {
      index = index + tindex + 1;
      tmpmax = i - index + 1;
    }
    if(tmpmax>max){
      max = tmpmax;
    }
  }
  return max;
}

const str = 'abcdccdefg'
console.log(fn(str));
