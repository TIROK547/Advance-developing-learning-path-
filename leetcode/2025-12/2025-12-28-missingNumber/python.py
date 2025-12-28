class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        res = [-1] * (len(nums) - 1)
        for i in range(len(nums)):
            res[nums[i]] = nums[i]
        for i in range(len(res)):
            if res[i] == -1:
                return i
        return 0
