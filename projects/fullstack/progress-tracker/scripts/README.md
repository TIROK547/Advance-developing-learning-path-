# Progress Tracker CLI

Quick CLI tool to update your progress data locally.

## Quick Start

The easiest way to update your progress daily:

```bash
npm run update daily
```

This will ask you interactive questions about your day and update everything automatically.

## Commands

### Daily Update (Recommended)
```bash
npm run update daily
```
Interactive prompt that asks about:
- Vim practice
- Go learning
- Project work
- LeetCode problems
- Git commits

### Add LeetCode Problem
```bash
npm run update leetcode go easy
npm run update leetcode python medium
npm run update leetcode typescript hard
```

### Toggle Skills
```bash
npm run update skill go basics
npm run update skill vim intermediate
npm run update skill django async
```

Available skills and topics:
- `go`: basics, concurrency, webServers, databases, testing
- `django`: advancedORM, caching, async, customComponents, performance
- `vim`: basics, intermediate, lspSetup, advanced
- `databases`: postgresql, redis, rabbitmq, optimization
- `infrastructure`: docker, linux, cicd
- `frontend`: nextjs, typescript, apiIntegration

### Update Weekly Goals
```bash
npm run update week 1 vimPractice
npm run update week 1 goLearning
npm run update week 1 leetcodeProblems 5
```

### Update Phase Progress
```bash
npm run update phase 1 goBasics
npm run update phase 1 vimSetup
npm run update phase 2 docker
```

### Update Stats
```bash
npm run update stats totalDays 10
npm run update stats currentStreak 5
npm run update stats commitsThisWeek 20
```

### Add Project
```bash
npm run update project "CLI Tool" "A progress tracker" "Node.js,JSON"
```

### Show Progress
```bash
npm run update show
```

## Workflow

1. **Daily**: Use `npm run update daily` at the end of each day
2. **Push to GitHub**: Commit and push your changes
   ```bash
   git add data/progress.json
   git commit -m "Update progress - Day X"
   git push
   ```
3. **Server updates**: The server fetches from GitHub automatically (cached for 60 seconds)

## Tips

- Run `npm run update daily` every evening before bed
- The script auto-updates `lastUpdated` date
- All data is saved to `data/progress.json`
- Push to GitHub once a day for the live site to update
