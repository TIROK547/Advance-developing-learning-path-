package main

import (
	"fmt"
	"sort"
)

func main() {

}

func groupAnagrams(strs []string) [][]string {
	table := make(map[string][]string)
	for i := 0; i < len(strs); i++ {
		b := []byte(strs[i])
		sort.Slice(b, func(i, j int) bool {
			return b[i] < b[j]
		})

		sorted_word := string(b)
		table[sorted_word] = append(table[sorted_word], strs[i])
	}

	var res [][]string

	for _, group := range table {
		res = append(res, group)
	}
	return res
}
