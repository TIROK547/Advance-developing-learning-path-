# Progress Tracker CLI

Production-ready CLI tool to update your progress data locally with full validation and error handling.

## Quick Start

The easiest way to update your progress daily:

```bash
npm run update daily
```

This interactive command asks about your day and updates everything automatically.

## Features

✅ **Input Validation** - All inputs are validated with helpful error messages
✅ **Auto Backups** - Creates daily backups automatically in `data/backups/`
✅ **Error Handling** - Graceful error handling with clear messages
✅ **Progress Summary** - Visual feedback with emojis and formatting
✅ **Command Line & Interactive** - Supports both modes

## Commands

### 📅 Daily Update (Recommended)

```bash
npm run update daily
```

**Interactive questions:**
- Did you practice Vim today? (y/n)
- Did you work on Go today? (y/n)
- Did you work on a project? (y/n)
- How many LeetCode problems? (0-50)
  - If > 0: Main language used? (go/python/typescript)
  - If > 0: Average difficulty? (easy/medium/hard)
- How many commits today? (0-100)

**Updates:**
- Weekly goals (vimPractice, goLearning, projectWork, codeCommitted)
- LeetCode total + by language + by difficulty
- Stats (totalDays, currentStreak, longestStreak, commitsThisWeek)
- Last updated date

**Example output:**
```
==================================================
✅ DAILY UPDATE COMPLETE
==================================================
📊 Day 5 | Streak: 5 🔥
💻 LeetCode: 12/100 (+3 today)
📝 Commits: 8 this week (+2 today)
==================================================
```

### 💻 Add LeetCode Problems

```bash
# Interactive
npm run update leetcode

# Command line
npm run update leetcode go easy 3
npm run update leetcode python medium 1
npm run update leetcode typescript hard 2
```

### 🎯 Toggle Skills

```bash
# Interactive
npm run update skill

# Command line
npm run update skill go basics
npm run update skill vim intermediate
npm run update skill django async
```

**Available skills:**
- `go`: basics, concurrency, webServers, databases, testing
- `django`: advancedORM, caching, async, customComponents, performance
- `vim`: basics, intermediate, lspSetup, advanced
- `databases`: postgresql, redis, rabbitmq, optimization
- `infrastructure`: docker, linux, cicd
- `frontend`: nextjs, typescript, apiIntegration

### 📊 Update Weekly Goals

```bash
# Interactive
npm run update week

# Command line
npm run update week 1 vimPractice
npm run update week 1 goLearning
npm run update week 1 leetcodeProblems 5
```

### 🎯 Update Phase Progress

```bash
# Interactive
npm run update phase

# Command line
npm run update phase 1 goBasics
npm run update phase 1 vimSetup
npm run update phase 2 docker
```

### 📈 Update Stats

```bash
# Interactive
npm run update stats

# Command line
npm run update stats totalDays 10
npm run update stats currentStreak 5
npm run update stats commitsThisWeek 20
```

**Available fields:**
- `totalDays` - Total days in the program
- `currentStreak` - Current consecutive days
- `longestStreak` - Longest streak achieved
- `projectsCompleted` - Number of projects completed
- `testsWritten` - Number of tests written
- `commitsThisWeek` - Git commits this week

### 📁 Add Project

```bash
# Interactive
npm run update project

# Command line
npm run update project "CLI Tool" "A progress tracker" "Node.js,TypeScript"
```

### 📊 Show Progress

```bash
npm run update show
```

**Example output:**
```
==================================================
📊 PROGRESS SUMMARY
==================================================
📅 Week 1 | Phase 1
🔥 Streak: 5 days (longest: 5)
💻 LeetCode: 12/100 problems
   - Go: 5 | Python: 4 | TypeScript: 3
   - Easy: 6 | Medium: 5 | Hard: 1
📁 Projects: 2 total
💾 Commits this week: 8
📝 Last updated: 2025-12-21
==================================================
```

### 🛠️ Utilities

