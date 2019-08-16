// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var cur_line = 0;
let arr = [];
let n,a,x;
rl.on('line', function(line){
    if(cur_line===0){
        arr = line.split(' ');
        n = arr[0];
        a = arr[1];
        x = arr[2];
        cur_line++;
    } else {
        arr = line.split(' ');
        fun(arr);
        cur_line = 0;
    }
});

function fun(arr){
    var sum = arr.reduce(function (pre,cur) {
        return pre+Number(cur);
    },0);
    // 高效情况下需要t分钟
    var t = Math.ceil(sum/a);
    // 高效改不玩，就改不完了
    if(t>480){
        console.log(0);
        return;
    }
    if(t<=x*a*60){
        console.log(t);
        return;
    } else {
        var sheng = sum-x*a*60;
        if(sheng+x*60>480){
            console.log(0);
        } else {
            console.log(x*60+sheng);
        }
    }
}

/*a = 2;
x = 2;
arr = [500]
fun(arr);*/

