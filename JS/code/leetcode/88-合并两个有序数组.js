/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let cursor = 0;
  for (let i = 0; i < n; i++) {
    let current = nums2[i];
    // 如果当前值大于游标值，游标后移
    while (current > nums1[cursor] && cursor < m + i) {
      cursor++;
    }
    //  插入游标处，游标后的数据顺序后移
    let j = m + i;
    while (j > cursor) {
      nums1[j] = nums1[j - 1];
      j--;
    }
    nums1[cursor] = current;
  }
  return nums1;
};

const nums1 = [0, 0, 3, 0, 0, 0, 0, 0, 0];
const m = 3;
const nums2 = [-1, 1, 1, 1, 2, 3];
const n = 6;

const res = merge(nums1, m, nums2, n);
console.log(res);
