/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[i] >= nums[j]) {
        j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]]
  }
  reverse(nums, i + 1);
  return nums
};

function reverse(nums, start) {
  let left = start
  let right = nums.length-1 
  while(left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]]
    left++
    right--
  }
}

const res = nextPermutation([1,3,2,4,5])
console.log(res)