# Advanced Topics & Customization Guide

This file contains advanced materials for mid-level developers:
1. **Customization Guide** - How to adapt the schedule for your experience level
2. **Advanced Django** - Senior-level Django topics (mid-level → senior)
3. **Vim/Neovim Mastery** - Complete Vim learning path

---

# Part 1: Learning Path Customization

## For Mid-Level Django Developers

Since you're already mid-level in Django, here's your customized learning path.

---

## What Makes Your Path Different

### Standard Course (Not for you):
❌ Models, views, templates basics
❌ Simple CRUD operations
❌ Basic ORM queries
❌ Tutorial-style projects

### Your Advanced Path:
✅ **Query optimization** at scale
✅ **Multi-layer caching** strategies
✅ **Async Django** (ASGI, async views)
✅ **Custom components** (fields, middleware, managers)
✅ **Production patterns** (multi-tenancy, event sourcing)
✅ **Performance tuning** (database, caching, profiling)
✅ **Advanced DRF** (complex serializers, permissions)
✅ **Real challenges** (no hand-holding)

---

## Your Customized Daily Routine

### Morning (3 hours)
```
08:00-08:30  Vim practice (motions, plugins, config)
08:30-10:00  LeetCode in 3 languages (Go, Python, TS)
10:00-11:00  Go deep dive
```

### Afternoon (5 hours)
```
11:00-13:00  Advanced Django OR Go project work
13:00-14:00  Lunch + technical reading
14:00-16:00  Continue project work
16:00-17:00  Infrastructure (Docker, Linux, CI/CD)
```

### Evening (1 hour)
```
17:00-17:30  Notes in Vim (document learnings)
17:30-18:00  Progress tracking, plan tomorrow
```

---

## Weekly Focus (Customized for Mid-Level Devs)

### Monday: Go Deep Dive + Vim
- **New to you:** Go concurrency, goroutines, channels
- **Vim:** Daily practice, configure Neovim
- **Project:** Build Go CLI tools and APIs

### Tuesday: Advanced Django + Go Comparison
- **Challenge yourself:** Advanced Django topics (see Part 2 below)
- **Not basics:** Skip ORM basics, focus on optimization
- **Project:** Build advanced Django patterns

### Wednesday: Multi-Language Problem Solving
- **LeetCode deep dive:** 2-3 problems × 3 languages
- **Data structures:** Implement in Go primarily
- **TypeScript:** For frontend context

### Thursday: Databases + Both Stacks
- **PostgreSQL:** Advanced queries, indexing, transactions
- **Integration:** With both Go and Django
- **Practice:** Optimize real queries

### Friday: Infrastructure
- **Docker:** Production-ready images
- **Linux:** Server management, deployment
- **CI/CD:** GitHub Actions pipelines

### Saturday: Full-Stack
- **Next.js + TypeScript:** Frontend skills
- **Integration:** Connect to Go/Django backends
- **Auth:** JWT flows, cookie management

### Sunday: Review + System Design
- **Real-time:** WebSocket in Go vs Django
- **System design:** Scalability patterns
- **Review:** Week's learnings, refactor code

---

## 16-Week Progression

### Phase 1 (Weeks 1-4): Go + Vim Foundation
**Since Django is familiar, focus on new skills:**
- Go mastery (concurrency, APIs, CLI tools)
- Vim replaces PyCharm completely
- Multi-language LeetCode
- Review Django advanced topics as needed

**Deliverable:**
- Go API project
- Neovim fully configured
- PyCharm deleted

### Phase 2 (Weeks 5-8): Backend Depth
**Push both Go and Django to limits:**
- Production Go APIs
- Advanced Django patterns (see Part 2)
- PostgreSQL deep dive
- Docker containerization
- Pick 1-2 advanced Django projects

**Deliverable:**
- Same API in both Go and Django
- Advanced Django project started
- Both Dockerized

### Phase 3 (Weeks 9-12): Advanced Backend + Frontend
**Focus on what you DON'T know:**
- Go concurrency patterns (goroutines at scale)
- Real-time (WebSocket in both stacks)
- Next.js + TypeScript
- System design principles
- Complete 1 advanced Django project

**Deliverable:**
- Real-time app in Go
- Advanced Django project completed
- Next.js frontend

### Phase 4 (Weeks 13-16): Production Project
**Choose your stack:**
- Option A: Go backend (show new skills)
- Option B: Django backend (show advanced patterns)
- Option C: Both! (ultimate comparison)

**Deliverable:**
- Production-grade full-stack app
- Deployed on Linux
- Comprehensive tests
- CI/CD pipeline

---

## Skills Progression

### Django: Mid-Level → Senior

**Mid-Level (where you are):**
- ✅ Models, ORM, queries
- ✅ Views, DRF, serializers
- ✅ Basic optimization
- ✅ Testing fundamentals

