package main

import (
	"fmt"
	"strings"
)

func main() {
	test_pattern := "abba"
	test_string := "dog cat cat dog"
	fmt.Println(wordPattern(test_pattern, test_string))
}

func wordPattern(pattern string, s string) bool {
	words := strings.Split(s, " ")

	w2p := map[string]byte{}
	p2w := map[byte]string{}

	if len(words) != len(pattern) {
		return false
	}

	length := len(words)

	for i := 0; i < length; i++ {
		_, ok1 := p2w[pattern[i]]
		_, ok2 := w2p[words[i]]

		if !ok1 && !ok2 {
			p2w[pattern[i]] = words[i]
			w2p[words[i]] = pattern[i]
		} else {
			if p2w[pattern[i]] != words[i] || w2p[words[i]] != pattern[i] {
				return false
			}
		}
	}
	return true
}
