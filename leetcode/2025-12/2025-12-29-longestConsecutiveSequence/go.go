package main

import (
	"fmt"
)

func main() {
	input := []int{1, 3, 4, 76, 77, 78}
	fmt.Println(longestConsecutive(input))
}

func longestConsecutive(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	set := make(map[int]bool, len(nums))
	for _, num := range nums {
		set[num] = true
	}

	longest := 0

	for num := range set {
		// Only start counting if this is the beginning of a sequence
		if !set[num-1] {
			current := num
			length := 0

			// Count consecutive numbers
			for set[current] {
				current++
				length++
			}

			if length > longest {
				longest = length

				// Early exit: if we found a sequence covering more than half
				// the numbers, it can't be beaten (though this is rare)
				if longest > len(nums)/2 {
					break
				}
			}
		}
	}

	return longest
}
