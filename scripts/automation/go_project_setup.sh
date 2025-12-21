#!/bin/bash
# Bootstrap a new Go project with production-ready structure

PROJECT_NAME=$1
PROJECT_TYPE=${2:-"api-projects"}  # Default to api-projects

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./go_project_setup.sh <project-name> [project-type]"
    echo "Project types: api-projects, cli-tools, microservices, concurrency"
    exit 1
fi

PROJECT_PATH="projects/go/${PROJECT_TYPE}/${PROJECT_NAME}"

# Check if project already exists
if [ -d "$PROJECT_PATH" ]; then
    echo "Error: Project already exists at $PROJECT_PATH"
    exit 1
fi

# Create project directory
mkdir -p "$PROJECT_PATH"
cd "$PROJECT_PATH"

# Initialize Go module
go mod init "github.com/yourusername/${PROJECT_NAME}"

# Create project structure
mkdir -p cmd/${PROJECT_NAME}
mkdir -p internal/{handlers,models,repository,service}
mkdir -p pkg
mkdir -p configs
mkdir -p scripts
mkdir -p tests

# Create README
cat > README.md << 'EOF'
# [Project Name]

## Overview
Brief description of the project

## Tech Stack
- Go 1.21+
- PostgreSQL (if applicable)
- Redis (if applicable)

## Project Structure

```
.
├── cmd/              # Application entrypoints
├── internal/         # Private application code
│   ├── handlers/    # HTTP handlers
│   ├── models/      # Data models
│   ├── repository/  # Data access layer
│   └── service/     # Business logic
├── pkg/             # Public libraries
├── configs/         # Configuration files
└── tests/           # Integration tests
```

## Setup

### Prerequisites
- Go 1.21+
- Docker & Docker Compose (if needed)

### Local Development

1. Install dependencies:
   ```bash
   go mod download
   ```

2. Run the application:
   ```bash
   go run cmd/[project-name]/main.go
   ```

3. Run tests:
   ```bash
   go test ./...
   ```

## Building

```bash
go build -o bin/[project-name] cmd/[project-name]/main.go
```

## Testing

```bash
# Run all tests
go test ./...

# Run with coverage
go test -cover ./...

# Run with race detector
go test -race ./...
```

## Deployment

[Deployment instructions]
EOF

# Create main.go
cat > cmd/${PROJECT_NAME}/main.go << 'EOF'
package main

import (
    "fmt"
    "log"
)

func main() {
    fmt.Println("Hello from Go!")
    log.Println("Application starting...")

    // Your application logic here
}
EOF

# Create Dockerfile
cat > Dockerfile << 'EOF'
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/[project-name]/main.go

# Run stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
EOF

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ENV=development
    volumes:
      - .:/app
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOF

# Create Makefile
cat > Makefile << 'EOF'
.PHONY: help build run test clean lint

BINARY_NAME=[project-name]

help:
	@echo "Available commands:"
	@echo "  make build      - Build the application"
	@echo "  make run        - Run the application"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean build artifacts"
	@echo "  make lint       - Run linters"

build:
	go build -o bin/$(BINARY_NAME) cmd/$(BINARY_NAME)/main.go

run:
	go run cmd/$(BINARY_NAME)/main.go

test:
	go test -v -cover ./...

test-race:
	go test -race ./...

clean:
	go clean
	rm -rf bin/

lint:
	golangci-lint run

format:
	go fmt ./...
	goimports -w .
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Binaries
bin/
*.exe
*.dll
*.so
*.dylib

# Test coverage
*.out
coverage.html

# Dependency directories
vendor/

# Go workspace file
go.work

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
EOF

# Create .env.example
cat > .env.example << 'EOF'
# Application
APP_ENV=development
APP_PORT=8080

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=appdb

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
EOF

echo ""
echo "✓ Go project created: $PROJECT_PATH"
echo ""
echo "Next steps:"
echo "  1. cd $PROJECT_PATH"
echo "  2. go mod tidy"
echo "  3. Update README.md with project details"
echo "  4. Implement your application in cmd/${PROJECT_NAME}/main.go"
echo "  5. make run"
echo ""
