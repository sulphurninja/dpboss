import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Market from '@/lib/models/Market';
import PanelWeek from '@/lib/models/PanelWeek';

// GET - Fetch all panel weeks for a market
export async function GET(
  request: NextRequest,
  { params }: { params: { market: string } }
) {
  try {
    await connectDB();

    const market = await Market.findOne({ slug: params.market });
    if (!market) {
      return NextResponse.json({ error: 'Market not found' }, { status: 404 });
    }

    const panelWeeks = await PanelWeek.find({ marketId: market._id })
      .sort({ startDate: -1 })
      .lean();

    return NextResponse.json(panelWeeks);
  } catch (error) {
    console.error('Error fetching panel weeks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new panel week
export async function POST(
  request: NextRequest,
  { params }: { params: { market: string } }
) {
  try {
    await connectDB();

    const market = await Market.findOne({ slug: params.market });
    if (!market) {
      return NextResponse.json({ error: 'Market not found' }, { status: 404 });
    }

    const body = await request.json();

    const newPanelWeek = new PanelWeek({
      marketId: market._id,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      jodiCells: body.jodiCells || []
    });

    const savedWeek = await newPanelWeek.save();
    return NextResponse.json(savedWeek);
  } catch (error) {
    console.error('Error creating panel week:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
