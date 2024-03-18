/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length < 2) return nums.length;
  let j = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[j - 2]) {
      nums[j++] = nums[i];
    }
  }
  nums.splice(j, nums.length - j);
  return j;
};

const arr = [1, 1, 1, 1, 2, 3, 4];
console.log(removeDuplicates(arr));
console.log(arr);
