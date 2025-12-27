package main

import "fmt"

func main() {
	var input []int = []int{1, 2, 3, 4}
	fmt.Println(productExceptSelf(input))
}

func productExceptSelf(nums []int) []int {
	lengthOfNums := len(nums)
	result := make([]int, lengthOfNums)

	result[0] = 1

	for i := 1; i < lengthOfNums; i++ {
		result[i] = nums[i-1] * result[i-1]
	}
	sef := 1

	for i := lengthOfNums - 1; i >= 0; i-- {
		result[i] = result[i] * sef
		sef *= nums[i]
	}
	return result

}