```bash
# Create manual backup
npm run update backup

# Reset streak to 0 (when you miss a day)
npm run update reset-streak

# Show help
npm run update
```

## Workflow

### Daily Routine (Recommended)

1. **End of day**: Run the daily update
   ```bash
   npm run update daily
   ```

2. **Commit and push** your changes
   ```bash
   git add data/progress.json
   git commit -m "Update progress - Day X"
   git push
   ```

3. **Site updates automatically** within 60 seconds via GitHub

### Alternative: Specific Updates Throughout the Day

```bash
# Morning: Solved a LeetCode problem
npm run update leetcode go easy 1

# Afternoon: Completed a skill topic
npm run update skill go basics

# Evening: Quick stats update
npm run update stats commitsThisWeek 5
```

Then commit and push when convenient.

## Input Validation

All commands validate inputs and show helpful error messages:

```bash
# Example: Invalid language
npm run update leetcode java easy 1
# Output: ❌ Must be: go, python, or typescript

# Example: Invalid number
npm run update stats totalDays abc
# Output: ❌ Must be a number between 0 and 10000

# Example: Out of range
npm run update week 20 vimPractice
# Output: ❌ Must be between 1 and 16
```

## Backups

### Automatic Backups

Backups are created automatically when you save changes (max one per day).

**Location:** `data/backups/progress-YYYY-MM-DD.json`

### Manual Backup

```bash
npm run update backup
```

### Restore from Backup

```bash
# List backups
ls -lh data/backups/

# Restore
cp data/backups/progress-2025-12-21.json data/progress.json

# Commit and push
git add data/progress.json
git commit -m "Restore from backup - 2025-12-21"
git push
```

## Error Handling

The CLI handles errors gracefully:

- **File not found**: Clear error message with path
- **Invalid JSON**: Parsing error with line number
- **Invalid data structure**: Validation error
- **Backup fails**: Warning (non-fatal), continues with save

## Tips & Best Practices

1. **Use `daily` command** - It's the most convenient and comprehensive
2. **Run at end of day** - Better recall of what you did
3. **Commit immediately** - Don't let changes pile up
4. **Check `show`** before big milestones - Verify your progress
5. **Keep backups** - They're automatic, but check them periodically

## Advanced Usage

### Command Line Arguments

All commands support command-line arguments to skip interactive prompts:

```bash
# Full non-interactive LeetCode update
npm run update leetcode go easy 3

# Full non-interactive skill toggle
npm run update skill vim basics

# Full non-interactive stats update
npm run update stats totalDays 10
```

### Chaining Commands

```bash
# Add LeetCode + update stats in sequence
npm run update leetcode go easy 2 && npm run update stats commitsThisWeek 5
```

### Scripting

```bash
#!/bin/bash
# daily-update.sh - Automate some updates

cd ~/Code/Advance-developing-learning-path-/projects/fullstack/progress-tracker

# Update with command-line args
npm run update leetcode go easy 1
npm run update stats commitsThisWeek 3

# Commit and push
git add data/progress.json
git commit -m "Automated update - $(date +%Y-%m-%d)"
git push
```

## Troubleshooting

### "Error loading progress file"

**Cause:** The `data/progress.json` file is missing or corrupted

**Fix:**
```bash
# Restore from backup
cp data/backups/progress-YYYY-MM-DD.json data/progress.json
```

### "Invalid data structure"

**Cause:** The JSON structure doesn't match expected format

**Fix:**
```bash
# Check JSON validity
cat data/progress.json | jq .

# Restore from backup if needed
cp data/backups/progress-YYYY-MM-DD.json data/progress.json
```

### Input validation keeps failing

**Cause:** Typing invalid values

**Solution:** Check the error message - it shows valid options
```
❌ Must be one of: go, python, typescript
```

## Support

For issues:
1. Check this documentation
2. Run `npm run update` for help
3. Check `data/backups/` for recovery options
4. Review error messages - they're descriptive

---

**Version:** 2.0.0
**Last Updated:** 2025-12-21