**Senior-Level (where you're going):**
- ✅ Advanced query optimization (custom querysets, prefetch patterns)
- ✅ Multi-layer caching with intelligent invalidation
- ✅ Async Django (ASGI, async views)
- ✅ Custom components (fields, middleware, managers)
- ✅ Database transactions and locking
- ✅ Production patterns (multi-tenancy, event sourcing)
- ✅ API optimization (versioning, cursor pagination)
- ✅ Performance profiling and tuning
- ✅ Security hardening
- ✅ Scalability patterns

---

## Success Criteria (16 Weeks)

### Django:
- ✅ Senior-level knowledge
- ✅ Can optimize at scale
- ✅ Understand Django internals
- ✅ Built 1-2 advanced projects
- ✅ Ready for senior Django roles

### Go:
- ✅ Mid-level proficiency
- ✅ Can build production APIs
- ✅ Understand concurrency
- ✅ Alternative to Django

### Vim:
- ✅ PyCharm deleted forever
- ✅ Professional terminal workflow
- ✅ Faster than ever before

---

# Part 2: Advanced Django (Mid-Level → Senior)

These are **hard topics** that separate mid-level from senior Django engineers.

This guide assumes you already know Django basics. These are **hard topics** that separate mid-level from senior Django engineers.

---

## Week 1-2: Advanced ORM & Database Optimization

### Day 1-2: Query Optimization Deep Dive

**Beyond select_related/prefetch_related:**

```python
# Problem: Complex prefetch with filtering
# BAD: Multiple queries or loading unnecessary data
class AuthorViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        # This loads ALL books, then filters in Python
        return Author.objects.prefetch_related('books')

# GOOD: Prefetch with custom queryset
from django.db.models import Prefetch

class AuthorViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        published_books = Book.objects.filter(
            status='published'
        ).select_related('publisher')

        return Author.objects.prefetch_related(
            Prefetch('books', queryset=published_books)
        )
```

**Advanced: Nested prefetching**

```python
# Prefetch authors -> books -> reviews -> reviewer
Author.objects.prefetch_related(
    Prefetch(
        'books',
        queryset=Book.objects.prefetch_related(
            Prefetch(
                'reviews',
                queryset=Review.objects.select_related('reviewer')
            )
        )
    )
)
```

**Challenge: Prefetch with annotations**

```python
from django.db.models import Count, Avg, Q

# Get authors with their published book count and avg rating
authors = Author.objects.prefetch_related(
    Prefetch(
        'books',
        queryset=Book.objects.filter(
            status='published'
        ).annotate(
            review_count=Count('reviews'),
            avg_rating=Avg('reviews__rating')
        )
    )
).annotate(
    published_count=Count(
        'books',
        filter=Q(books__status='published')
    )
)
```

---

### Day 3-4: Custom QuerySets and Managers

**Advanced pattern: Chainable QuerySets**

```python
from django.db import models

class PublishedQuerySet(models.QuerySet):
    def published(self):
        return self.filter(status='published', publish_date__lte=timezone.now())

    def by_author(self, author):
        return self.filter(author=author)

    def with_stats(self):
        return self.annotate(
            view_count=Count('views'),
            comment_count=Count('comments'),
            avg_rating=Avg('ratings__score')
        )

    def popular(self, min_views=1000):
        return self.filter(view_count__gte=min_views)

class ArticleManager(models.Manager):
    def get_queryset(self):
        return PublishedQuerySet(self.model, using=self._db)

    def published(self):
        return self.get_queryset().published()

    def trending(self):
        return self.get_queryset().published().with_stats().popular()

class Article(models.Model):
    # Fields...
    objects = ArticleManager()

# Usage: Article.objects.published().by_author(user).with_stats()
```

**Advanced: Multiple managers for different use cases**

```python
class Article(models.Model):
    # Default manager (used by admin, migrations)
    objects = ArticleManager()

    # Admin manager (shows everything including drafts)
    admin_objects = models.Manager()

    # Public API manager (only published, cached)
    public = PublishedQuerySet.as_manager()
```

---

### Day 5-6: Raw SQL, Cursors, and Complex Queries

**When ORM isn't enough:**

```python
from django.db import connection

def complex_analytics_query(start_date, end_date):
    """
    Use raw SQL for complex analytics that would be
    inefficient or impossible with ORM
    """
    with connection.cursor() as cursor:
        cursor.execute("""
            WITH daily_stats AS (
                SELECT
                    DATE(created_at) as date,
                    author_id,
                    COUNT(*) as article_count,
                    SUM(view_count) as total_views
                FROM articles_article
                WHERE created_at BETWEEN %s AND %s
                GROUP BY DATE(created_at), author_id
            ),
            author_rankings AS (
                SELECT
                    author_id,
                    RANK() OVER (PARTITION BY date ORDER BY total_views DESC) as rank
                FROM daily_stats
            )
            SELECT
                a.id,
                a.name,
                ds.date,
                ds.article_count,
                ds.total_views,
                ar.rank
            FROM authors_author a
            JOIN daily_stats ds ON a.id = ds.author_id
            JOIN author_rankings ar ON a.id = ar.author_id AND ds.date = ar.date
            WHERE ar.rank <= 10
            ORDER BY ds.date DESC, ar.rank ASC
        """, [start_date, end_date])

        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
```

**Advanced: Custom SQL expressions**

```python
from django.db.models import Func, F, Value
from django.db.models.functions import Coalesce

class JsonExtract(Func):
    """Custom SQL function for JSON extraction"""
    function = 'JSON_EXTRACT'
    template = "%(function)s(%(expressions)s, '$.%(path)s')"

# Usage
Product.objects.annotate(
    price_usd=JsonExtract('metadata', path='price.usd')
)
```

---

### Day 7: Database Transactions & Locking

**Advanced transaction patterns:**

```python
from django.db import transaction
from django.db.models import F

# Pattern 1: Atomic block with savepoint
@transaction.atomic
def transfer_credits(from_user, to_user, amount):
    # Create savepoint
    sid = transaction.savepoint()

    try:
        # Lock rows for update (prevents race conditions)
        from_account = Account.objects.select_for_update().get(user=from_user)
        to_account = Account.objects.select_for_update().get(user=to_user)

        if from_account.balance < amount:
            raise InsufficientFunds()

        # Use F() to avoid race conditions
        Account.objects.filter(user=from_user).update(
            balance=F('balance') - amount
        )
        Account.objects.filter(user=to_user).update(
            balance=F('balance') + amount
        )

        # Log transaction
        Transaction.objects.create(
            from_user=from_user,
            to_user=to_user,
            amount=amount
        )

        transaction.savepoint_commit(sid)

    except Exception as e:
        transaction.savepoint_rollback(sid)
        raise

# Pattern 2: select_for_update with nowait
def reserve_seat(event_id, user):
    try:
        with transaction.atomic():
            # Fail fast if row is locked
            seat = Seat.objects.select_for_update(nowait=True).get(
                event_id=event_id,
                status='available'
            )
            seat.status = 'reserved'
            seat.reserved_by = user
            seat.save()
            return seat
    except DatabaseError:
        raise SeatAlreadyReserved()

# Pattern 3: select_for_update with skip_locked
def get_next_task():
    """Get next available task (for worker queues)"""
    with transaction.atomic():
        task = Task.objects.select_for_update(
            skip_locked=True
        ).filter(
            status='pending'
        ).first()

        if task:
            task.status = 'processing'
            task.save()

        return task
```

**Advanced: Isolation levels**

```python
from django.db import transaction

# Read committed (default)
with transaction.atomic():
    # Normal behavior
    pass

# Serializable (strictest, prevents all anomalies)
from django.db import connection

with transaction.atomic():
    with connection.cursor() as cursor:
        cursor.execute('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE')
    # Your queries here
```

---

## Week 3-4: Performance & Scaling

### Day 1-2: Caching Patterns (Advanced)

**Multi-layer caching strategy:**

```python
from django.core.cache import caches
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from functools import wraps
import hashlib
import pickle

# settings.py
CACHES = {
    'default': {  # Redis - L1 cache
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    },
    'local': {  # Local memory - L0 cache
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'local-cache',
    },
    'persistent': {  # Database - L2 cache (for warming)
        'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
        'LOCATION': 'cache_table',
    }
}

# Advanced cache decorator with versioning
def cache_multi_layer(timeout=DEFAULT_TIMEOUT, key_prefix='', version=1):
    """
    Multi-layer cache with automatic invalidation
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Generate cache key
            key_parts = [key_prefix, func.__name__]
            key_parts.extend(str(arg) for arg in args)
            key_parts.extend(f"{k}={v}" for k, v in sorted(kwargs.items()))

            cache_key = hashlib.md5(
                ':'.join(key_parts).encode()
            ).hexdigest()

            # Try L0 cache (local memory)
            local_cache = caches['local']
            result = local_cache.get(cache_key, version=version)
            if result is not None:
                return result

            # Try L1 cache (Redis)
            default_cache = caches['default']
            result = default_cache.get(cache_key, version=version)
            if result is not None:
                # Warm L0 cache
                local_cache.set(cache_key, result, timeout=60, version=version)
                return result

            # Cache miss - execute function
            result = func(*args, **kwargs)

            # Store in both caches
            default_cache.set(cache_key, result, timeout=timeout, version=version)
            local_cache.set(cache_key, result, timeout=60, version=version)

            return result

        return wrapper
    return decorator

# Usage
@cache_multi_layer(timeout=3600, key_prefix='user_stats', version=2)
def get_user_statistics(user_id, date_range):
    # Expensive computation
    return calculate_stats(user_id, date_range)

# Cache invalidation pattern
class UserStatisticsInvalidator:
    VERSION_KEY = 'user_stats_version'

    @classmethod
    def invalidate(cls, user_id=None):
        """Increment version to invalidate all caches"""
        cache = caches['default']
        version = cache.get(cls.VERSION_KEY, 1)
        cache.set(cls.VERSION_KEY, version + 1)

    @classmethod
    def get_version(cls):
        return caches['default'].get(cls.VERSION_KEY, 1)

# In your view
@cache_multi_layer(version=UserStatisticsInvalidator.get_version())
def get_user_statistics(user_id, date_range):
    pass
```

**Cache warming and preloading:**

```python
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Warm up cache with frequently accessed data'

    def handle(self, *args, **options):
        # Warm up popular articles
        popular_articles = Article.objects.published().popular()[:100]

        for article in popular_articles:
            cache_key = f'article:{article.id}'
            serialized = ArticleSerializer(article).data
            cache.set(cache_key, serialized, timeout=3600)

        self.stdout.write(
            self.style.SUCCESS(f'Warmed up {len(popular_articles)} articles')
        )
```

---

### Day 3-4: Database Connection Pooling & Query Analysis

**Advanced: Custom database router**

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'primary_db',
        'CONN_MAX_AGE': 600,  # Connection pooling
    },
    'replica': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'replica_db',
        'CONN_MAX_AGE': 600,
    },
    'analytics': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'analytics_db',
        'CONN_MAX_AGE': None,  # Keep alive
    }
}

