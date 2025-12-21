# Deployment Guide

Deploy your progress tracker to Vercel with automatic GitHub sync.

## 🚀 Quick Deploy to Vercel

### 1. Push to GitHub

```bash
cd /home/tirok547/Code/Advance-developing-learning-path-

# Initialize git if not already done
git add .
git commit -m "Add progress tracker with GitHub sync"

# Create GitHub repo and push
# Go to github.com and create a new repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from the progress-tracker directory
cd projects/fullstack/progress-tracker
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? progress-tracker
# - In which directory is your code located? ./
# - Want to override the settings? No
```

**Option B: Vercel Dashboard**

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Set Root Directory: `projects/fullstack/progress-tracker`
5. Click "Deploy"

### 3. Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```bash
GITHUB_PROGRESS_URL=https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/projects/fullstack/progress-tracker/data/progress.json

# Optional (for higher rate limits):
GITHUB_TOKEN=your_github_personal_access_token
```

**To create a GitHub token:**
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (read access)
4. Copy the token and add to Vercel

### 4. Configure Vercel Deployment

Create `vercel.json` in the progress-tracker directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

## 🔄 Auto-Update Workflow

### How It Works:

1. **You update progress locally:**
   ```bash
   nvim data/progress.json
   # Update your stats
   ```

2. **Commit and push to GitHub:**
   ```bash
   git add data/progress.json
   git commit -m "Update progress: completed 5 LeetCode problems"
   git push
   ```

3. **Dashboard auto-updates:**
   - Vercel detects the change
   - Rebuilds and deploys automatically
   - Your live dashboard shows new progress!

### Webhook for Instant Updates (Optional)

Create `.github/workflows/trigger-deploy.yml`:

```yaml
name: Trigger Vercel Deploy on JSON Update

on:
  push:
    paths:
      - 'projects/fullstack/progress-tracker/data/progress.json'
    branches:
      - main

jobs:
  trigger-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy
        run: |
          curl -X POST "https://api.vercel.com/v1/integrations/deploy/${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

**Setup:**
1. In Vercel → Settings → Git → Deploy Hooks
2. Create a new hook
3. Copy the URL
4. Add to GitHub Secrets as `VERCEL_DEPLOY_HOOK`

## 📱 Update Your Progress (Daily Workflow)

### Local Development:

```bash
# Edit progress
nvim data/progress.json

# Test locally
npm run dev
# Check http://localhost:3000

# Push to GitHub
git add data/progress.json
git commit -m "Day 5: Completed Go concurrency module"
git push
```

### The deployed site will update automatically! ✨

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_PROGRESS_URL` | Yes | Raw GitHub URL to your progress.json |
| `GITHUB_TOKEN` | No | GitHub token for higher API rate limits |
| `NEXT_PUBLIC_BASE_URL` | Auto | Set automatically by Vercel |

## 🎯 Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel project deployed
- [ ] Environment variables set
- [ ] Test deployment by visiting your Vercel URL
- [ ] Update progress.json and push
- [ ] Verify dashboard auto-updates

## 🚨 Troubleshooting

### "Failed to fetch progress data"
- Check `GITHUB_PROGRESS_URL` is correct
- Ensure repository is public OR GitHub token is set
- Verify JSON file path in repo matches URL

### "Rate limit exceeded"
- Add `GITHUB_TOKEN` environment variable
- Token increases rate limit from 60 to 5,000 requests/hour

### Dashboard shows old data
- Wait 60 seconds (cache duration)
- Or manually refresh: POST to `/api/progress`

### Deployment fails
- Check build logs in Vercel dashboard
- Ensure all dependencies in package.json
- Verify Node.js version compatibility

## 🎉 Your Dashboard is Live!

Once deployed, you'll have:
- **Live URL:** https://your-app.vercel.app
- **Auto-updates:** Push JSON changes → Dashboard updates
- **Fast:** Cached for 60 seconds, instant after
- **Free:** Vercel free tier is perfect for this

## 📈 Next Steps

1. **Bookmark your dashboard URL**
2. **Update progress daily:**
   ```bash
   nvim data/progress.json
   git add data/progress.json
   git commit -m "Daily update"
   git push
   ```
3. **Watch your progress grow!** 🚀

## 💡 Pro Tips

- **Mobile access:** Your Vercel URL works on phone
- **Custom domain:** Add in Vercel settings
- **Analytics:** Enable Vercel Analytics for free
- **Share:** Share your dashboard URL with mentors/friends

---

**Need help?** Check Vercel docs: https://vercel.com/docs
