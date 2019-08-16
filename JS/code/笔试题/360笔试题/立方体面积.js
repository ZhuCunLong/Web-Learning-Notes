const arr = read_line().split(" ")
const m = arr[0];
const n = arr[1];
let data = []
for (let i = 0; i < n; i++) {
  const tmp = read_line().split(" ")
  data.push(tmp)
}

function getResult(data, m, n) {
  let res = 0
  res += m * n * 2
  for (let i = 0; i < n; i++) {
    res += Math.max(...data[i]) * 2
  }
  for (let i = 0; i < m; i++) {
    const tmp = []
    for (let j = 0; j < n; j++) {
      tmp.push(data[j][i])
    }
    res += Math.max(...tmp) * 2
  }
  return res
}

/*function fn(data, m, n) {
  let sum = 0;
  for(let i=0;i<n;i++){
    for(let j = 0;j<m;j++){
      sum += data[i][j]*4
    }
  }
  for(let j=0;j<m-1;j++){
    sum -= Math.min(data[0][j],data[0][j+1])*2
  }
  for(let i =1;i<n;i++){
    for(let j = 0;j<m-1;j++){
      sum -= min(data[i][j],data[i][j+1]) *2
      sum -= min(data[i-1][j],data[i][j]) *2
    }
    sum -= min(data[i-1][m-1],data[i][m-1]) *2
  }
  return sum
}*/

print(getResult(data, m, n))


const data = [
  [2,1],
  [1,1]
]

const m = 2
const n = 2
console.log(getResult(data, m, n))