# routers.py
class PrimaryReplicaRouter:
    """Route reads to replicas, writes to primary"""

    def db_for_read(self, model, **hints):
        # Use replica for read-heavy models
        if model._meta.app_label in ['articles', 'comments']:
            return 'replica'
        return 'default'

    def db_for_write(self, model, **hints):
        # All writes go to primary
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        # Allow relations within same database
        db_set = {'default', 'replica'}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None

class AnalyticsRouter:
    """Separate router for analytics data"""

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'analytics':
            return 'analytics'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'analytics':
            return 'analytics'
        return None

# settings.py
DATABASE_ROUTERS = [
    'myapp.routers.AnalyticsRouter',
    'myapp.routers.PrimaryReplicaRouter',
]
```

**Query analysis and debugging:**

```python
from django.db import connection
from django.test.utils import override_settings
import logging

logger = logging.getLogger(__name__)

class QueryDebugger:
    """Context manager for analyzing queries"""

    def __enter__(self):
        self.initial_queries = len(connection.queries)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        queries = connection.queries[self.initial_queries:]

        logger.info(f"Total queries: {len(queries)}")

        # Analyze slow queries
        slow_queries = [q for q in queries if float(q['time']) > 0.1]
        if slow_queries:
            logger.warning(f"Slow queries detected: {len(slow_queries)}")
            for q in slow_queries:
                logger.warning(f"Time: {q['time']}s | SQL: {q['sql'][:200]}")

        # Detect duplicate queries
        sql_counts = {}
        for q in queries:
            sql = q['sql']
            sql_counts[sql] = sql_counts.get(sql, 0) + 1

        duplicates = {sql: count for sql, count in sql_counts.items() if count > 1}
        if duplicates:
            logger.warning(f"Duplicate queries detected:")
            for sql, count in duplicates.items():
                logger.warning(f"Count: {count} | SQL: {sql[:200]}")

