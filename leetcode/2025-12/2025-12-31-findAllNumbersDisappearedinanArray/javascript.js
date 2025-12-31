/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  numsSet = new Set(nums);
  res = [];
  for (let i = 1; i < nums.length + 1; i++) {
    if (!numsSet.has(i)) res.push(i);
  }
  return res;
};

console.log(findDisappearedNumbers([1, 3, 3, 3]));
