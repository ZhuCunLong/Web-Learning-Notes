var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

const mod = 1000000007
const seq = '25252'
rl.on('line', function(line){ // javascript每行数据的回调接
  let dp = new Array(6)
  
  for(let i = 0;i<6;i++){
    dp[i] = 0;
  }
  dp[0] = 1
  const res = fun(line, dp);
  console.log(res);
});

function fun(str, dp){
  for(let i = 0;i<str.length;i++){
    for(let j = 1; j< 6;j++){
      dp[j] = (dp[j]+(str[i] === seq[j-1])*dp[j-1])%mod
    }
  }
  return dp[5]
}
