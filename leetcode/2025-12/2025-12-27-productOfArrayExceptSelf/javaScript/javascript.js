/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  lenth = nums.length;
  result = [1] * lenth;

  for (let i = 1; i < lenth; i++) {
    result[i] = nums[i - 1] * result[i - 1];
  }
  suf = 1;

  for (let i = lenth; i > -1; i--) {
    result[i] *= suf;
    suf *= nums[i];
  }
  return result;
};
