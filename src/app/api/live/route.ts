import dbConnect from '@/lib/mongodb';
import LiveResult from '@/lib/models/LiveResult';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await dbConnect();
    const results = await LiveResult.find({})
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch live results' },
      { status: 500 }
    );
  }
}
