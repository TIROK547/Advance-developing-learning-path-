# Quick Start Guide

## 🚀 Start Tracking Your Progress NOW

### 1. Start the Dashboard (2 minutes)

```bash
cd /home/tirok547/Code/Advance-developing-learning-path-/projects/fullstack/progress-tracker
npm run dev
```

Open: **http://localhost:3000**

### 2. Update Your Progress Daily

**Option 1: Edit the JSON file** (Easiest)
```bash
# Open the progress file in Vim (practice!)
nvim data/progress.json
```

**Option 2: Use the API**
```bash
# Update from command line
curl -X POST http://localhost:3000/api/update \
  -H "Content-Type: application/json" \
  -d '{"currentWeek": 2, "stats": {"currentStreak": 5}}'
```

### 3. Daily Update Checklist

At the end of each day, update:

```json
{
  "currentWeek": 1,
  "stats": {
    "currentStreak": 1,
    "totalDays": 1
  },
  "leetcode": {
    "total": 1,
    "byLanguage": {
      "go": 1,
      "python": 1,
      "typescript": 1
    },
    "byDifficulty": {
      "medium": 1
    }
  }
}
```

### 4. Weekly Updates

Every Sunday:

```json
{
  "currentWeek": 2,
  "phases": {
    "phase1": {
      "progress": {
        "vimSetup": true,
        "goBasics": true
      }
    }
  },
  "skills": {
    "vim": {
      "topics": {
        "basics": true
      }
    }
  }
}
```

## 📊 What You'll See

### Dashboard Highlights:
- **Header**: Current week, phase, days coding
- **Stats Cards**: Streak, LeetCode count, projects, tests
- **LeetCode Progress**: Beautiful progress bars by language
- **Skills Mastery**: Visual skill levels with progress
- **Phase Progress**: 4 phases with clickable goals

### Skill Levels:
- 🔴 **Beginner** - Just starting
- 🟡 **Mid-level** - Comfortable (where you start with Django!)
- 🟢 **Advanced** - Strong proficiency
- 🔵 **Expert** - Mastery

## 💡 Pro Tips

1. **Update Daily** - Keep your streak alive! 🔥
2. **Be Honest** - Accurate tracking = better motivation
3. **Celebrate Wins** - Watch those progress bars grow!
4. **Use Vim** - Edit the JSON in Vim for practice
5. **Screenshot** - Save progress screenshots weekly

## 🎯 First Week Goals

Update these as you complete them:

```json
{
  "weeklyGoals": {
    "week1": {
      "vimPractice": true,
      "leetcodeProblems": 5,
      "goLearning": true,
      "projectWork": true,
      "notesDocumented": true,
      "codeCommitted": true
    }
  }
}
```

## 🔧 Troubleshooting

**Dashboard won't load?**
```bash
# Check if dev server is running
lsof -i :3000

# Restart if needed
cd projects/fullstack/progress-tracker
npm run dev
```

**JSON errors?**
- Use a JSON validator: https://jsonlint.com/
- Check for missing commas or quotes
- Ensure proper nesting

## 🌟 Stay Motivated

Your dashboard shows:
> "Transform from mid-level to senior backend engineer in 16 weeks"

And reminds you daily:
> "Consistency beats intensity. Show up every day."

---

**Ready?** Start the server and begin tracking! 🚀

```bash
cd /home/tirok547/Code/Advance-developing-learning-path-/projects/fullstack/progress-tracker
npm run dev
```

Then open: http://localhost:3000
