import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Market from '@/lib/models/Market';
import PanelWeek from '@/lib/models/PanelWeek';
import LiveResult from '@/lib/models/LiveResult';

// PUT - Update market
export async function PUT(
  request: NextRequest,
  { params }: { params: { marketId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, slug, isActive, openTime, closeTime, description } = body;

    // Validate required fields
    if (!name || !slug || !openTime || !closeTime) {
      return NextResponse.json(
        { error: 'Name, slug, open time, and close time are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current market)
    const existingMarket = await Market.findOne({
      slug,
      _id: { $ne: params.marketId }
    });
    if (existingMarket) {
      return NextResponse.json(
        { error: 'A market with this slug already exists' },
        { status: 400 }
      );
    }

    // Validate time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(openTime) || !timeRegex.test(closeTime)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM format' },
        { status: 400 }
      );
    }

    const updatedMarket = await Market.findByIdAndUpdate(
      params.marketId,
      {
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        isActive: Boolean(isActive),
        openTime,
        closeTime,
        description: description?.trim() || '',
      },
      { new: true }
    );

    if (!updatedMarket) {
      return NextResponse.json({ error: 'Market not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMarket);
  } catch (error) {
    console.error('Error updating market:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete market and all associated data
export async function DELETE(
  request: NextRequest,
  { params }: { params: { marketId: string } }
) {
  try {
    await connectDB();

    // Start a transaction to ensure data consistency
    const session = await Market.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete the market
        const deletedMarket = await Market.findByIdAndDelete(params.marketId).session(session);

        if (!deletedMarket) {
          throw new Error('Market not found');
        }

        // Delete all associated panel weeks
        await PanelWeek.deleteMany({ marketId: params.marketId }).session(session);

        // Delete all associated live results
        await LiveResult.deleteMany({ marketId: params.marketId }).session(session);
      });

      await session.endSession();

      return NextResponse.json({
        message: 'Market and all associated data deleted successfully'
      });
    } catch (error) {
      await session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error deleting market:', error);

    if (error.message === 'Market not found') {
      return NextResponse.json({ error: 'Market not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
