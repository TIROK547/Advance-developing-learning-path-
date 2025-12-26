package main

import (
	"fmt"
)

type User struct {
	name      string
	age       int
	isStuding bool
}

func main() {
	var users [3]User

	users[0] = User{
		name:      "ilia",
		age:       19,
		isStuding: true,
	}
	users[1] = User{
		name:      "paniz",
		age:       18,
		isStuding: true,
	}
	users[2] = User{
		name:      "deniz",
		age:       11,
		isStuding: false,
	}

	fmt.Println(users[2].name)
}
