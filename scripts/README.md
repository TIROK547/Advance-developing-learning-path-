# Utility Scripts

This directory contains automation scripts to support your learning routine.

## Directory Structure

```
scripts/
├── leetcode/          # LeetCode automation
├── git-hooks/         # Git hooks for workflow
├── automation/        # General automation scripts
└── productivity/      # Productivity enhancers
```

## Script Ideas

### LeetCode (`leetcode/`)
- **`new_problem.sh`** - Create a new LeetCode problem file with template
- **`submit_check.py`** - Validate solution format before committing
- **`streak_tracker.sh`** - Track daily solving streak

### Git Hooks (`git-hooks/`)
- **`pre-commit`** - Run linters, format code, check for secrets
- **`commit-msg`** - Validate commit message format
- **`pre-push`** - Run tests before pushing

### Automation (`automation/`)
- **`project_setup.sh`** - Bootstrap new Django/Go project with structure
- **`docker_cleanup.sh`** - Clean up unused Docker resources
- **`backup_notes.sh`** - Backup notes to cloud storage

### Productivity (`productivity/`)
- **`focus_timer.sh`** - Pomodoro timer for focused work
- **`daily_report.py`** - Generate daily progress summary
- **`learning_stats.py`** - Visualize learning metrics

## Example Scripts

### Create New LeetCode Problem

```bash
#!/bin/bash
# scripts/leetcode/new_problem.sh

DATE=$(date +%Y-%m-%d)
MONTH=$(date +%Y-%m)

echo "Problem name (kebab-case):"
read PROBLEM_NAME

FILE="leetcode/${MONTH}/${DATE}_${PROBLEM_NAME}.py"

cat > "$FILE" << 'EOF'
"""
Problem: [Problem Name]
Difficulty: [Easy/Medium/Hard]
URL: [LeetCode URL]
Date: DATE_PLACEHOLDER

Description:
[Brief problem description]

Approach:
[Your approach/algorithm]

Time Complexity: O(?)
Space Complexity: O(?)
"""

class Solution:
    def solutionMethod(self):
        pass

# Test cases
if __name__ == "__main__":
    solution = Solution()
    # Add test cases here
EOF

sed -i "s/DATE_PLACEHOLDER/$DATE/" "$FILE"
echo "Created: $FILE"
```

### Django Project Setup

```bash
#!/bin/bash
# scripts/automation/django_project_setup.sh

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./django_project_setup.sh <project-name>"
    exit 1
fi

mkdir -p "projects/django/$PROJECT_NAME"
cd "projects/django/$PROJECT_NAME"

# Create standard files
touch README.md Dockerfile docker-compose.yml .env.example Makefile
touch .gitignore requirements.txt pytest.ini

echo "Django project structure created: $PROJECT_NAME"
```

## Installation

To use git hooks:

```bash
# Link git hooks to your .git directory
ln -sf ../../scripts/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x scripts/git-hooks/pre-commit
```

## Best Practices

1. **Make Scripts Executable** - `chmod +x script.sh`
2. **Add Shebang** - Always start with `#!/bin/bash` or `#!/usr/bin/env python3`
3. **Document Usage** - Include help text and examples
4. **Error Handling** - Check for errors and provide useful messages
5. **Idempotent** - Safe to run multiple times
6. **Version Control** - Commit scripts to track evolution
