# 16-Week Learning Schedule

Complete weekly schedule with two approaches: **Go + Vim Priority** (recommended for mid-level Django devs) and **Django-First**.

---

## Choose Your Schedule:

### Schedule 1: Go + Vim Priority (RECOMMENDED)
**Best for:** Mid-level Django developers who want to learn Go and Vim first

This schedule is optimized for your motivation: **Go first**, **Vim as primary editor**, and **multi-language LeetCode**.

[Jump to Schedule 1](#schedule-1-go--vim-priority)

### Schedule 2: Django-First Approach
**Best for:** Beginners or those wanting to strengthen Django fundamentals first

Traditional backend learning path starting with Django, then expanding to other technologies.

[Jump to Schedule 2](#schedule-2-django-first-approach)

---

# Schedule 1: Go + Vim Priority

**Duration:** 12-16 weeks to production-grade project
**Daily Time:** 6-8 hours (full-time learning)
**Focus:** Go + Vim → Backend depth → Full-stack integration
**Editor:** Neovim (leave PyCharm behind!)

---

## Daily Non-Negotiables

### Every Single Day:
1. **Vim Practice** (15-30 min, first thing)
   - Vim motions and commands
   - Gradually build muscle memory
   - Configure your Neovim setup
   - Goal: Replace PyCharm completely by Week 2

2. **LeetCode Multi-Language** (60-90 min, morning)
   - **Solve same problem in 3 languages:**
     - **Go** (primary focus)
     - **Python** (for comparison)
     - **JavaScript/TypeScript** (for frontend context)
   - Compare language idioms
   - Track in: `leetcode/YYYY-MM/`

3. **Notes & Reflection** (15 min, evening)
   - Document in Vim (practice!)
   - Update progress tracker
   - Plan next day

---

## Weekly Schedule

### Monday: Go Deep Dive + Vim Mastery
**Morning (1 hour):**
- **Vim Training:**
  - vimtutor (first week)
  - Vim motions practice
  - Configure Neovim (LSP, plugins)
  - Practice on real code

**Mid-morning (3 hours):**
- **Go Fundamentals:**
  - Go syntax and idioms
  - Goroutines and channels
  - Error handling patterns
  - Standard library exploration
  - Go modules and project structure

**Afternoon (3-4 hours):**
- **Build Go Projects:**
  - CLI tools
  - REST APIs
  - Concurrent programs
  - **All in Neovim!**

**Topics to cover (rotate weekly):**
- Week 1-2: Go basics, syntax, standard library
- Week 3-4: Goroutines, channels, concurrency patterns
- Week 5-6: Go web servers, HTTP handlers, middleware
- Week 7-8: Go + databases, SQL, migrations
- Week 9+: Advanced Go patterns, microservices

---

### Tuesday: Go + Advanced Django Comparison
**Morning (3-4 hours):**
- **Go Backend Development:**
  - REST API with Gin/Echo/Chi
  - Request handling
  - Middleware patterns
  - JSON serialization
  - Error handling

**Afternoon (3-4 hours):**
- **Advanced Django (since you're mid-level):**
  - Advanced ORM patterns (custom querysets, prefetch optimization)
  - Custom serializer fields and complex DRF patterns
  - Advanced caching strategies (multi-layer)
  - Database transactions and locking
  - Async Django (ASGI, async views)

**See:** `ADVANCED.md` for senior-level Django topics

**Key Learning:**
- Build same feature in both languages
- Understand trade-offs
- Push Django to its limits (you already know basics)
- Go: Performance, concurrency, simplicity
- Django: Advanced patterns, ORM mastery, optimization

---

### Wednesday: Multi-Language Problem Solving
**Morning (2-3 hours):**
- **Deep LeetCode Session:**
  - Pick 2-3 problems
  - Solve each in Go, Python, JS/TS
  - Compare solutions
  - Learn language idioms

**Afternoon (2-3 hours):**
- **Data Structures & Algorithms:**
  - Implement in Go (primary)
  - Arrays, slices, maps
  - Trees, graphs
  - Sorting algorithms
  - Custom data structures

**Evening (2 hours):**
- **TypeScript/JavaScript:**
  - Basics for frontend work
  - ES6+ features
  - Async/await
  - Type annotations (TS)

**Vim Practice:** All coding done in Neovim

---

### Thursday: Databases + Go/Django
**Morning (2-3 hours):**
- **PostgreSQL:**
  - SQL fundamentals
  - Indexing strategies
  - Query planning (EXPLAIN)
  - Transactions & locks
  - **Use psql in terminal (Vim mindset!)**

**Afternoon (2-3 hours):**
- **Go + PostgreSQL:**
  - database/sql package
  - sqlx or GORM
  - Migrations
  - Query builders

**Evening (2 hours):**
- **Django + PostgreSQL:**
  - Django ORM
  - Query optimization
  - Compare with Go approach

---

### Friday: Infrastructure & DevOps
**Morning (2-3 hours):**
- **Docker:**
  - Dockerfiles for Go apps
  - Dockerfiles for Django apps
  - Multi-stage builds
  - Docker Compose

**Afternoon (2-3 hours):**
- **Linux & Shell:**
  - Bash scripting
  - systemd services
  - Process management
  - Log management
  - **All in terminal with Vim**

**Evening (1-2 hours):**
- **GitHub Actions:**
  - CI/CD for Go projects
  - CI/CD for Django projects
  - Automated testing
  - Linting pipelines

---

### Saturday: Full-Stack Integration
**Morning (2-3 hours):**
- **Next.js + TypeScript:**
  - App Router
  - Server/Client components
  - API routes
  - **Edit in Neovim with TypeScript LSP**

**Afternoon (3-4 hours):**
- **Backend Integration:**
  - Connect Next.js to Go API
  - OR connect to Django API
  - Auth flows (JWT)
  - CORS handling
  - Error handling

---

### Sunday: Advanced Topics + Review
**Morning (2 hours):**
- **Real-time Features:**
  - WebSocket in Go
  - WebSocket in Django (channels)
  - Server-Sent Events
  - Choose best approach for use case

**Mid-day (2 hours):**
- **System Design:**
  - Scalability patterns
  - Caching strategies (Redis)
  - Message queues (RabbitMQ)
  - Observability

**Afternoon (2-3 hours):**
- **Weekly Review:**
  - Review Vim progress
  - Review Go learnings
  - Compare Go vs Django code
  - Refactor projects
  - Update progress tracker
  - Plan next week

**Evening (1 hour):**
- **Reading:**
  - Grokking Algorithms
  - The Pragmatic Programmer
  - Clean Architecture
  - Go-specific books

---

## Vim/Neovim Learning Path

### Week 1: Vim Basics
**Daily Practice (30 min):**
- `vimtutor` - Complete it 2-3 times
- Basic motions: `hjkl`, `w`, `b`, `e`, `0`, `$`
- Insert mode: `i`, `a`, `o`, `O`
- Delete: `d`, `dd`, `dw`, `diw`
- Visual mode: `v`, `V`, `Ctrl-v`
- Copy/paste: `y`, `yy`, `p`, `P`

**Goal:** Stop using PyCharm, commit to Neovim

**Config:** Start with minimal `init.vim` or `init.lua`

**See:** `ADVANCED.md` for complete Vim learning guide

---

### Week 2: Vim Intermediate
**Daily Practice (30 min):**
- Search: `/`, `?`, `n`, `N`, `*`, `#`
- Replace: `:s/old/new/g`
- Jump: `gg`, `G`, `{`, `}`, `%`
- Marks: `ma`, `` `a ``
- Macros: `q`, `@`
- Splits: `:sp`, `:vsp`, `Ctrl-w`

**Goal:** Comfortable editing code in Vim

**Config:** Add basic plugins (vim-plug or packer.nvim)

---

### Week 3-4: Neovim Advanced
**Daily Practice (30 min):**
- LSP setup (Go, Python, TypeScript)
- Autocomplete (nvim-cmp)
- File navigation (telescope.nvim)
- Git integration (fugitive or lazygit)
- Debugging (nvim-dap)

**Goal:** Neovim as full IDE replacement

**Config:**
- LSP for all languages
- Treesitter for syntax
- Custom keymaps
- Status line (lualine)

---

## LeetCode Multi-Language Approach

### Daily Routine (60-90 min):

**1. Solve in Go (30-40 min) - PRIMARY**
```go
// File: leetcode/2025-12/2025-12-21_two-sum.go
package main

/*
Problem: Two Sum
Difficulty: Easy
URL: https://leetcode.com/problems/two-sum/
Date: 2025-12-21

Time: O(n)
Space: O(n)
*/

func twoSum(nums []int, target int) []int {
    // Go solution
}
```

**2. Solve in Python (15-20 min) - COMPARISON**
```python
# File: leetcode/2025-12/2025-12-21_two-sum.py
"""
Same problem in Python for comparison
"""
def twoSum(nums: list[int], target: int) -> list[int]:
    # Python solution
```

**3. Solve in TypeScript (15-20 min) - FRONTEND CONTEXT**
```typescript
// File: leetcode/2025-12/2025-12-21_two-sum.ts
/*
Same problem in TypeScript
*/
function twoSum(nums: number[], target: number): number[] {
    // TypeScript solution
}
```

**4. Compare & Document (10 min)**
- Which was most elegant?
- Which was most performant?
- Language-specific idioms learned?
- Notes in: `leetcode/2025-12/2025-12-21_two-sum_NOTES.md`

---

## Phase-Based Roadmap

### Phase 1: Go + Vim Foundation (Weeks 1-4)
**Focus:** Go mastery + Neovim setup + Multi-language LeetCode

**Goals:**
- Fluent in Go basics
- Comfortable in Neovim (PyCharm deleted!)
- 20-30 LeetCode problems in 3 languages
- Simple Go CLI tools built
- Simple Go REST API

**Deliverables:**
- Go CLI tool project
- Go REST API with tests
- Neovim configured for Go, Python, TS
- LeetCode multi-language solutions

---

### Phase 2: Backend Depth (Weeks 5-8)
**Focus:** Go APIs + Django comparison + Databases

**Goals:**
- Production Go REST APIs
- Django for comparison
- PostgreSQL deep dive
- Redis caching
- Docker containerization

**Deliverables:**
- Go API with PostgreSQL
- Django API with same features (comparison)
- Both Dockerized
- Tests for both

---

### Phase 3: Advanced Backend (Weeks 9-12)
**Focus:** Concurrency + Real-time + System Design

**Goals:**
- Goroutines & channels mastery
- WebSocket in Go
- Async in Django (Celery, channels)
- Message queues (RabbitMQ)
- Next.js frontend basics

**Deliverables:**
- Real-time Go application
- Comparison with Django channels
- Frontend connected to backend

---

### Phase 4: Production Project (Weeks 13-16)
**Focus:** Choose Go OR Django for production project

**Option A - Go Backend:**
- Go REST API
- PostgreSQL + Redis
- Goroutines for background jobs
- WebSocket for real-time
- Next.js frontend

**Option B - Django Backend:**
- Django REST API
- PostgreSQL + Redis + RabbitMQ
- Celery for background jobs
- Django Channels for real-time
- Next.js frontend

**OR Build Both and Compare!**

---

## Time Allocation (Weekly)

| Category | Hours/Week | Priority |
|----------|-----------|----------|
| Vim Practice | 2-4 | Critical |
| LeetCode (3 languages) | 7-10 | High |
| Go Development | 15-20 | Critical |
| Django (comparison) | 6-8 | Medium |
| Databases | 4-6 | High |
| Infrastructure | 4-6 | High |
| Frontend (Next.js/TS) | 6-8 | Medium |
| System Design | 2-3 | Medium |
| Reading/Review | 4-5 | Medium |
| **Total** | **50-70** | **Full-time** |

---

## Why This Schedule Works Better for Mid-Level Django Devs

### 1. **Motivation-Driven**
- Start with Go (you're excited about it)
- Vim mastery (you want to ditch PyCharm)
- Build momentum early

### 2. **Multi-Language Mastery**
- Go for performance & concurrency
- Python for Django & quick scripts
- TypeScript for frontend
- Compare and learn from differences

### 3. **Editor Proficiency**
- Vim daily practice = muscle memory
- All projects in Neovim
- Terminal-first workflow
- Professional developer setup

### 4. **Practical Comparison**
- Build same thing in Go and Django
- Understand when to use each
- Deeper understanding from contrast

---

## Resources for Schedule 1

### Go Resources:
- Tour of Go (official tutorial)
- Effective Go (official)
- Go by Example
- Let's Go (book by Alex Edwards)
- Concurrency in Go (book)

### Vim Resources:
- `vimtutor` (built-in, start here!)
- ThePrimeagen (YouTube)
- TJ DeVries (Neovim creator, YouTube)
- See `ADVANCED.md` for complete guide

### Advanced Django:
- See `ADVANCED.md` for senior-level topics
- Mid-level devs should skip basics

---

## Success Metrics (16 weeks)

- ✅ **Vim/Neovim mastery** - PyCharm deleted, never looked back
- ✅ **100+ LeetCode** problems in Go (+ Python/TS)
- ✅ **Go proficiency** - Can build production APIs
- ✅ **Django understanding** - Know when to use vs Go
- ✅ **TypeScript basics** - Can build Next.js frontends
- ✅ **Production project** - Either Go or Django (or both!)
- ✅ **Portfolio ready** - Demonstrates multi-language skills

---

# Schedule 2: Django-First Approach

**Duration:** 12-16 weeks to production-grade project
**Daily Time:** 6-8 hours (full-time learning)
**Focus:** Backend depth > Frontend breadth

---

## Daily Non-Negotiables

### Every Single Day:
1. **LeetCode** (30-60 min, morning)
   - 1 Medium problem
   - Focus: Arrays, Hash Tables, Trees, Graphs, DP
   - Track in: `leetcode/YYYY-MM/`

2. **Notes & Reflection** (15 min, evening)
   - Document what you learned
   - Update progress tracker
   - Plan next day

---

## Weekly Schedule

### Monday: Django Deep Dive
**Morning (3-4 hours):**
- Django ORM advanced patterns
- Query optimization (select_related, prefetch_related)
- Custom managers and querysets
- Database transactions

**Afternoon (3-4 hours):**
- Build/extend Django project
- Implement learned concepts
- Write tests for new features

**Topics to cover (rotate weekly):**
- Week 1-2: ORM mastery
- Week 3-4: Django architecture & service layers
- Week 5-6: Performance optimization
- Week 7-8: Advanced patterns (signals, middleware, custom commands)

---

### Tuesday: Django REST Framework + Testing
**Morning (3-4 hours):**
- DRF serializers (nested, custom fields)
- ViewSets vs APIViews
- Permissions & authentication
- Throttling & pagination

**Afternoon (3-4 hours):**
- Write comprehensive API tests (pytest)
- Integration tests with factories
- Test coverage improvement
- API documentation (OpenAPI/Swagger)

**Key Skills:**
- Custom permission classes
- Serializer optimization
- API versioning
- Test-driven development

---

### Wednesday: Databases (PostgreSQL + Redis + RabbitMQ)
**Morning (2 hours):**
- **PostgreSQL:**
  - Indexing strategies
  - Query planning (EXPLAIN ANALYZE)
  - Transactions & locks
  - Performance tuning

**Mid-day (2 hours):**
- **Redis:**
  - Caching patterns
  - Rate limiting implementation
  - Session storage
  - Pub/Sub basics

**Afternoon (2-3 hours):**
- **RabbitMQ:**
  - Queue patterns
  - Dead-letter exchanges
  - Retry mechanisms
  - Idempotency

**Practical:**
- Implement caching in your Django project
- Set up task queue with RabbitMQ
- Optimize database queries

---

### Thursday: Async Python + Celery
**Morning (3 hours):**
- Async/await fundamentals
- ASGI vs WSGI
- AsyncIO patterns
- Async views in Django

**Afternoon (3-4 hours):**
- Celery task orchestration
- Background job patterns
- Task retry strategies
- Monitoring tasks
- Periodic tasks (celery beat)

**Build:**
- Email sending system
- Report generation
- Data processing pipeline
- Scheduled cleanup tasks

---

### Friday: Infrastructure & DevOps
**Morning (2-3 hours):**
- **Docker:**
  - Multi-stage builds
  - Production-ready images
  - Docker networking
  - Volume management

- **Docker Compose:**
  - Service orchestration
  - Development vs production configs
  - Health checks

**Afternoon (2-3 hours):**
- **Linux:**
  - System administration
  - Process management (systemd)
  - Log management (journald)
  - Resource monitoring (htop, iotop)
  - Deploying Django on Linux

**Evening (1-2 hours):**
- **GitHub Actions:**
  - CI/CD pipelines
  - Automated testing
  - Linting & formatting
  - Deployment workflows

**Bonus:**
- Vim practice (30 min)
- Terraform basics (if time permits)

---

### Saturday: Full-Stack Integration
**Morning (2-3 hours):**
- **Next.js fundamentals:**
  - App Router
  - Server vs Client components
  - Layouts and routing
  - Data fetching patterns

**Afternoon (3-4 hours):**
- **Frontend + Backend Integration:**
  - Auth flows (JWT/sessions)
  - Cookie management
  - CORS & CSRF
  - API integration
  - Error handling

**Build:**
- Next.js frontend for your Django API
- Login/signup flows
- Protected routes
- API client setup

---

### Sunday: Real-time + System Design + Review
**Morning (2 hours):**
- **Real-time features:**
  - WebSocket fundamentals
  - Socket.io implementation
  - Server-Sent Events (SSE)
  - Real-time notifications

**Mid-day (2 hours):**
- **System Design:**
  - Scalability patterns
  - Caching strategies
  - Load balancing
  - Database sharding
  - Message queues
  - Observability (logging, metrics, tracing)

**Afternoon (2-3 hours):**
- **Weekly Review:**
  - Review notes from the week
  - Update progress tracker
  - Refactor code written this week
  - Plan production project features
  - Identify knowledge gaps

**Evening (1 hour):**
- Read from technical books (30-60 min):
  - Designing Data-Intensive Applications
  - Clean Architecture
  - The Pragmatic Programmer
  - Grokking Algorithms

---

## Phase-Based Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Focus:** Django + DRF + PostgreSQL + Testing

**Goals:**
- Master Django ORM
- Build REST APIs with DRF
- Write comprehensive tests
- Understand PostgreSQL internals

**Deliverable:**
- Simple API project with auth, CRUD, tests

---

### Phase 2: Async & Infrastructure (Weeks 5-8)
**Focus:** Celery + Redis + RabbitMQ + Docker + Linux

**Goals:**
- Async task processing
- Caching strategies
- Message queues
- Containerization
- Linux deployment basics

**Deliverable:**
- API with background jobs, caching, Docker setup

---

### Phase 3: Real-time & Frontend (Weeks 9-12)
**Focus:** WebSocket/SSE + Next.js + System Design

**Goals:**
- Real-time features
- Frontend integration
- Auth flows
- System design thinking

**Deliverable:**
- Full-stack app with real-time features

---

### Phase 4: Production Project (Weeks 13-16)
**Focus:** Build production-grade project

**Requirements:**
- Django REST API backend
- Next.js frontend
- PostgreSQL + Redis + RabbitMQ
- Celery background jobs
- Real-time features (WebSocket or SSE)
- Comprehensive tests
- Docker Compose setup
- CI/CD pipeline (GitHub Actions)
- Linux deployment
- Observability (logging, metrics)
- Clean architecture

**Project Ideas:**
- Task/Project Management SaaS
- Real-time Collaboration Tool
- E-commerce Platform
- Social Media Backend
- Analytics Dashboard

---

## Time Allocation (Weekly)

| Category | Hours/Week | Priority |
|----------|-----------|----------|
| LeetCode | 3-5 | High |
| Backend (Django/DRF) | 12-15 | Critical |
| Databases | 4-6 | High |
| Async/Celery | 4-6 | High |
| Infrastructure | 6-8 | High |
| Frontend (Next.js) | 6-8 | Medium |
| Real-time | 3-4 | Medium |
| System Design | 2-3 | Medium |
| Reading/Review | 4-5 | Medium |
| **Total** | **44-60** | **Full-time** |

---

## Success Metrics (16 weeks)

✅ 100+ LeetCode problems solved
✅ Deep Django/DRF knowledge
✅ Production-grade full-stack project deployed
✅ Understanding of system design
✅ Comfortable with Docker, Linux, CI/CD
✅ Portfolio demonstrating backend excellence
✅ Confidence in technical interviews
✅ Ready for senior backend positions

---

# Common Resources (Both Schedules)

## Essential Documentation:
- Django: https://docs.djangoproject.com/
- DRF: https://www.django-rest-framework.org/
- Go: https://go.dev/doc/
- PostgreSQL: https://www.postgresql.org/docs/
- Next.js: https://nextjs.org/docs

## Books (30-60 min/day):
- Designing Data-Intensive Applications (must-read!)
- Clean Architecture
- The Pragmatic Programmer
- Grokking Algorithms

## Progress Tracking

### Weekly Checklist:
- [ ] 5-7 LeetCode problems completed
- [ ] Backend concepts practiced
- [ ] Tests written for new features
- [ ] Database optimization implemented
- [ ] Infrastructure work done
- [ ] Notes documented
- [ ] Code committed & reviewed
- [ ] Weekly review completed

### Monthly Milestones:
- **Month 1:** Foundation complete
- **Month 2:** Async processing, caching, Docker
- **Month 3:** Real-time features, frontend integration
- **Month 4:** Production-grade project completed

---

# Key Principles (Both Schedules)

1. **Depth over Breadth** - Master backend thoroughly
2. **Build, Don't Tutorial** - Real projects, not guided tutorials
3. **Production Mindset** - Always think: "Would this work in production?"
4. **Test Everything** - No feature without tests
5. **Document Daily** - Future you will thank present you
6. **Deploy for Real** - Localhost doesn't count
7. **Iterate Weekly** - Adjust schedule based on progress

---

# Adjusting Your Schedule

**If moving too slow:**
- Reduce frontend time (Next.js is supporting role)
- Focus on critical path
- Simplify projects

**If moving too fast:**
- Add more advanced topics
- Build multiple projects
- Explore additional technologies

**If stuck:**
- Ask for help (communities, forums)
- Review fundamentals
- Take a step back, simplify
- Break into smaller tasks

---

**Remember:** Consistency beats intensity. Show up every day. Progress > perfection.

**Next:** Read `START-HERE.md` for Day 1 guide