# Usage
with QueryDebugger():
    articles = Article.objects.published().with_stats()
    for article in articles:
        print(article.author.name)  # N+1 detected!
```

---

### Day 5-7: Asynchronous Django (ASGI & Async Views)

**Advanced: Async views with database queries**

```python
from django.http import JsonResponse
from asgiref.sync import sync_to_async
import asyncio

# Convert ORM queries to async
@sync_to_async
def get_articles():
    return list(Article.objects.published().values('id', 'title'))

@sync_to_async
def get_comments(article_id):
    return list(Comment.objects.filter(article_id=article_id).values())

async def article_with_comments_view(request, article_id):
    """Async view that fetches data concurrently"""

    # Fetch article and comments concurrently
    article, comments = await asyncio.gather(
        sync_to_async(Article.objects.get)(id=article_id),
        get_comments(article_id)
    )

    return JsonResponse({
        'article': {
            'id': article.id,
            'title': article.title,
        },
        'comments': comments
    })

# Advanced: Async view with external API calls
import httpx

async def aggregated_data_view(request):
    """Fetch from database and external APIs concurrently"""

    async with httpx.AsyncClient() as client:
        # Concurrent requests
        db_task = sync_to_async(Article.objects.published)()
        api_task_1 = client.get('https://api.example.com/data1')
        api_task_2 = client.get('https://api.example.com/data2')

        articles, api_response_1, api_response_2 = await asyncio.gather(
            db_task,
            api_task_1,
            api_task_2
        )

    return JsonResponse({
        'articles': list(articles.values()),
        'external_data_1': api_response_1.json(),
        'external_data_2': api_response_2.json(),
    })
```

**Advanced: Async middleware**

```python
from django.utils.decorators import sync_and_async_middleware

@sync_and_async_middleware
def async_timing_middleware(get_response):
    if asyncio.iscoroutinefunction(get_response):
        async def middleware(request):
            start_time = time.time()
            response = await get_response(request)
            duration = time.time() - start_time
            response['X-Response-Time'] = str(duration)
            return response
    else:
        def middleware(request):
            start_time = time.time()
            response = get_response(request)
            duration = time.time() - start_time
            response['X-Response-Time'] = str(duration)
            return response

    return middleware
```

---

## Week 5-6: Advanced DRF & API Design

### Day 1-2: Custom Serializer Fields & Complex Serialization

**Advanced serializer patterns:**

```python
from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType

class DynamicFieldsSerializer(serializers.ModelSerializer):
    """
    Serializer that allows dynamic field selection
    Usage: ?fields=id,title,author
    """
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields.split(','))
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class PolymorphicSerializer(serializers.Serializer):
    """
    Serializer for polymorphic models (generic relations)
    """
    content_type = serializers.SerializerMethodField()
    object_id = serializers.IntegerField()
    content_object = serializers.SerializerMethodField()

    def get_content_type(self, obj):
        return f"{obj.content_type.app_label}.{obj.content_type.model}"

    def get_content_object(self, obj):
        # Dynamically select serializer based on content type
        serializer_map = {
            'articles.article': ArticleSerializer,
            'products.product': ProductSerializer,
        }

        key = self.get_content_type(obj)
        serializer_class = serializer_map.get(key, DefaultSerializer)

        return serializer_class(obj.content_object).data

class WritableNestedSerializer(serializers.ModelSerializer):
    """
    Handle writable nested relationships
    """
    tags = TagSerializer(many=True)
    author = AuthorSerializer()

    class Meta:
        model = Article
        fields = ['title', 'content', 'tags', 'author']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        author_data = validated_data.pop('author')

        # Get or create author
        author, _ = Author.objects.get_or_create(**author_data)

        # Create article
        article = Article.objects.create(author=author, **validated_data)

        # Create or attach tags
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(**tag_data)
            article.tags.add(tag)

        return article

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        author_data = validated_data.pop('author', None)

        # Update article fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update author if provided
        if author_data:
            Author.objects.filter(id=instance.author.id).update(**author_data)

        # Update tags if provided
        if tags_data is not None:
            instance.tags.clear()
            for tag_data in tags_data:
                tag, _ = Tag.objects.get_or_create(**tag_data)
                instance.tags.add(tag)

        return instance
```

---

### Day 3-4: Advanced Permissions & Authentication

**Custom permission classes:**

```python
from rest_framework import permissions
from django.utils import timezone

class IsOwnerOrReadOnly(permissions.BasePermission):
    """Object-level permission: only owner can edit"""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class HasSubscription(permissions.BasePermission):
    """Check if user has active subscription"""

    message = "You need an active subscription to perform this action"

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        return hasattr(request.user, 'subscription') and \
               request.user.subscription.is_active

class RateLimitPermission(permissions.BasePermission):
    """Custom rate limiting based on user tier"""

    def has_permission(self, request, view):
        from django_ratelimit.core import is_ratelimited

        # Different rate limits for different user tiers
        rate_limit = self.get_rate_limit(request.user)

        return not is_ratelimited(
            request=request,
            group='api',
            key='user',
            rate=rate_limit,
            increment=True
        )

    def get_rate_limit(self, user):
        if user.is_staff:
            return '10000/hour'
        elif hasattr(user, 'subscription') and user.subscription.tier == 'premium':
            return '1000/hour'
        return '100/hour'

class FeatureFlagPermission(permissions.BasePermission):
    """Check feature flags before allowing access"""

    feature_flag = None  # Override in subclass

    def has_permission(self, request, view):
        from myapp.feature_flags import is_feature_enabled

        return is_feature_enabled(
            self.feature_flag,
            user=request.user
        )

