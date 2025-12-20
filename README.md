# Backend-Focused Learning Roadmap (Django + Go Mindset)

This repository documents my structured learning path while unemployed, with a **strong focus on backend engineering**, system design, Linux, and production-grade skills.  
Frontend is intentionally kept **basic** (Next.js fundamentals only) to support full-stack collaboration.  
LLMs are included from a **backend/infra integration perspective**, not hype-driven usage.

---

## 📅 Daily

### LeetCode (1 problem/day)
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Short (30–60 minutes)  
- **Goal:** Maintain algorithmic thinking and problem-solving sharpness (no grinding).

---

## 🧠 Backend Core

### Django (Advanced)
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Long  
- **Focus:** ORM deep dive, architecture, performance, clean service layers

### Django REST Framework (Deep)
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Focus:** permissions, throttling, serializer optimization, ViewSet vs APIView

### PostgreSQL
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Focus:** indexing, query planning, EXPLAIN, transactions, locks

### Redis
- **Priority:** High  
- **Difficulty:** Easy → Medium  
- **Time Cost:** Short  
- **Focus:** caching, rate limiting, pub/sub, session storage

### RabbitMQ
- **Priority:** Medium  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Focus:** retries, dead-letter exchanges, idempotency

### Async & Celery
- **Priority:** High  
- **Difficulty:** Medium → Hard  
- **Time Cost:** Medium  
- **Focus:** background jobs, async views, task orchestration

### Testing
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Focus:** pytest, API tests, factories, integration testing

### Server-Sent Events (SSE)
- **Priority:** Medium  
- **Difficulty:** Easy  
- **Time Cost:** Short  
- **Focus:** one-way real-time updates, notifications

---

## 🎨 Frontend (Basic – Supporting Role)

### Next.js Fundamentals
- **Priority:** Medium  
- **Difficulty:** Easy → Medium  
- **Time Cost:** Short  
- **Scope:** App Router, layouts, server/client components

### Auth & Data Fetching
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Short  
- **Scope:** JWT/session flows, cookies, refresh tokens

### Integration with Django API
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Short  
- **Scope:** CORS, CSRF, auth flow, deployment considerations

---

## 🐧 Linux (Backend & Server-Oriented)

### Linux Fundamentals
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Focus:**
  - filesystem hierarchy
  - permissions & users
  - processes & signals
  - systemd
  - networking basics

### Linux for Backend Engineers
- **Priority:** High  
- **Difficulty:** Medium → Hard  
- **Time Cost:** Long  
- **Focus:**
  - resource monitoring (htop, iotop, free)
  - debugging running services
  - logs & journald
  - tuning for production servers
  - deploying Django on Linux

---

## 🏗 Infrastructure

### Docker
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Scope:** multi-stage builds, production-ready images

### Docker Compose
- **Priority:** High  
- **Difficulty:** Easy  
- **Time Cost:** Short  
- **Scope:** local orchestration for backend services

### Terraform
- **Priority:** Medium  
- **Difficulty:** Hard  
- **Time Cost:** Long  
- **Scope:** Infrastructure as Code, cloud resource provisioning

### Basic Vim
- **Priority:** Low  
- **Difficulty:** Easy  
- **Time Cost:** Short  
- **Scope:** terminal productivity, server-side editing

### GitHub Actions
- **Priority:** Medium  
- **Difficulty:** Medium  
- **Time Cost:** Short  
- **Scope:** CI pipelines for testing, linting, builds

---

## 🔌 Realtime

### WebSocket / Socket.io
- **Priority:** Medium  
- **Difficulty:** Medium  
- **Time Cost:** Medium  
- **Scope:** bidirectional real-time features (chat, live updates)

---

## 🧠 Knowledge

### System Design
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Long  
- **Scope:** scalability, caching strategies, queues, trade-offs

### Observability
- **Priority:** Medium  
- **Difficulty:** Medium  
- **Time Cost:** Short  
- **Scope:** logging, metrics, tracing, production visibility

---

## 🤖 LLMs (Backend & Infrastructure Perspective)

### LLM Fundamentals
- **Priority:** Medium  
- **Difficulty:** Medium  
- **Time Cost:** Short  
- **Focus:**
  - what LLMs are good/bad at
  - tokens, context windows
  - inference vs training
  - latency & cost trade-offs

### LLM Integration in Backend Systems
- **Priority:** Medium  
- **Difficulty:** Medium → Hard  
- **Time Cost:** Medium  
- **Focus:**
  - calling LLM APIs from Django
  - async/background inference
  - streaming responses
  - rate limiting & retries
  - caching LLM outputs

### LLM System Design
- **Priority:** Low → Medium  
- **Difficulty:** Hard  
- **Time Cost:** Medium  
- **Focus:**
  - prompt versioning
  - RAG basics
  - reliability & fallbacks
  - production constraints

---

## 🧬 Version Control

### Git (Advanced)
- **Priority:** High  
- **Difficulty:** Medium  
- **Time Cost:** Short  
- **Scope:**
  - rebase
  - cherry-pick
  - bisect
  - reflog
  - clean commit history
  - professional conflict resolution

---

## 🎯 Output

### Production-Grade Project
**Django API + Next.js Frontend**
- **Priority:** Critical  
- **Difficulty:** Hard  
- **Time Cost:** Long  

**Expectation:**  
This project must demonstrate:
- clean backend architecture  
- async processing & messaging  
- real-time features  
- Linux-based deployment  
- CI/CD and infrastructure  
- production-minded design decisions  

---

## 📌 Notes
- Backend depth is prioritized over breadth.
- Linux is treated as a core backend skill, not a side topic.
- LLMs are approached as **systems to integrate**, not magic tools.
- This repository evolves with real projects, not tutorials.
