import dbConnect from '@/lib/mongodb';
import PanelWeek from '@/lib/models/PanelWeek';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: { market: string } }
) {
  try {
    await dbConnect();
    const weeks = await PanelWeek.find({ marketSlug: params.market })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(weeks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch panel data' },
      { status: 500 }
    );
  }
}
