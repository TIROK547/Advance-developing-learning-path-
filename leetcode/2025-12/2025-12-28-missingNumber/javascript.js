/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  temp = Array(nums.length + 1).fill(-1);
  for (let i = 0; i < nums.length; i++) {
    temp[nums[i]] = nums[i];
  }

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] == -1) {
      return i;
    }
  }

  return 0;
};
