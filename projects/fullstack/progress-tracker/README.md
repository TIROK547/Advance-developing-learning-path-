# Learning Progress Tracker

A beautiful Next.js dashboard to track your 16-week backend engineering journey.

## Features

- 📊 **Visual Progress Tracking** - See your progress across all 4 phases
- 💻 **LeetCode Stats** - Track problems solved by language and difficulty
- 🎯 **Skills Mastery** - Monitor your skill levels (Go, Django, Vim, etc.)
- 🔥 **Streaks & Stats** - Stay motivated with daily streaks and achievements
- 📅 **Phase Goals** - Track completion of each phase's objectives

## Getting Started

### 1. Install Dependencies

```bash
cd projects/fullstack/progress-tracker
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard.

### 3. Update Your Progress

Edit `data/progress.json` to update your accomplishments:

```json
{
  "currentWeek": 2,
  "leetcode": {
    "total": 15,
    "byLanguage": {
      "go": 5,
      "python": 5,
      "typescript": 5
    }
  },
  "stats": {
    "currentStreak": 7
  }
}
```

## Quick Updates

### Completed a LeetCode Problem

```json
{
  "leetcode": {
    "total": 16,
    "byLanguage": {
      "go": 6
    },
    "byDifficulty": {
      "medium": 1
    }
  }
}
```

### Completed a Skill Topic

```json
{
  "skills": {
    "vim": {
      "topics": {
        "basics": true
      }
    }
  }
}
```

### Updated Your Streak

```json
{
  "stats": {
    "currentStreak": 8,
    "totalDays": 8
  }
}
```

### Completed a Phase Goal

```json
{
  "phases": {
    "phase1": {
      "progress": {
        "vimSetup": true,
        "goBasics": true
      }
    }
  }
}
```

## Using the API

You can also update progress via the API:

```bash
# Update progress
curl -X POST http://localhost:3000/api/update \\
  -H "Content-Type: application/json" \\
  -d '{
    "currentWeek": 3,
    "leetcode": { "total": 20 }
  }'

# Get current progress
curl http://localhost:3000/api/update
```

## Dashboard Sections

### 1. Header Stats
- Current week (1-16)
- Current phase (1-4)
- Days since start

### 2. Quick Stats
- 🔥 Current coding streak
- 💻 LeetCode problems solved
- ✅ Projects completed
- 🧪 Tests written

### 3. LeetCode Progress
- Overall progress bar
- Problems by language (Go, Python, TypeScript)
- Problems by difficulty (Easy, Medium, Hard)

### 4. Skills Mastery
- Skill level indicators (🔴 Beginner, 🟡 Mid-level, 🟢 Advanced, 🔵 Expert)
- Progress on specific topics within each skill
- Visual progress bars

### 5. Phase Progress
- All 4 phases with completion percentage
- Click on a phase to see its goals
- Active phase highlighted

## Motivation

The dashboard displays your motivation:
> "Transform from mid-level to senior backend engineer in 16 weeks"

And reminds you:
> "Consistency beats intensity. Show up every day."

## Customization

### Change Colors

Edit `app/components/ProgressDashboard.tsx`:
- Gradient background: `from-gray-900 via-blue-900 to-gray-900`
- Accent colors: `text-blue-400`, `text-purple-400`, etc.

### Add New Sections

Add new tracking areas in `data/progress.json` and create corresponding UI components.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Deploy to Vercel, Netlify, or any Next.js hosting platform:

```bash
# Using Vercel CLI
vercel deploy
```

---

**Remember:** Update your progress daily to stay motivated! 🚀
