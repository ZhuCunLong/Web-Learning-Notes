/**
 * @param {number} n
 * @return {string[]}
 */

/*
 * 暴力解法，无中生有，递归实现  
 */
var generateParenthesis = function(n) {
  const tmp = ''
  const res = []
  generate(tmp, 2 * n, res)
  return res
};

function generate(tmp, count, res) {
  if(tmp.length === count) {
    if(valid(tmp)) {
      res.push(tmp)
    }
    return
  }
  if(tmp.length > count){
    return
  }
  tmp += '('
  generate(tmp, count, res)
  tmp = tmp.slice(0, -1)
  tmp += ')'
  generate(tmp, count, res)
}

function valid (str) {
  let balance = 0
  for(let i = 0;i<str.length;i++) {
    str[i] === '(' ? balance ++ : balance--
    if(balance < 0) {
      return false
    }
  }
  return balance === 0
}
