#!/bin/bash
# Bootstrap a new Django project with production-ready structure

PROJECT_NAME=$1
PROJECT_TYPE=${2:-"api-projects"}  # Default to api-projects

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./django_project_setup.sh <project-name> [project-type]"
    echo "Project types: api-projects, microservices, celery-tasks, real-time"
    exit 1
fi

PROJECT_PATH="projects/django/${PROJECT_TYPE}/${PROJECT_NAME}"

# Check if project already exists
if [ -d "$PROJECT_PATH" ]; then
    echo "Error: Project already exists at $PROJECT_PATH"
    exit 1
fi

# Create project directory
mkdir -p "$PROJECT_PATH"
cd "$PROJECT_PATH"

# Create README
cat > README.md << 'EOF'
# [Project Name]

## Overview
Brief description of the project

## Tech Stack
- Django 5.x
- Django REST Framework
- PostgreSQL
- Redis
- Celery (if needed)

## Setup

### Prerequisites
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL

### Local Development

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Start services:
   ```bash
   docker-compose up -d
   ```

3. Run migrations:
   ```bash
   make migrate
   ```

4. Create superuser:
   ```bash
   make superuser
   ```

5. Run development server:
   ```bash
   make run
   ```

## Testing

```bash
make test
```

## API Documentation

Once running, visit: http://localhost:8000/api/docs/

## Architecture

[Describe your architecture decisions]

## Deployment

[Deployment instructions]
EOF

# Create .env.example
cat > .env.example << 'EOF'
# Django
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Redis
REDIS_URL=redis://localhost:6379/0

# Celery (if needed)
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/2
EOF

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Run migrations and start server
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
EOF

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: dbname
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
EOF

# Create Makefile
cat > Makefile << 'EOF'
.PHONY: help run test migrate superuser shell lint format

help:
	@echo "Available commands:"
	@echo "  make run        - Run development server"
	@echo "  make test       - Run tests"
	@echo "  make migrate    - Run database migrations"
	@echo "  make superuser  - Create Django superuser"
	@echo "  make shell      - Open Django shell"
	@echo "  make lint       - Run linters"
	@echo "  make format     - Format code"

run:
	python manage.py runserver

test:
	pytest

migrate:
	python manage.py migrate

superuser:
	python manage.py createsuperuser

shell:
	python manage.py shell

lint:
	ruff check .
	mypy .

format:
	black .
	ruff check --fix .
EOF

# Create requirements.txt
cat > requirements.txt << 'EOF'
Django>=5.0,<6.0
djangorestframework>=3.14,<4.0
psycopg2-binary>=2.9,<3.0
redis>=5.0,<6.0
celery>=5.3,<6.0
python-decouple>=3.8,<4.0
gunicorn>=21.0,<22.0

# Development
pytest>=7.4,<8.0
pytest-django>=4.5,<5.0
black>=23.0,<24.0
ruff>=0.1,<1.0
mypy>=1.7,<2.0
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg

# Django
*.log
local_settings.py
db.sqlite3
media/
staticfiles/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Testing
.coverage
htmlcov/
.pytest_cache/

# OS
.DS_Store
Thumbs.db
EOF

# Create pytest.ini
cat > pytest.ini << 'EOF'
[pytest]
DJANGO_SETTINGS_MODULE = config.settings
python_files = tests.py test_*.py *_tests.py
addopts = --reuse-db --nomigrations
EOF

echo ""
echo "✓ Django project created: $PROJECT_PATH"
echo ""
echo "Next steps:"
echo "  1. cd $PROJECT_PATH"
echo "  2. python -m venv venv"
echo "  3. source venv/bin/activate"
echo "  4. pip install -r requirements.txt"
echo "  5. django-admin startproject config ."
echo "  6. Edit .env file with your settings"
echo "  7. docker-compose up -d"
echo "  8. make migrate"
echo ""
