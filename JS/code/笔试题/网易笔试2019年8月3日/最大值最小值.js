// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var cur_line = 0;
let arr = [];
rl.on('line', function(line){ // javascript每行数据的回调接
    if(cur_line === 0){
        cur_line ++;
    } else {
        arr = line.split(' ');
        let str = ''
        arr = fun(arr)
        for(let i =0;i<arr.length;i++){
            str += arr[i]
            if(i !== arr.length-1){
                str += ' '
            }
        }
        console.log(str);
        cur_line = 0;
    }
});

function fun(arr){
    return arr.reduce((pre,cur,index,self) => {
        if(pre[index-1]){
            cur>pre[index-1]?pre.push(cur):pre.push(pre[index-1])
        } else {
            pre.push(cur);
        }
        return pre;
    },[])
}
