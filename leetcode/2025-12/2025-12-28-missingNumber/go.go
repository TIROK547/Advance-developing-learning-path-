package main

import (
	"fmt"
)

func main() {
	test := []int{0, 1, 3}
	fmt.Println(missingNumber(test))
}
func missingNumber(nums []int) int {
	msum := 0
	sum := (len(nums) * (len(nums) + 1)) / 2
	for i := 0; i < len(nums); i++ {
		msum += nums[i]
	}
	return sum - msum
}
