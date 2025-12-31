def findDisappearedNumbers(nums):
    nums_set = set(nums)
    res = []
    print(nums_set)
    for i in range(1, len(nums) + 1, 1):
        if i not in nums_set:
            print(i)
            res.append(i)
    return res


print(findDisappearedNumbers([1, 1]))