# Combine permissions
class ArticlePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        # Read access for everyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write access requires authentication and subscription
        return request.user.is_authenticated and \
               HasSubscription().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only owner or staff can edit
        return obj.author == request.user or request.user.is_staff
```

**Advanced authentication:**

```python
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model

class CustomJWTAuthentication(JWTAuthentication):
    """
    JWT auth with additional claims and validation
    """

    def get_user(self, validated_token):
        user = super().get_user(validated_token)

        # Additional validation
        if not user.is_active:
            raise AuthenticationFailed('User account is disabled')

        # Check if user needs to update password
        if user.password_expired:
            raise AuthenticationFailed('Password has expired')

        # Update last seen
        user.last_seen = timezone.now()
        user.save(update_fields=['last_seen'])

        return user

def get_tokens_with_custom_claims(user):
    """Generate JWT with custom claims"""
    refresh = RefreshToken.for_user(user)

    # Add custom claims
    refresh['email'] = user.email
    refresh['subscription_tier'] = user.subscription.tier if hasattr(user, 'subscription') else 'free'
    refresh['permissions'] = list(user.get_all_permissions())

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
```

---

### Day 5-7: API Versioning & Optimization

**Advanced API versioning:**

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'ALLOWED_VERSIONS': ['v1', 'v2', 'v3'],
    'DEFAULT_VERSION': 'v3',
}

# serializers.py - Version-specific serializers
class ArticleSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'content']

class ArticleSerializerV2(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'author', 'created_at']

class ArticleSerializerV3(serializers.ModelSerializer):
    author = AuthorSerializer()
    tags = TagSerializer(many=True)
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'author', 'tags', 'stats', 'created_at']

    def get_stats(self, obj):
        return {
            'views': obj.view_count,
            'comments': obj.comment_count,
            'likes': obj.like_count,
        }

# views.py - Version-aware viewset
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()

    def get_serializer_class(self):
        version = self.request.version
        serializer_map = {
            'v1': ArticleSerializerV1,
            'v2': ArticleSerializerV2,
            'v3': ArticleSerializerV3,
        }
        return serializer_map.get(version, ArticleSerializerV3)

    def get_queryset(self):
        queryset = super().get_queryset()
        version = self.request.version

        # Version-specific optimizations
        if version == 'v2':
            queryset = queryset.select_related('author')
        elif version == 'v3':
            queryset = queryset.select_related('author').prefetch_related('tags')

        return queryset
```

**API response optimization:**

```python
from rest_framework.pagination import CursorPagination

class OptimizedCursorPagination(CursorPagination):
    """
    Cursor pagination for large datasets
    Better than offset pagination for performance
    """
    page_size = 50
    ordering = '-created_at'

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            'count': self.page.paginator.count if hasattr(self.page, 'paginator') else None,
        })

# Conditional serialization
class OptimizedArticleSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        # Only serialize author if not already prefetched
        if 'author' in self.context.get('include_fields', []):
            return AuthorSerializer(obj.author).data
        return obj.author_id

    class Meta:
        model = Article
        fields = ['id', 'title', 'author']

# View with field selection
class OptimizedArticleViewSet(viewsets.ReadOnlyModelViewSet):
    def get_serializer_context(self):
        context = super().get_serializer_context()

        # Allow client to request specific fields
        include_fields = self.request.query_params.get('include', '').split(',')
        context['include_fields'] = include_fields

        return context
```

---

## Week 7-8: Django Internals & Custom Components

### Day 1-3: Custom Model Fields

**Advanced: Custom model field with validation**

```python
from django.db import models
from django.core import validators
import json

class EncryptedField(models.TextField):
    """
    Field that automatically encrypts/decrypts data
    """
    description = "Encrypted text field"

    def __init__(self, *args, **kwargs):
        self.encryption_key = kwargs.pop('encryption_key', None)
        super().__init__(*args, **kwargs)

    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return self.decrypt(value)

    def to_python(self, value):
        if isinstance(value, str):
            return value
        if value is None:
            return value
        return self.decrypt(value)

    def get_prep_value(self, value):
        if value is None:
            return value
        return self.encrypt(value)

    def encrypt(self, value):
        from cryptography.fernet import Fernet
        f = Fernet(self.encryption_key)
        return f.encrypt(value.encode()).decode()

    def decrypt(self, value):
        from cryptography.fernet import Fernet
        f = Fernet(self.encryption_key)
        return f.decrypt(value.encode()).decode()

class JSONSchemaField(models.JSONField):
    """
    JSON field with schema validation
    """
    def __init__(self, *args, schema=None, **kwargs):
        self.schema = schema
        super().__init__(*args, **kwargs)

    def validate(self, value, model_instance):
        super().validate(value, model_instance)

        if self.schema:
            import jsonschema
            try:
                jsonschema.validate(value, self.schema)
            except jsonschema.ValidationError as e:
                raise ValidationError(f"JSON schema validation failed: {e.message}")

# Usage
class UserProfile(models.Model):
    secret_data = EncryptedField(encryption_key=settings.ENCRYPTION_KEY)

    preferences = JSONSchemaField(
        schema={
            "type": "object",
            "properties": {
                "theme": {"type": "string", "enum": ["light", "dark"]},
                "notifications": {"type": "boolean"}
            },
            "required": ["theme"]
        }
    )
```

---

### Day 4-5: Custom Middleware (Advanced)

