package main

import (
	"fmt"
)

func main() {
	fmt.Println(isIsomorphic("doga", "moaa"))
	fmt.Println(isIsomorphic("dogg", "moaa"))
}

func isIsomorphic(s string, t string) bool {
	p2c := make(map[byte]byte)
	c2p := make(map[byte]byte)

	for i := 0; i < len(s); i = i + 1 {
		currentPattern, patternExist := p2c[t[i]]
		currentChar, charExist := c2p[s[i]]
		if !charExist && !patternExist {
			p2c[t[i]] = s[i]
			c2p[s[i]] = t[i]
		} else if (patternExist && currentChar != t[i]) ||
			(charExist && currentPattern != s[i]) {

			return false
		}
	}
	return true
}
