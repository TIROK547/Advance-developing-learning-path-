package main

import (
	"fmt"
	"strings"
)

func main() {
	testPattern := "abba"
	testString := "dog cat cat dog"
	fmt.Println(wordPattern(testPattern, testString))
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
		pw, ok1 := p2w[pattern[i]]
		wp, ok2 := w2p[words[i]]

		currentWord := words[i]
		currentPattern := pattern[i]

		if !ok1 && !ok2 {
			p2w[pattern[i]] = currentWord
			w2p[words[i]] = currentPattern
		} else {
			if pw != currentWord || wp != currentPattern {
				return false
			}
		}
	}
	return true
}