```python
import time
import logging
from django.utils.deprecation import MiddlewareMixin
from django.core.cache import cache

logger = logging.getLogger(__name__)

class RequestTimingMiddleware(MiddlewareMixin):
    """
    Track request timing and log slow requests
    """
    def process_request(self, request):
        request._start_time = time.time()

    def process_response(self, request, response):
        if hasattr(request, '_start_time'):
            duration = time.time() - request._start_time
            response['X-Request-Duration'] = str(duration)

            # Log slow requests
            if duration > 1.0:
                logger.warning(
                    f"Slow request: {request.method} {request.path} "
                    f"took {duration:.2f}s"
                )

            # Store metrics
            cache_key = f"request_time:{request.path}"
            times = cache.get(cache_key, [])
            times.append(duration)
            cache.set(cache_key, times[-100:], timeout=3600)  # Keep last 100

        return response

class APIKeyMiddleware(MiddlewareMixin):
    """
    Custom API key authentication middleware
    """
    def process_request(self, request):
        # Skip for certain paths
        if request.path.startswith('/admin/'):
            return None

        api_key = request.headers.get('X-API-Key')

        if not api_key:
            return JsonResponse({'error': 'API key required'}, status=401)

        # Validate API key
        try:
            api_key_obj = APIKey.objects.select_related('user').get(
                key=api_key,
                is_active=True
            )
        except APIKey.DoesNotExist:
            return JsonResponse({'error': 'Invalid API key'}, status=401)

        # Attach user to request
        request.user = api_key_obj.user
        request.api_key = api_key_obj

        # Update usage
        api_key_obj.increment_usage()

        return None

class RequestIDMiddleware(MiddlewareMixin):
    """
    Add unique request ID for tracing
    """
    def process_request(self, request):
        import uuid
        request.id = str(uuid.uuid4())

    def process_response(self, request, response):
        if hasattr(request, 'id'):
            response['X-Request-ID'] = request.id
        return response
```

---

### Day 6-7: Custom Management Commands

```python
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Clean up old data and optimize database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=90,
            help='Delete records older than N days',
        )

        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be deleted without actually deleting',
        )

        parser.add_argument(
            '--batch-size',
            type=int,
            default=1000,
            help='Number of records to delete per batch',
        )

    def handle(self, *args, **options):
        days = options['days']
        dry_run = options['dry_run']
        batch_size = options['batch_size']

        cutoff_date = timezone.now() - timezone.timedelta(days=days)

        self.stdout.write(
            self.style.WARNING(
                f'Deleting records older than {cutoff_date}'
            )
        )

        # Delete old sessions
        deleted_sessions = self.delete_old_sessions(
            cutoff_date, dry_run, batch_size
        )

        # Delete old logs
        deleted_logs = self.delete_old_logs(
            cutoff_date, dry_run, batch_size
        )

        # Vacuum database (PostgreSQL)
        if not dry_run:
            self.vacuum_database()

        self.stdout.write(
            self.style.SUCCESS(
                f'Deleted {deleted_sessions} sessions and {deleted_logs} logs'
            )
        )

    @transaction.atomic
    def delete_old_sessions(self, cutoff_date, dry_run, batch_size):
        from django.contrib.sessions.models import Session

        queryset = Session.objects.filter(expire_date__lt=cutoff_date)
        total = queryset.count()

        if dry_run:
            self.stdout.write(f'Would delete {total} sessions')
            return 0

        # Delete in batches to avoid memory issues
        deleted = 0
        while True:
            ids = queryset.values_list('pk', flat=True)[:batch_size]
            if not ids:
                break

            batch_deleted, _ = Session.objects.filter(pk__in=ids).delete()
            deleted += batch_deleted

            self.stdout.write(f'Deleted {deleted}/{total} sessions...')

        return deleted

    def delete_old_logs(self, cutoff_date, dry_run, batch_size):
        # Similar implementation
        pass

    def vacuum_database(self):
        from django.db import connection

        with connection.cursor() as cursor:
            cursor.execute('VACUUM ANALYZE')

        self.stdout.write(self.style.SUCCESS('Database vacuumed'))
```

---

## Challenges & Projects

### Challenge 1: Multi-Tenant Django Application
Build a SaaS app where each customer has isolated data:
- Schema-based multi-tenancy (each tenant = separate schema)
- Middleware to detect tenant from subdomain
- Custom database router
- Tenant-aware migrations
- Per-tenant caching

### Challenge 2: Real-time Collaborative Editor
- Django Channels for WebSocket
- Operational Transformation (OT) or CRDT for conflict resolution
- Redis for presence detection
- Celery for autosave
- Version history with database triggers

### Challenge 3: High-Performance API Gateway
- Rate limiting (Redis)
- Request/response transformation
- Circuit breaker pattern
- API analytics
- JWT verification
- Request routing to microservices

### Challenge 4: Distributed Task Queue System
- Custom Celery workflow patterns
- Task prioritization and routing
- Retry logic with exponential backoff
- Task result aggregation
- Monitoring dashboard

---

## Resources for Advanced Django

### Must-Read:
- **Two Scoops of Django** (advanced patterns)
- **Django Design Patterns and Best Practices**
- **High Performance Django** (Lincolnloop)
- Django source code (read it!)

### Advanced Topics to Explore:
- Database triggers in Django
- Custom template tags and filters
- Django signals (advanced patterns and pitfalls)
- Django admin customization (deep)
- GeoDjango for location-based features
- Django Channels (WebSocket, background tasks)
- Celery canvas (advanced workflows)
- Django migrations (advanced, custom, data migrations)

---

**This is HARD Django. If you master this, you're senior-level.**

---

# Part 3: Vim/Neovim Mastery

Your path from PyCharm to Neovim mastery.

Your path from PyCharm to Neovim mastery.

---

## The Challenge

**Goal:** Replace PyCharm completely with Neovim within 2 weeks
**Why:** Terminal workflow, speed, professionalism, works everywhere
**How:** Deliberate daily practice + real project work

---

## Week 1: Vim Basics (Survival Mode)

### Day 1-2: Vimtutor
```bash
vimtutor
```

**Complete it 2-3 times.** Yes, really.

**Core Concepts:**
- Modal editing (Normal, Insert, Visual, Command)
- Movement is everything
- Composability: `d2w` = delete 2 words

---

### Day 1: Essential Motions

**Movement:**
```
h j k l       - Left, Down, Up, Right (arrow keys are lava!)
w b           - Word forward/backward
e             - End of word
0 $           - Start/end of line
gg G          - Top/bottom of file
{ }           - Paragraph up/down
Ctrl-d Ctrl-u - Half page down/up
```

