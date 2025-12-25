from typing import List


class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        set_of_nums = set(nums)
        if len(nums) == len(set_of_nums):
            return False
        return True
