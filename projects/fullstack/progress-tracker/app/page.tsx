import ProgressDashboard from './components/ProgressDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

async function getProgressData() {
  // In production, fetch from GitHub API route
  // In development, you can still use local file or the API
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (isProduction) {
    // Fetch from GitHub via API route
    const response = await fetch(`${baseUrl}/api/progress`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch progress data');
    }

    const result = await response.json();
    return result.data;
  } else {
    // Development: use local file
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    const filePath = join(process.cwd(), 'data', 'progress.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
}

export default async function Home() {
  const progressData = await getProgressData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <ProgressDashboard data={progressData} />
    </main>
  );
}
