# Learning Notes

This directory contains organized notes, summaries, and key takeaways from your learning journey.

## Directory Structure

```
notes/
├── backend/                   # Backend technologies
│   ├── django/               # Django framework notes
│   ├── drf/                  # Django REST Framework
│   ├── celery/               # Async task processing
│   ├── async/                # Async Python, ASGI
│   ├── testing/              # pytest, testing strategies
│   └── go/                   # Go language and patterns
├── frontend/                  # Frontend development
│   ├── nextjs/               # Next.js framework
│   └── auth/                 # Authentication flows
├── infrastructure/            # DevOps and infrastructure
│   ├── docker/               # Docker and containerization
│   ├── linux/                # Linux system administration
│   ├── terraform/            # Infrastructure as Code
│   ├── github-actions/       # CI/CD pipelines
│   └── vim/                  # Vim editor
├── databases/                 # Database technologies
│   ├── postgresql/           # PostgreSQL deep dive
│   ├── redis/                # Redis caching and pub/sub
│   └── rabbitmq/             # Message queue patterns
├── system-design/             # System design concepts
│   ├── scalability/          # Scaling strategies
│   ├── caching/              # Caching patterns
│   ├── queues/               # Message queues and async
│   └── observability/        # Logging, metrics, tracing
├── llms/                      # LLM integration
│   ├── fundamentals/         # LLM basics, tokens, context
│   ├── backend-integration/  # LLM APIs in Django/Go
│   └── rag/                  # Retrieval-Augmented Generation
├── git/                       # Advanced Git techniques
└── books/                     # Reading notes from technical books
```

## Note-Taking Format

Use Markdown for all notes with the following structure:

### Standard Note Template

```markdown
# [Topic Name]

**Date:** YYYY-MM-DD
**Status:** Learning / Practicing / Mastered
**Priority:** High / Medium / Low

## Overview
Brief description of the topic

## Key Concepts
- Concept 1: explanation
- Concept 2: explanation

## Code Examples
\`\`\`python
# Practical code snippets
\`\`\`

## Common Patterns
- Pattern 1
- Pattern 2

## Gotchas & Best Practices
- Watch out for X
- Always do Y

## Resources
- [Link to documentation]
- [Helpful article]

## Personal Notes
- Things that clicked for me
- Connection to other concepts
- Questions to explore further
```

## Book Notes Template

For books in `/books` directory:

```markdown
# [Book Title]

**Author:** [Name]
**Started:** YYYY-MM-DD
**Completed:** YYYY-MM-DD
**Rating:** ⭐⭐⭐⭐⭐

## Key Takeaways
1. Main point 1
2. Main point 2

## Chapter Summaries
### Chapter 1: [Title]
- Summary
- Important concepts

## Actionable Insights
- How to apply this in projects
- Specific techniques to practice

## Quotes
> "Memorable quote from the book"
```

## Best Practices

1. **Note Daily** - Write notes while learning, not after
2. **Link Concepts** - Cross-reference related topics
3. **Code Examples** - Include practical, runnable code
4. **Update Regularly** - Revisit and refine as understanding deepens
5. **Personal Voice** - Write for your future self, not an audience
6. **Question Everything** - Document things you don't fully understand yet

## Integration with Projects

Link notes to actual project implementations:
- Reference specific files: `See implementation in /projects/django/api-ecommerce/`
- Document what worked and what didn't
- Track evolution of understanding through project iterations
