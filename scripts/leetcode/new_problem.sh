#!/bin/bash
# Create a new LeetCode problem file with template

DATE=$(date +%Y-%m-%d)
MONTH=$(date +%Y-%m)

echo "Problem name (kebab-case):"
read PROBLEM_NAME

echo "Difficulty (Easy/Medium/Hard):"
read DIFFICULTY

FILE="leetcode/${MONTH}/${DATE}_${PROBLEM_NAME}.py"

cat > "$FILE" << EOF
"""
Problem: ${PROBLEM_NAME}
Difficulty: ${DIFFICULTY}
URL:
Date: ${DATE}

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
    pass
EOF

echo "✓ Created: $FILE"
echo "You can now edit: $FILE"
