import { NextResponse } from 'next/server';

const GITHUB_RAW_URL = process.env.GITHUB_PROGRESS_URL ||
  'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/projects/fullstack/progress-tracker/data/progress.json';

// Cache the data for 60 seconds to avoid rate limits
let cache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 1000; // 60 seconds

export async function GET() {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true
      });
    }

    // Fetch from GitHub
    const response = await fetch(GITHUB_RAW_URL, {
      headers: {
        'Accept': 'application/json',
        // Add GitHub token if you have one to avoid rate limits
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.status}`);
    }

    const data = await response.json();

    // Update cache
    cache = {
      data,
      timestamp: Date.now()
    };

    return NextResponse.json({
      success: true,
      data,
      cached: false
    });
  } catch (error) {
    console.error('Failed to fetch progress from GitHub:', error);

    // Return cached data if available, even if expired
    if (cache) {
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
        warning: 'Using cached data due to fetch error'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
}

// Endpoint to manually refresh cache
export async function POST() {
  cache = null;
  return NextResponse.json({ success: true, message: 'Cache cleared' });
}
