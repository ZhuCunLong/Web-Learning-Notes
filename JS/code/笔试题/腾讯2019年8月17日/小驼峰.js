function fn(str) {
  const arr = str.split(/-|@|_/);
  return arr.reduce((pre,cur,index)=>{
    if(index>0){
      if(cur[0])
        cur = cur.charAt(0).toUpperCase() + cur.slice(1)
      return pre+cur;
    } else {
      return cur
    }
  },'')
}

const str = 'abc_def-ghi@j@'
console.log(fn(str))

let name = 'hello'
console.log(name.charAt(0).toUpperCase() + name.slice(1))
