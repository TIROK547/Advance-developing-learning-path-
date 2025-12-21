# START HERE - Day 1 Guide

Welcome to your backend engineering learning journey! Choose your path based on your experience level.

---

## Choose Your Day 1 Approach:

### Option 1: Go + Vim Priority (Recommended for Mid-Level Django Devs)
**Best if:** You're already comfortable with Django and want to learn Go and Vim first

[Jump to Go + Vim Day 1](#go--vim-day-1)

### Option 2: Django-First Approach
**Best if:** You're new to Django or want to strengthen fundamentals first

[Jump to Django Day 1](#django-day-1)

---

# Go + Vim Day 1

Your backend engineering journey starts NOW with **Go** and **Vim**!

## Your Motivation-Driven Path

**You're excited about:**
1. **Go** - Fast, simple, concurrent
2. **Vim/Neovim** - Professional terminal workflow
3. **Multi-language** - Solve problems in Go, Python, TypeScript

**Today you'll:**
- Start learning Vim (no going back!)
- Write your first Go program
- Solve LeetCode in multiple languages
- Use Neovim for everything

---

## Step 1: Install Tools (15 minutes)

### Install Neovim
```bash
# macOS
brew install neovim

# Linux (Ubuntu/Debian)
sudo apt install neovim

# Arch
sudo pacman -S neovim
```

### Install Go
```bash
# macOS
brew install go

# Linux
# Download from https://go.dev/dl/
wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# Verify
go version
```

### Install Node.js (for TypeScript)
```bash
# macOS
brew install node

# Linux
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install TypeScript
npm install -g typescript ts-node
```

---

## Step 2: Vim Basics (30 minutes)

**The commitment:** Delete PyCharm by end of week 2

### Start vimtutor
```bash
vimtutor
```

**Complete it!** Take notes in Neovim:
```bash
nvim ~/vim-notes.md
```

### Essential Commands to Practice NOW:

**Movement:**
- `h j k l` - Left, Down, Up, Right (NO ARROW KEYS!)
- `w b` - Word forward/backward
- `0 $` - Start/end of line
- `gg G` - Top/bottom of file

**Insert Mode:**
- `i` - Insert before cursor
- `a` - Insert after cursor
- `o` - New line below
- `Esc` - Back to normal mode

**Save & Quit:**
- `:w` - Save
- `:q` - Quit
- `:wq` - Save and quit
- `:q!` - Quit without saving

**Delete:**
- `dd` - Delete line
- `x` - Delete character

**Undo:**
- `u` - Undo
- `Ctrl-r` - Redo

**Practice 30 minutes, then continue**

---

## Step 3: Go "Hello World" (30 minutes)

### Create your first Go program
```bash
mkdir -p ~/go-learning
cd ~/go-learning
nvim hello.go  # YES, use nvim!
```

**Type this in Neovim:**
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
    fmt.Println("I'm learning in Neovim!")
}
```

**Save and run:**
```bash
# In Neovim, press Esc then type:
:w
:q

# Run it
go run hello.go
```

**Success!** You just wrote Go in Vim!

---

## Step 4: Multi-Language LeetCode (60-90 minutes)

### Create your first problem files
```bash
./scripts/leetcode/new_problem_multilang.sh
```

**Enter:**
- Problem: two-sum
- Difficulty: Easy
- URL: https://leetcode.com/problems/two-sum/

### Solve in Go (30 min) - USING VIM!
```bash
nvim leetcode/2025-12/$(date +%Y-%m-%d)_two-sum.go
```

**Solution:**
```go
package main

import "fmt"

/*
Problem: Two Sum
Difficulty: Easy
URL: https://leetcode.com/problems/two-sum/
Date: 2025-12-21

Approach: Hash map to store complements

Time Complexity: O(n)
Space Complexity: O(n)
*/

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)

    for i, num := range nums {
        complement := target - num
        if j, found := seen[complement]; found {
            return []int{j, i}
        }
        seen[num] = i
    }

    return nil
}

