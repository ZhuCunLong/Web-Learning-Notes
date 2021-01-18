/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  const m = grid.length
  const n = grid[0].length
  // const dp = Array(m).fill([...Array(n).fill(0)])
  const dp = []
  for(let i = 0;i<m;i++){
    dp.push(Array(n).fill(0))
  }

  // 初始化二维数组，从[0][0]到边界上的最小值，就是边界值的累加，因为只能单向走
  dp[0][0] = grid[0][0]
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i-1] + grid[0][i]
  }
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i-1][0] + grid[i][0]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[m - 1][n - 1]
}

const grid = [[7,4,8,7,9,3,7,5,0],[1,8,2,2,7,1,4,5,7],[4,6,4,7,7,4,8,2,1],[1,9,6,9,8,2,9,7,2],[5,5,7,5,8,7,9,1,4],[0,7,9,9,1,5,3,9,4]]

console.log(minPathSum(grid))
