/**
 * @param {number[]} nums - 输入的数组
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  // 从倒数第二个数开始向前遍历，找到第一个开始下降的位置
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  // 如果找到了下降点
  if (i >= 0) {
    // 从末尾开始找到第一个比下降点大的数
    let j = nums.length - 1;
    while (j >= 0 && nums[i] >= nums[j]) {
      j--;
    }
    // 交换下降点和比它稍大的数
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // 反转下降点后的所有数字
  reverse(nums, i + 1);
  return nums;
};

// 反转数组的辅助函数
function reverse(nums, start) {
  let left = start;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

// 测试示例
const res = nextPermutation([1, 3, 2, 4, 5]);
console.log(res);