func main() {
    // Test cases
    nums := []int{2, 7, 11, 15}
    target := 9
    result := twoSum(nums, target)
    fmt.Printf("Result: %v\n", result) // [0, 1]
}
```

**Run it:**
```bash
go run leetcode/2025-12/$(date +%Y-%m-%d)_two-sum.go
```

### Solve in Python (20 min)
```bash
nvim leetcode/2025-12/$(date +%Y-%m-%d)_two-sum.py
```

**Solution:**
```python
"""
Same problem in Python for comparison
"""

def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []

# Test
if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    result = twoSum(nums, target)
    print(f"Result: {result}")  # [0, 1]
```

### Solve in TypeScript (20 min)
```bash
nvim leetcode/2025-12/$(date +%Y-%m-%d)_two-sum.ts
```

**Solution:**
```typescript
function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }
        seen.set(nums[i], i);
    }

    return [];
}

// Test
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(`Result: ${result}`); // [0, 1]
```

### Compare Solutions (10 min)

Open notes file:
```bash
nvim leetcode/2025-12/$(date +%Y-%m-%d)_two-sum_NOTES.md
```

**Document:**
- Which solution was cleanest?
- Which language felt most natural?
- What did you learn about each language?

---

## Step 5: Monday Schedule - Go Deep Dive (4-5 hours)

### Take the Go Tour (2-3 hours)
```bash
# Visit: https://go.dev/tour/
# Or install locally:
go install golang.org/x/tour@latest
tour
```

**Cover:**
- Basics (packages, imports, functions)
- Flow control (for, if, switch)
- More types (structs, slices, maps)
- Methods and interfaces

**Take notes in Vim:**
```bash
mkdir -p notes/backend/go
nvim notes/backend/go/day-01-basics.md
```

### Build a Simple Go CLI Tool (2 hours)

**Project:** Todo CLI app

```bash
mkdir -p projects/go/cli-tools/todo-cli
cd projects/go/cli-tools/todo-cli
go mod init todo-cli
nvim main.go
```

**Simple version:**
```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    todos := []string{}
    scanner := bufio.NewScanner(os.Stdin)

    for {
        fmt.Println("\n=== Todo CLI ===")
        fmt.Println("1. Add todo")
        fmt.Println("2. List todos")
        fmt.Println("3. Quit")
        fmt.Print("Choice: ")

        scanner.Scan()
        choice := scanner.Text()

        switch choice {
        case "1":
            fmt.Print("Enter todo: ")
            scanner.Scan()
            todo := scanner.Text()
            todos = append(todos, todo)
            fmt.Println("✓ Added!")

        case "2":
            fmt.Println("\nYour todos:")
            for i, todo := range todos {
                fmt.Printf("%d. %s\n", i+1, todo)
            }

        case "3":
            fmt.Println("Bye!")
            return

        default:
            fmt.Println("Invalid choice")
        }
    }
}
```

**Run it:**
```bash
go run main.go
```

**Enhance it:**
- Save todos to file
- Delete todos
- Mark as complete
- Use structs for todo items

---

## Step 6: Document Everything (15 minutes)

### Update weekly tracker
```bash
cp weekly-schedule/templates/WEEK-TEMPLATE.md weekly-schedule/week-01.md
nvim weekly-schedule/week-01.md
```

**Check off:**
- [x] Vim practice (vimtutor)
- [x] Go basics learned
- [x] LeetCode in 3 languages
- [x] CLI tool built
- [x] All done in Vim!

### Commit your work
```bash
git add .
git commit -m "Day 1: Go + Vim journey begins

- Completed vimtutor
- Learned Go basics (Tour of Go)
- Solved Two Sum in Go, Python, TypeScript
- Built simple CLI tool in Go
- All coding done in Neovim!

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Tomorrow: Day 2 - Go APIs + More Vim

**You'll build:**
- Simple REST API in Go
- Same API in Django (comparison)
- Continue Vim practice

**Install for tomorrow:**
```bash
# Go web framework (optional, stdlib works too)
go get -u github.com/gin-gonic/gin

# Django
pip install django djangorestframework
```

