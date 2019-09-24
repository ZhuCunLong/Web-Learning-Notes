function fn(arr) {
    const m = arr.length;
    const n = arr[0].length;
    let x = 0, y = 0;
    let direction = 0;  // 0右，1下，2左，3上
    let flag = 0; // 方向的转向次数；判断两次停止
    const res = [];
    while (true) {
        if (arr[x][y] !== 'y') {
            res.push(arr[x][y]);
            arr[x][y] = 'y';
        }
        if (direction === 0) {
            y++;
            // 如果需要转向
            if (y === n || arr[x][y] === 'y') {
                if (flag === 1) {
                    break;
                }
                y--;// 横向退一步
                flag++;// 判断次数+1
                direction = 1;
            } else {
                flag = 0;
            }
        }
        if (direction === 1) {
            x++;
            if (x === m || arr[x][y] === 'y') {
                if (flag === 1) {
                    break;
                }
                x--;
                flag--;
                direction = 2;
            } else {
                flag = 0;
            }
        }
        if (direction === 2) {
            y--;
            if (y === -1 || arr[x][y] === 'y') {
                if (flag === 1) {
                    break;
                }
                y++;
                flag++;
                direction = 3;
            } else {
                flag =0;
            }
        }
        if(direction === 3) {
            x--;
            if(arr[x][y]=== 'y'){
                if(flag === 1){
                    break;
                }
                x++;
                flag++;
                direction = 0;
            } else {
                flag = 0;
            }
        }
    }
    return res;
}

arr = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

console.log(fn(arr).join(','))
