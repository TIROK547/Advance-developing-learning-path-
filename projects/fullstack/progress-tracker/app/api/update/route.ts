import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const updates = await request.json();
    const filePath = join(process.cwd(), 'data', 'progress.json');

    // Read current data
    const currentData = JSON.parse(readFileSync(filePath, 'utf8'));

    // Merge updates with current data
    const updatedData = {
      ...currentData,
      ...updates,
      notes: {
        ...currentData.notes,
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    };

    // Write updated data
    writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'data', 'progress.json');
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read progress' },
      { status: 500 }
    );
  }
}
