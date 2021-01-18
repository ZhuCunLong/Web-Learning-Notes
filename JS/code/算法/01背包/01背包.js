//背包问题
function mydp(money,price,manyi,n) {
    var dp = [];

    for (var i = 0; i <= n; i++) {
        dp[i] = [];
    }

    var i,p,a,b
    for(i = 0; i <= n; i++) {
        for(p = 0; p <= money; p++) {
            if(i === 0 || p === 0) {
                dp[i][p] = 0;
            } else if(price[i - 1] <= p) {
                a = manyi[i - 1] + dp[i - 1][p - price[i - 1]];
                b = dp[i - 1][p];
                dp[i][p] = (a > b) ? a : b;
            } else {
                dp[i][p] = dp[i - 1][p];
            }
        }
    }
    return dp[n][money];
};

var manyi = [100,100,100,100,1,1,1,1,2,2]
var price = [26,26,26,26,5,5,5,5,5,5]
var money = 100
var n = manyi.length;
console.log(mydp(money,price,manyi,n))