**Practice:** Navigate a large file without touching the mouse

---

### Day 2: Insert & Edit

**Entering Insert Mode:**
```
i   - Insert before cursor
a   - Insert after cursor
I   - Insert at start of line
A   - Insert at end of line
o   - New line below
O   - New line above
```

**Delete & Change:**
```
x   - Delete character
dd  - Delete line
dw  - Delete word
d$  - Delete to end of line
cw  - Change word
C   - Change to end of line
```

**Undo/Redo:**
```
u       - Undo
Ctrl-r  - Redo
```

---

### Day 3: Copy, Paste, Visual

**Copy/Paste (yank/put):**
```
yy  - Yank (copy) line
yw  - Yank word
p   - Put (paste) after cursor
P   - Put before cursor
```

**Visual Mode:**
```
v       - Character-wise visual
V       - Line-wise visual
Ctrl-v  - Block-wise visual
```

**Practice:** Copy code blocks, rearrange lines

---

### Day 4: Search & Replace

**Search:**
```
/pattern   - Search forward
?pattern   - Search backward
n          - Next match
N          - Previous match
*          - Search word under cursor
```

**Replace:**
```
:s/old/new/      - Replace first in line
:s/old/new/g     - Replace all in line
:%s/old/new/g    - Replace all in file
:%s/old/new/gc   - Replace with confirmation
```

---

### Day 5: Advanced Movement

**Precision Movement:**
```
f{char}   - Find character forward
F{char}   - Find character backward
t{char}   - Till character forward
T{char}   - Till character backward
;         - Repeat f/t forward
,         - Repeat f/t backward
```

**Matching:**
```
%   - Jump to matching bracket/paren
```

**Practice:** Navigate function calls, jump between braces

---

### Day 6: Buffers & Windows

**Buffers:**
```
:e filename   - Edit file
:bn           - Next buffer
:bp           - Previous buffer
:bd           - Delete buffer
:ls           - List buffers
```

**Windows (splits):**
```
:sp      - Horizontal split
:vsp     - Vertical split
Ctrl-w h - Move left
Ctrl-w l - Move right
Ctrl-w j - Move down
Ctrl-w k - Move up
Ctrl-w q - Close window
```

---

### Day 7: Review & Commit

**Challenge:** Code for entire day in Vim
- Edit Python file
- Edit Go file
- Edit Markdown notes
- Use all motions learned

**Milestone:** Can survive basic editing in Vim

---

## Week 2: Neovim Setup & Advanced

### Day 8: Install Neovim & Plugin Manager

**Install Neovim:**
```bash
# macOS
brew install neovim

# Linux (Ubuntu/Debian)
sudo apt install neovim

# Arch
sudo pacman -S neovim
```

**Create config directory:**
```bash
mkdir -p ~/.config/nvim
```

**Install packer.nvim (plugin manager):**
```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim \
  ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

---

### Day 9: Basic Neovim Config

**Create `~/.config/nvim/init.lua`:**

```lua
-- Basic settings
vim.opt.number = true           -- Line numbers
vim.opt.relativenumber = true   -- Relative line numbers
vim.opt.mouse = 'a'             -- Enable mouse
vim.opt.ignorecase = true       -- Case insensitive search
vim.opt.smartcase = true        -- Smart case
vim.opt.hlsearch = false        -- Don't highlight search
vim.opt.wrap = false            -- No line wrap
vim.opt.tabstop = 4             -- Tab width
vim.opt.shiftwidth = 4          -- Indent width
vim.opt.expandtab = true        -- Spaces instead of tabs
vim.opt.termguicolors = true    -- True colors

-- Leader key
vim.g.mapleader = ' '           -- Space as leader

-- Basic keymaps
vim.keymap.set('n', '<leader>w', ':w<CR>')        -- Save
vim.keymap.set('n', '<leader>q', ':q<CR>')        -- Quit
vim.keymap.set('n', '<leader>e', ':Ex<CR>')       -- File explorer
vim.keymap.set('n', '<C-d>', '<C-d>zz')           -- Center on scroll down
vim.keymap.set('n', '<C-u>', '<C-u>zz')           -- Center on scroll up
```

**Restart Neovim and test**

---

### Day 10: Essential Plugins

**Update `~/.config/nvim/init.lua`:**

```lua
-- Plugins (using packer)
require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'  -- Package manager

  -- Color scheme
  use 'folke/tokyonight.nvim'

  -- Telescope (fuzzy finder)
  use {
    'nvim-telescope/telescope.nvim',
    requires = { 'nvim-lua/plenary.nvim' }
  }

  -- Treesitter (syntax highlighting)
  use {
    'nvim-treesitter/nvim-treesitter',
    run = ':TSUpdate'
  }

  -- LSP
  use 'neovim/nvim-lspconfig'

  -- Autocomplete
  use 'hrsh7th/nvim-cmp'
  use 'hrsh7th/cmp-nvim-lsp'
  use 'L3MON4D3/LuaSnip'

  -- File tree
  use 'nvim-tree/nvim-tree.lua'
  use 'nvim-tree/nvim-web-devicons'

  -- Status line
  use 'nvim-lualine/lualine.nvim'

  -- Git integration
  use 'tpope/vim-fugitive'
  use 'lewis6991/gitsigns.nvim'
end)

-- Apply colorscheme
vim.cmd[[colorscheme tokyonight]]
```

**Install:**
```vim
:PackerInstall
```

---

### Day 11: LSP Setup (Go, Python, TypeScript)

**Install language servers:**
```bash
# Go
go install golang.org/x/tools/gopls@latest

# Python
pip install python-lsp-server

# TypeScript
npm install -g typescript typescript-language-server
```

**Add to config:**
```lua
-- LSP Configuration
local lspconfig = require('lspconfig')

-- Go
lspconfig.gopls.setup{}

