// 本题为考试多行输入输出规范示例，无需提交，不计分。
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var cur_line = 0;
let arr = [];
let N,money;
let manyi = [];
let price = []
rl.on('line', function(line) {
    if(cur_line===0){
        arr = line.split(' ');
        N = Number(arr[0]);
        money = Number(arr[1]);
        cur_line++;
    } else if(cur_line<=N){
        arr = line.split(' ');
        for(let i=0;i<Number(arr[2]);i++){
            manyi.push(Number(arr[1]));
            price.push(Number(arr[0]));
        }
        if(cur_line===N){
            console.log(mydp(money,price,manyi,price.length));
            cur_line = 0;
        } else {
            cur_line++;
        }
    }
});

function mydp(money,price,manyi,n) {
    const table = [];

    for (let i = 0; i <= n; i++) {
        table[i] = [];
    }

    let p,a,b;
    for(let i = 0; i <= n; i++) {
        for(p = 0; p <= money; p++) {
            if(i === 0 || p === 0) {
                table[i][p] = 0;
            } else if(price[i - 1] <= p) {
                a = manyi[i - 1] + table[i - 1][p - price[i - 1]];
                b = table[i - 1][p];
                table[i][p] = (a > b) ? a : b;
            } else {
                table[i][p] = table[i - 1][p];
            }
        }
    }
    return table[n][money];
}
