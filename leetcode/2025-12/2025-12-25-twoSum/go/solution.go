func twoSum(nums []int, target int) []int {
	for i := 0; i < len(nums); i++ {
		for j := 0; j < len(nums); j++ {
			if sum := nums[i] + nums[j]; sum == target && i != j {
				return []int{i, j}
			}
		}
	}
	return nil
}