-- Python
lspconfig.pylsp.setup{}

-- TypeScript
lspconfig.tsserver.setup{}

-- Keybindings
vim.keymap.set('n', 'gd', vim.lsp.buf.definition)
vim.keymap.set('n', 'K', vim.lsp.buf.hover)
vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename)
vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action)
```

**Test:** Open a Go/Python/TS file, hover on function, jump to definition

---

### Day 12: Telescope & Navigation

**Telescope keybindings:**
```lua
local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files)
vim.keymap.set('n', '<leader>fg', builtin.live_grep)
vim.keymap.set('n', '<leader>fb', builtin.buffers)
vim.keymap.set('n', '<leader>fh', builtin.help_tags)
```

**Usage:**
- `<Space>ff` - Find files
- `<Space>fg` - Grep in files
- `<Space>fb` - Switch buffers

**Practice:** Navigate your project with Telescope

---

### Day 13: Git Integration

**Fugitive commands:**
```vim
:Git          - Git status
:Git add %    - Stage current file
:Git commit   - Commit
:Git push     - Push
:Git blame    - Show git blame
```

**Gitsigns (inline git):**
```lua
require('gitsigns').setup{
  signs = {
    add = { text = '+' },
    change = { text = '~' },
    delete = { text = '_' },
  }
}

vim.keymap.set('n', '<leader>gp', ':Gitsigns preview_hunk<CR>')
vim.keymap.set('n', '<leader>gb', ':Gitsigns blame_line<CR>')
```

---

### Day 14: Final Setup & PyCharm Deletion

**Complete config checklist:**
- [ ] Line numbers & relative numbers
- [ ] Color scheme you like
- [ ] LSP working for Go, Python, TypeScript
- [ ] Autocomplete working
- [ ] Telescope for file navigation
- [ ] Git integration
- [ ] Comfortable with keybindings

**The Ceremony:**
```bash
# Uninstall PyCharm
sudo snap remove pycharm-professional  # or however you installed it

# Optional: Tweet about it, no going back!
```

**Milestone:** PyCharm deleted, Neovim is your IDE

---

## Week 3-4: Advanced Mastery

### Advanced Motions

**Text Objects:**
```
iw  - Inside word
aw  - Around word
i"  - Inside quotes
a"  - Around quotes
i(  - Inside parentheses
a(  - Around parentheses
it  - Inside tag (HTML/XML)
at  - Around tag
```

**Examples:**
```
ci"  - Change inside quotes
da(  - Delete around parentheses
yit  - Yank inside HTML tag
```

---

### Macros

**Record & Replay:**
```
qa      - Start recording macro 'a'
...     - Do actions
q       - Stop recording
@a      - Replay macro 'a'
@@      - Replay last macro
10@a    - Replay 10 times
```

**Use case:** Repetitive edits

---

### Marks

**Setting marks:**
```
ma      - Set mark 'a'
`a      - Jump to mark 'a'
'a      - Jump to line of mark 'a'
```

**Global marks (capital letters):**
```
mA      - Set global mark 'A'
`A      - Jump to global mark 'A' (works across files)
```

---

### Advanced Search

**Global commands:**
```
:g/pattern/d      - Delete all lines matching pattern
:g!/pattern/d     - Delete all lines NOT matching pattern
:g/TODO/t$        - Copy all TODO lines to end of file
```

---

## Essential Keybindings Cheatsheet

**Save & Quit:**
```
<Space>w  - Save
<Space>q  - Quit
:wq       - Save and quit
:q!       - Quit without saving
```

**Navigation:**
```
<Space>ff - Find files (Telescope)
<Space>fg - Grep files
<Space>fb - Buffers
gd        - Go to definition
K         - Hover documentation
```

**Editing:**
```
ci"       - Change inside quotes
da(       - Delete around parens
yy        - Yank line
p         - Paste
u         - Undo
Ctrl-r    - Redo
```

**Git:**
```
:Git      - Git status
<Space>gp - Preview hunk
<Space>gb - Git blame
```

---

## Common Pitfalls

### 1. **Giving up too early**
- Vim feels slow at first - that's normal!
- Week 1 is painful
- Week 2 you'll be functional
- Week 3 you'll be faster than PyCharm

### 2. **Not using hjkl**
- Stop using arrow keys!
- Disable them if needed:
```lua
vim.keymap.set('n', '<Up>', '<Nop>')
vim.keymap.set('n', '<Down>', '<Nop>')
vim.keymap.set('n', '<Left>', '<Nop>')
vim.keymap.set('n', '<Right>', '<Nop>')
```

### 3. **Installing too many plugins**
- Start minimal
- Add plugins when you need them
- Understand each plugin before adding more

### 4. **Not learning motions**
- `hjkl` is beginner level
- Learn `w`, `b`, `f`, `t`, text objects
- Combine commands: `d2w`, `c3j`, `y4k`

---

## Resources

### Interactive:
- **vimtutor** - Built-in, best starting point
- **Vim Adventures** - Game-based learning
- **OpenVim** - Interactive tutorial

### Videos:
- **ThePrimeagen** - Vim tips, workflow
- **TJ DeVries** - Neovim creator
- **typecraft** - Neovim setup guides

### Cheatsheets:
- https://vim.rtorr.com/
- https://devhints.io/vim

### Books:
- **Practical Vim** by Drew Neil
- **Modern Vim** by Drew Neil

---

## 30-Day Challenge

**Days 1-7:** Survive in Vim (vimtutor daily)
**Days 8-14:** Setup Neovim (LSP, plugins)
**Days 15-21:** Use only Neovim for all coding
**Days 22-30:** Master advanced motions, customize config

**End Goal:** Never open PyCharm again

---

## Full Neovim Config Template

Store in `~/.config/nvim/` - I can provide a complete starter config if needed!

**Remember:** The only way to learn Vim is to use Vim. No shortcuts, no fallbacks. Commit fully!
