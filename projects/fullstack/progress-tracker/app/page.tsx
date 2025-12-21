import ProgressDashboard from './components/ProgressDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

async function getProgressData() {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

  if (isProduction) {
    // Production: Fetch from GitHub via API route
    const apiUrl = `${baseUrl}/api/progress`;

    try {
      console.log(`Fetching progress data from: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        cache: 'no-store',
        next: { revalidate: 0 }
      });

      if (!response.ok) {
        // Try to get error details
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
          errorData?.error ||
          `API returned ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || result.message || 'Unknown error from API');
      }

      console.log(`✅ Progress data loaded successfully (source: ${result.source || 'unknown'})`);

      return result.data;

    } catch (error: any) {
      console.error('❌ Failed to fetch progress data:', error.message);

      // Re-throw with more context
      throw new Error(`Failed to load progress data: ${error.message}`);
    }
  } else {
    // Development: use local file
    try {
      const { readFileSync } = await import('fs');
      const { join } = await import('path');
      const filePath = join(process.cwd(), 'data', 'progress.json');
      const fileContents = readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);

      console.log('✅ Progress data loaded from local file');
      return data;

    } catch (error: any) {
      console.error('❌ Failed to read local progress file:', error.message);
      throw new Error(`Failed to load local progress data: ${error.message}`);
    }
  }
}

export default async function Home() {
  try {
    const progressData = await getProgressData();

    // Validate data structure before rendering
    if (!progressData.leetcode || !progressData.stats || !progressData.phases) {
      throw new Error('Invalid progress data structure');
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <ProgressDashboard data={progressData} />
      </main>
    );

  } catch (error: any) {
    // Error fallback UI
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
          <div className="text-center space-y-6">
            <div className="text-6xl">❌</div>
            <h1 className="text-3xl font-bold">Failed to Load Progress Data</h1>

            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-left">
              <p className="font-mono text-sm text-red-200">
                {error.message || 'Unknown error occurred'}
              </p>
            </div>

            <div className="space-y-3 text-left text-gray-300">
              <p className="font-semibold text-white">Possible causes:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>GitHub is temporarily unavailable</li>
                <li>The progress data file is missing or corrupted</li>
                <li>Network connectivity issues</li>
                <li>Environment variables not configured correctly</li>
              </ul>
            </div>

            <div className="space-y-3 text-left text-gray-300">
              <p className="font-semibold text-white">What to try:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Refresh the page in a few moments</li>
                <li>Check if the GitHub repository is accessible</li>
                <li>Verify the <code className="bg-black/30 px-2 py-1 rounded">GITHUB_PROGRESS_URL</code> environment variable</li>
                <li>Check server logs for more details</li>
              </ul>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🔄 Retry
            </button>

            <p className="text-sm text-gray-400">
              If this problem persists, please contact the administrator.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
