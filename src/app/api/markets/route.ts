import dbConnect from '@/lib/mongodb';
import Market from '@/lib/models/Market';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await dbConnect();
    const markets = await Market.find({ active: true })
      .sort({ priority: -1, name: 1 })
      .lean();

    return NextResponse.json(markets);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch markets' },
      { status: 500 }
    );
  }
}
