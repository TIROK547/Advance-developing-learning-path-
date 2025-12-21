# Progress Tracker - Server Deployment Guide

Complete guide for deploying and maintaining your progress tracker on a VPS with systemd.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Server Configuration](#server-configuration)
3. [Environment Variables](#environment-variables)
4. [Daily Workflow](#daily-workflow)
5. [Troubleshooting](#troubleshooting)
6. [Maintenance](#maintenance)

---

## Initial Setup

### 1. Clone Repository on Server

```bash
cd ~
git clone git@github.com:TIROK547/Advance-developing-learning-path-.git
cd Advance-developing-learning-path-/projects/fullstack/progress-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build Application

```bash
npm run build
```

---

## Server Configuration

### 1. Create Systemd Service

Create `/etc/systemd/system/progress-tracker.service`:

```ini
[Unit]
Description=Progress Tracker Frontend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/Advance-developing-learning-path-/projects/fullstack/progress-tracker

# Environment Variables
Environment="NODE_ENV=production"
Environment="PORT=3001"
Environment="GITHUB_PROGRESS_URL=https://raw.githubusercontent.com/TIROK547/Advance-developing-learning-path-/main/projects/fullstack/progress-tracker/data/progress.json"
Environment="NEXT_PUBLIC_BASE_URL=http://localhost:3001"

# Optional: Add GitHub token to avoid rate limits
# Environment="GITHUB_TOKEN=your_github_token"

ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

# Resource limits (optional)
MemoryLimit=512M
CPUQuota=50%

[Install]
WantedBy=multi-user.target
```

### 2. Enable and Start Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable progress-tracker
sudo systemctl start progress-tracker
sudo systemctl status progress-tracker
```

### 3. Configure Cloudflare Tunnel

Edit `/etc/cloudflared/config.yml`:

```yaml
tunnel: portfolio
credentials-file: /etc/cloudflared/portfolio.json

ingress:
  - hostname: portfolio.tirok.ir
    service: http://localhost:3000
  - hostname: developing.tirok.ir
    service: http://localhost:3001
  - service: http_status:404
```

Restart cloudflared:

```bash
sudo systemctl restart cloudflared
```

### 4. DNS Configuration

Add CNAME record in Cloudflare:
- **Type**: CNAME
- **Name**: `developing`
- **Target**: `<your-tunnel-id>.cfargotunnel.com` or `portfolio.cfargotunnel.com`
- **Proxy**: Enabled (orange cloud)

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_PROGRESS_URL` | GitHub raw URL to progress.json | `https://raw.githubusercontent.com/...` |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | `http://localhost:3001` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Application port | `3001` |

### Optional Variables

| Variable | Description | When to Use |
|----------|-------------|-------------|
| `GITHUB_TOKEN` | Personal access token | If hitting GitHub rate limits |

### How to Update Environment Variables

1. Edit the systemd service file:
   ```bash
   sudo nano /etc/systemd/system/progress-tracker.service
   ```

2. Add/modify Environment lines in `[Service]` section

3. Reload and restart:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart progress-tracker
   ```

---

## Daily Workflow

### 1. Update Progress Locally

```bash
cd ~/Code/Advance-developing-learning-path-/projects/fullstack/progress-tracker
npm run update daily
```

Answer the prompts:
- Did you practice Vim? (y/n)
- Did you work on Go? (y/n)
- Did you work on a project? (y/n)
- How many LeetCode problems? (number)
  - If > 0: Language? (go/python/typescript)
  - If > 0: Difficulty? (easy/medium/hard)
- How many commits? (number)

### 2. Commit and Push

```bash
git add data/progress.json
git commit -m "Update progress - Day X"
git push
```

### 3. Verify Update

Wait 60 seconds (cache expiration), then visit:
```
https://developing.tirok.ir
```

Or force refresh the cache:
```bash
curl -X POST http://localhost:3001/api/progress
```

### Alternative: Quick CLI Updates

```bash
# Add LeetCode problems
npm run update leetcode go easy 2

# Toggle skills
npm run update skill go basics

# Update stats
npm run update stats currentStreak 5

# View progress
npm run update show
```

---

## Troubleshooting

### Site Shows "Failed to fetch progress data"

**Check 1: Is the service running?**
```bash
sudo systemctl status progress-tracker
```

**Check 2: Can the server reach GitHub?**
```bash
curl -s https://raw.githubusercontent.com/TIROK547/Advance-developing-learning-path-/main/projects/fullstack/progress-tracker/data/progress.json
```

**Check 3: Is the API working?**
```bash
curl -s http://localhost:3001/api/progress | jq .
```

**Check 4: View logs**
```bash
sudo journalctl -u progress-tracker -n 50 --no-pager
```

**Fix:** Restart the service
```bash
sudo systemctl restart progress-tracker
```

### Data Not Updating After Push

**Check 1: Did GitHub receive the push?**
```bash
curl -s "https://raw.githubusercontent.com/TIROK547/Advance-developing-learning-path-/main/projects/fullstack/progress-tracker/data/progress.json" | grep totalDays
```

**Check 2: Clear the cache**
```bash
curl -X POST http://localhost:3001/api/progress
```

**Check 3: Check cache age**
```bash
curl -I http://localhost:3001/api/progress
```

Look for `X-Cache-Age` header.

### Service Won't Start

**Check 1: Syntax errors in service file**
```bash
sudo systemd-analyze verify progress-tracker.service
```

**Check 2: Check for port conflicts**
```bash
ss -tlnp | grep 3001
```

**Check 3: Check permissions**
```bash
ls -la /root/Advance-developing-learning-path-/projects/fullstack/progress-tracker
```

---

## Maintenance

### Daily Backups

Backups are created automatically when you run `npm run update daily`. They're stored in:
```
data/backups/progress-YYYY-MM-DD.json
```

### Manual Backup

```bash
npm run update backup
```

### Updating the Application

When you make changes to the code:

```bash
cd /root/Advance-developing-learning-path-/projects/fullstack/progress-tracker
git pull
npm install  # If dependencies changed
npm run build
sudo systemctl restart progress-tracker
```

### Monitoring

**Check service status:**
```bash
sudo systemctl status progress-tracker
```

**View real-time logs:**
```bash
sudo journalctl -u progress-tracker -f
```

---

## Quick Reference

```bash
# Service management
sudo systemctl restart progress-tracker
sudo systemctl status progress-tracker

# View logs
sudo journalctl -u progress-tracker -f

# Update progress
npm run update daily
npm run update show

# Cache management
curl -X POST http://localhost:3001/api/progress  # Clear cache
```

---

**Last Updated:** 2025-12-21
