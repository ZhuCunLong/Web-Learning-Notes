// 输入 HG[3|B[2|CA]]F
// 输出 HGBCACABCACABCACAF

var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  console.log(fn(line));
})

function fn(str) {
  let res = '';
  let i = 0;
  const countArray = [];
  const strArray = [];
  while (i < str.length) {
    if (isLetter(str[i]) && countArray.length === 0) {
      res += str[i++]
    } else if (str[i] === '[') {
      i++;
      // 保存数字 并且过滤“|”
      countArray.push(str[i++])
      i++;
    } else if (isLetter(str[i]) && countArray.length !== 0) {
      const size = countArray.length;
      if (strArray[size - 1])
        strArray[size - 1] += str[i++]
      else
        strArray[size - 1] = str[i++]
    } else if (str[i] === ']') {
      const count = countArray.pop();
      const str1 = strArray.pop();
      let tmp = '';
      for (let j = 0; j < count; j++) {
        tmp += str1;
      }
      // 如果所有层数没走完
      if (countArray.length > 0) {
        const size = countArray.length;
        // 将刚刚拼接好的字符串接在上一层中
        strArray[size - 1] += tmp;
        i++;
      } else {
        // 层数走完了，tmp就是最后的拼接结果
        res += tmp;
        i++;
      }
    }
  }
  return res;
}

function isLetter(str) {
  return /[a-zA-Z]/.test(str);
}

//console.log(fn('HG[3|B[2|CA]]F'))