---

## Vim Tips for Today

### While coding:
- Use `dd` to delete lines
- Use `yy` to copy lines
- Use `p` to paste
- Use `/searchterm` to find things
- Use `ciw` to change a word
- Use `o` to add new line below

### If stuck:
- Press `Esc` to get to normal mode
- Type `:q!` to quit without saving
- Type `:w` to save
- `u` to undo mistakes

### Remember:
- It's slow at first - THAT'S NORMAL
- Force yourself to use `hjkl`, not arrows
- Every time you reach for the mouse, stop yourself
- Pain now = speed later

---

## Day 1 Success Criteria (Go + Vim Path)

By end of day, you should have:
- ✅ Neovim installed and used
- ✅ Go installed and working
- ✅ vimtutor completed (or at least started)
- ✅ Go "Hello World" written
- ✅ LeetCode problem solved in 3 languages
- ✅ Simple Go CLI tool built
- ✅ Everything coded in Vim (no PyCharm!)
- ✅ Code committed to git
- ✅ Excited for tomorrow

---

# Django Day 1

For those starting with Django-first approach or strengthening fundamentals.

## Step 1: Set Up Your First Week (5 minutes)

```bash
# Copy the weekly template
cp weekly-schedule/templates/WEEK-TEMPLATE.md weekly-schedule/week-01.md

# Open it in your editor
vim weekly-schedule/week-01.md  # or code, nano, etc.
```

