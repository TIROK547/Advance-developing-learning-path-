/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const nums_len = nums.length;
  if (nums_len <= 1) return nums_len;
  const nums_set = new Set(nums);

  let longest = 0;

  for (const num of nums_set) {
    if (!nums_set.has(num - 1)) {
      let length = 1;
      while (nums_set.has(num + length)) {
        length = length + 1;
      }
      longest = Math.max(length, longest);
    }
  }
  return longest;
};

console.log(longestConsecutive([100, 1, 200, 3, 4, 2]));
