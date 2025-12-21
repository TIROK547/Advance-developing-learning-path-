#!/bin/bash

echo "🚀 Progress Tracker - GitHub Setup Helper"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

# Get repo name
read -p "Enter repository name (default: learning-journey): " REPO_NAME
REPO_NAME=${REPO_NAME:-learning-journey}

echo ""
echo "📝 Setting up environment configuration..."

# Create .env.local file
cat > .env.local << EOL
# GitHub Configuration
GITHUB_PROGRESS_URL=https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/main/projects/fullstack/progress-tracker/data/progress.json

# Optional: Add your GitHub token here for higher rate limits
# GITHUB_TOKEN=your_token_here
EOL

echo "✅ Created .env.local"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: ${REPO_NAME}"
echo "   - Make it public (or add GITHUB_TOKEN if private)"
echo ""
echo "2. Push your code:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: Progress tracker'"
echo "   git remote add origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   cd projects/fullstack/progress-tracker"
echo "   vercel"
echo ""
echo "4. Add environment variable in Vercel:"
echo "   GITHUB_PROGRESS_URL=https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/main/projects/fullstack/progress-tracker/data/progress.json"
echo ""
echo "🎉 Setup complete! Follow the steps above."

