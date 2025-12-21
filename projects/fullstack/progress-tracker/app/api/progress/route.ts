import { NextResponse } from 'next/server';

const GITHUB_RAW_URL = process.env.GITHUB_PROGRESS_URL ||
  'https://raw.githubusercontent.com/TIROK547/Advance-developing-learning-path-/main/projects/fullstack/progress-tracker/data/progress.json';

// Cache configuration
const CACHE_DURATION = 60 * 1000; // 60 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface CacheEntry {
  data: any;
  timestamp: number;
  etag?: string;
}

let cache: CacheEntry | null = null;

// Helper function to delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retries
async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Progress-Tracker/1.0',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          }),
          ...(cache?.etag && {
            'If-None-Match': cache.etag
          })
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      });

      if (response.ok || response.status === 304) {
        return response;
      }

      // Don't retry on 4xx errors (client errors)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`GitHub returned ${response.status}: ${response.statusText}`);
      }

      // Retry on 5xx errors
      if (i < retries - 1) {
        console.warn(`Retry ${i + 1}/${retries} after ${response.status} error`);
        await delay(RETRY_DELAY * (i + 1)); // Exponential backoff
        continue;
      }

      throw new Error(`GitHub fetch failed after ${retries} retries: ${response.status}`);
    } catch (error: any) {
      if (i < retries - 1 && !error.message.includes('GitHub returned 4')) {
        console.warn(`Retry ${i + 1}/${retries} after error:`, error.message);
        await delay(RETRY_DELAY * (i + 1));
        continue;
      }
      throw error;
    }
  }

  throw new Error('Fetch failed after all retries');
}

export async function GET() {
  const now = Date.now();

  try {
    // Check if cache is still valid
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
        cacheAge: Math.round((now - cache.timestamp) / 1000),
        source: 'cache'
      });
    }

    // Fetch from GitHub
    console.log(`Fetching progress data from GitHub: ${GITHUB_RAW_URL}`);
    const response = await fetchWithRetry(GITHUB_RAW_URL);

    // If not modified (304), use existing cache
    if (response.status === 304 && cache) {
      cache.timestamp = now; // Refresh cache timestamp
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
        cacheAge: 0,
        source: 'not-modified'
      });
    }

    // Parse new data
    const data = await response.json();

    // Validate data structure
    if (!data.leetcode || !data.stats || !data.phases) {
      throw new Error('Invalid data structure from GitHub');
    }

    // Update cache
    cache = {
      data,
      timestamp: now,
      etag: response.headers.get('etag') || undefined
    };

    console.log('✅ Successfully fetched and cached progress data');

    return NextResponse.json({
      success: true,
      data,
      cached: false,
      source: 'github',
      lastUpdated: data.notes?.lastUpdated
    });

  } catch (error: any) {
    console.error('❌ Failed to fetch progress from GitHub:', error.message);

    // Return stale cache if available (graceful degradation)
    if (cache) {
      const cacheAge = Math.round((now - cache.timestamp) / 1000);
      console.warn(`⚠️  Using stale cache (${cacheAge}s old) due to fetch error`);

      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
        cacheAge,
        source: 'stale-cache',
        warning: 'Using cached data due to fetch error',
        error: error.message
      });
    }

    // No cache available - return error
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch progress data',
        message: error.message,
        suggestion: 'Please check your internet connection and try again later'
      },
      { status: 503 } // Service Unavailable
    );
  }
}

// Endpoint to manually refresh cache
export async function POST() {
  console.log('🔄 Manual cache refresh requested');
  cache = null;
  return NextResponse.json({
    success: true,
    message: 'Cache cleared successfully'
  });
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, {
    status: cache ? 200 : 503,
    headers: {
      'X-Cache-Status': cache ? 'HIT' : 'MISS',
      'X-Cache-Age': cache ? String(Math.round((Date.now() - cache.timestamp) / 1000)) : '0'
    }
  });
}
