package main

import "fmt"

func main() {
	test := []int{1, 3, 3, 3}
	fmt.Println(findDisappearedNumbers(test))
}

func findDisappearedNumbers(nums []int) []int {
	res := make([]int, len(nums))

	for _, n := range nums {
		res[n-1] = n
	}

	var idx int
	for i, v := range res {
		if v == 0 {
			res[idx] = i + 1
			idx++
		}
	}
	return res[:idx]
}
