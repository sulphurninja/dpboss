import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Market from '@/lib/models/Market';

// PATCH - Toggle market active status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { marketId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { isActive } = body;

    const updatedMarket = await Market.findByIdAndUpdate(
      params.marketId,
      { isActive: Boolean(isActive) },
      { new: true }
    );

    if (!updatedMarket) {
      return NextResponse.json({ error: 'Market not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMarket);
  } catch (error) {
    console.error('Error toggling market status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
