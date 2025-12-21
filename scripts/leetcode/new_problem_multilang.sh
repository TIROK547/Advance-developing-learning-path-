#!/bin/bash
# Create a new LeetCode problem file in Go, Python, and TypeScript

DATE=$(date +%Y-%m-%d)
MONTH=$(date +%Y-%m)

echo "Problem name (kebab-case):"
read PROBLEM_NAME

echo "Difficulty (Easy/Medium/Hard):"
read DIFFICULTY

echo "LeetCode URL:"
read URL

# Create Go file
GO_FILE="leetcode/${MONTH}/${DATE}_${PROBLEM_NAME}.go"
cat > "$GO_FILE" << EOF
package main

/*
Problem: ${PROBLEM_NAME}
Difficulty: ${DIFFICULTY}
URL: ${URL}
Date: ${DATE}

Approach:
[Describe your approach]

Time Complexity: O(?)
Space Complexity: O(?)
*/

func solutionMethod() {
    // Go solution here
}

func main() {
    // Test cases
}
EOF

# Create Python file
PY_FILE="leetcode/${MONTH}/${DATE}_${PROBLEM_NAME}.py"
cat > "$PY_FILE" << EOF
"""
Problem: ${PROBLEM_NAME}
Difficulty: ${DIFFICULTY}
URL: ${URL}
Date: ${DATE}

Approach:
[Describe your approach]

Time Complexity: O(?)
Space Complexity: O(?)
"""

class Solution:
    def solutionMethod(self):
        # Python solution here
        pass

# Test cases
if __name__ == "__main__":
    solution = Solution()
    # Add test cases here
    pass
EOF

# Create TypeScript file
TS_FILE="leetcode/${MONTH}/${DATE}_${PROBLEM_NAME}.ts"
cat > "$TS_FILE" << EOF
/*
Problem: ${PROBLEM_NAME}
Difficulty: ${DIFFICULTY}
URL: ${URL}
Date: ${DATE}

Approach:
[Describe your approach]

Time Complexity: O(?)
Space Complexity: O(?)
*/

function solutionMethod(): void {
    // TypeScript solution here
}

// Test cases
EOF

# Create notes file
NOTES_FILE="leetcode/${MONTH}/${DATE}_${PROBLEM_NAME}_NOTES.md"
cat > "$NOTES_FILE" << EOF
# ${PROBLEM_NAME}

**Difficulty:** ${DIFFICULTY}
**Date:** ${DATE}
**URL:** ${URL}

## Problem Description

[Describe the problem in your own words]

## Approach

[Explain your approach]

## Solutions Comparison

### Go
- **Pros:**
- **Cons:**
- **Notes:**

### Python
- **Pros:**
- **Cons:**
- **Notes:**

### TypeScript
- **Pros:**
- **Cons:**
- **Notes:**

## Language Idioms Learned

### Go:


### Python:


### TypeScript:


## Key Takeaways

1.
2.
3.

## Related Problems

-
EOF

echo ""
echo "✓ Created files:"
echo "  - $GO_FILE"
echo "  - $PY_FILE"
echo "  - $TS_FILE"
echo "  - $NOTES_FILE"
echo ""
echo "Now solve the problem in all 3 languages and compare!"
