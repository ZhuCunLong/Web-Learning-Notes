/*var arr = readline().split(" ")
var n = arr[0];
var q = arr[1];
var target = readline().split(" ")
var o = []

for(let i = 0;i<q;i++)
    o.push(parseInt(readline()));*/

let target = [1,2,3]
const q = 2;
const o = [3,3]

for(let i = 0;i<q;i++){
    let count = 0;
    target = target.map(item => {
        if(item>=o[i]){
            count++;
            return --item;
        }
        else
            return item;
    })
    console.log(count);
}