Fill in:
- Week number: 1
- Date range: [This week's dates]
- Weekly focus: "Django Fundamentals & ORM Mastery"
- Phase: "Foundation"

---

## Step 2: Your First LeetCode Problem (30-60 min)

```bash
# Create today's problem file
./scripts/leetcode/new_problem_multilang.sh
```

**Recommendations for Day 1:**
- **Easy problems to warm up:**
  - Two Sum
  - Valid Parentheses
  - Best Time to Buy and Sell Stock

- **Medium problems for practice:**
  - Add Two Numbers
  - Longest Substring Without Repeating Characters

**Tips:**
1. Read problem carefully
2. Think through approach before coding
3. Test with examples
4. Optimize if possible
5. Document time/space complexity

---

## Step 3: Monday Schedule - Django Deep Dive (6-8 hours)

### Morning Session (3-4 hours)

**If you're new to Django:**
1. Install Django: `pip install django djangorestframework`
2. Read Django tutorial (official docs): https://docs.djangoproject.com/
3. Create your first project:
   ```bash
   django-admin startproject myproject
   cd myproject
   python manage.py runserver
   ```

**If you know Django basics (Mid-Level):**
1. **Django ORM Deep Dive:**
   - QuerySet optimization
   - `select_related()` vs `prefetch_related()`
   - N+1 query problem
   - Query annotations and aggregations
   - Custom managers

2. **Resources:**
   - Django ORM Cookbook: https://books.agiliq.com/projects/django-orm-cookbook/
   - Official ORM docs
   - Your notes: `notes/backend/django/orm-mastery.md`
   - **Advanced topics:** See `weekly-schedule/ADVANCED.md`

3. **Practical Exercise:**
   - Create models with relationships (1-to-many, many-to-many)
   - Write complex queries
   - Use django-debug-toolbar to analyze queries
   - Optimize queries by reducing database hits

### Afternoon Session (3-4 hours)

**Project Work:**
1. **Create your first API project:**
   ```bash
   ./scripts/automation/django_project_setup.sh my-first-api api-projects
   cd projects/django/api-projects/my-first-api
   ```

2. **Implement a simple API:**
   - User model (if not using default)
   - Blog posts or tasks (simple CRUD)
   - Foreign key relationships
   - API endpoints

3. **Write tests:**
   - Model tests
   - Basic API tests
   - Test database queries

**What to build today:**
- Simple blog API or task manager API
- Focus on models and relationships
- 3-5 endpoints (list, detail, create, update, delete)

---

## Step 4: Document Your Learning (15 minutes)

### Update your weekly tracker:
```bash
vim weekly-schedule/week-01.md
```

Check off:
- [x] LeetCode problem completed
- [x] Django concepts studied
- [x] Project work done

### Write notes:
```bash
mkdir -p notes/backend/django
vim notes/backend/django/day-01-orm-basics.md
```

**Document:**
- Key concepts learned
- Code examples
- "Aha!" moments
- Questions to explore tomorrow

---

## Step 5: Commit Your Work

```bash
# Add all your work
git add .

# Commit with descriptive message
git commit -m "Day 1: Django ORM fundamentals and first API project

- Completed LeetCode problem: [problem name]
- Studied Django ORM: select_related, prefetch_related
- Created first API project with basic CRUD
- Written model tests

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Tomorrow's Preview: Tuesday - DRF + Testing

**You'll learn:**
- Django REST Framework serializers
- ViewSets and routers
- API testing with pytest
- Test factories

**Prep:**
```bash
pip install djangorestframework pytest pytest-django factory-boy
```

---

## Day 1 Success Criteria (Django Path)

By end of day, you should have:
- ✅ 1 LeetCode problem solved
- ✅ Django ORM concepts studied
- ✅ Simple API project started
- ✅ At least 1 test written
- ✅ Notes documented
- ✅ Code committed
- ✅ Tomorrow planned

---

# Common Resources (Both Paths)

## Quick Reference Commands

### LeetCode:
```bash
./scripts/leetcode/new_problem_multilang.sh
```

### Django Project:
```bash
./scripts/automation/django_project_setup.sh <name> api-projects
```

### Go Project:
```bash
./scripts/automation/go_project_setup.sh <name> cli-tools
```

### Open Weekly Schedule:
```bash
vim weekly-schedule/SCHEDULE.md
```

### Update Progress:
```bash
vim weekly-schedule/progress-tracking/PROGRESS-TRACKER.md
```

---

## Essential Resources for Week 1

### Documentation:
- Django: https://docs.djangoproject.com/
- DRF: https://www.django-rest-framework.org/
- Go: https://go.dev/doc/
- PostgreSQL: https://www.postgresql.org/docs/
- pytest: https://docs.pytest.org/

### Go Resources:
- Tour of Go: https://go.dev/tour/
- Go by Example: https://gobyexample.com/
- Effective Go: https://go.dev/doc/effective_go

### Vim Resources:
- vimtutor (built-in)
- OpenVim: https://www.openvim.com/
- Vim Adventures: https://vim-adventures.com/

### Books (Start reading this week):
- **Grokking Algorithms** - Chapters 1-3
- **The Pragmatic Programmer** - First section

### Communities (for when you're stuck):
- r/django
- r/djangolearning
- r/golang
- r/vim
- Stack Overflow

---

## Mindset for Success

**Remember:**
1. **Consistency beats intensity** - Show up every day
2. **Build, don't just read** - Hands-on practice is key
3. **Test everything** - No feature is done without tests
4. **Document daily** - Your notes are your future reference
5. **Ask for help** - Don't spend hours stuck on one thing

**It's okay to:**
- Not understand everything immediately
- Take breaks when frustrated
- Adjust the schedule to your pace
- Skip ahead if something is too easy
- Go slower if something is challenging

**Not okay to:**
- Skip LeetCode practice
- Not commit your code
- Build without tests
- Copy-paste without understanding
- Give up on day 1!

---

## Need Help?

**Stuck on something?**
1. Check official documentation first
2. Search Stack Overflow
3. Ask in community forums
4. Take a break and come back
5. Simplify the problem

**Feeling overwhelmed?**
1. That's normal on day 1
2. Focus on one thing at a time
3. Follow the schedule step by step
4. Remember: 16 weeks is plenty of time
5. Progress > perfection

**Motivation Check:**
- Vim is hard for EVERYONE at first
- Go will click by day 3-4
- Django depth comes with practice
- Multi-language practice makes you versatile

---

**You've got this! Start now, adjust as you go, and stay consistent. 🚀**

**Next:** Follow your weekly schedule in `weekly-schedule/SCHEDULE.md`
