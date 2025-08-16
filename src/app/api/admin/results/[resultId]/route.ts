import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LiveResult from '@/lib/models/LiveResult';
import Market from '@/lib/models/Market';

// PUT - Update result
export async function PUT(
  request: NextRequest,
  { params }: { params: { resultId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { marketId, open, jodi, close, resultDate } = body;

    // Validate required fields
    if (!marketId || open === undefined || jodi === undefined || close === undefined || !resultDate) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate market exists
    const market = await Market.findById(marketId);
    if (!market) {
      return NextResponse.json(
        { error: 'Market not found' },
        { status: 400 }
      );
    }

    // Validate number ranges
    if (open < 0 || open > 999 || jodi < 0 || jodi > 99 || close < 0 || close > 999) {
      return NextResponse.json(
        { error: 'Invalid number ranges. Open/Close: 0-999, Jodi: 0-99' },
        { status: 400 }
      );
    }

    // Check if another result exists for this market and date (excluding current result)
    const existingResult = await LiveResult.findOne({
      marketId,
      resultDate: new Date(resultDate),
      _id: { $ne: params.resultId }
    });

    if (existingResult) {
      return NextResponse.json(
        { error: 'Another result already exists for this market and date' },
        { status: 400 }
      );
    }

    const updatedResult = await LiveResult.findByIdAndUpdate(
      params.resultId,
      {
        marketId,
        open: parseInt(open),
        jodi: parseInt(jodi),
        close: parseInt(close),
        resultDate: new Date(resultDate)
      },
      { new: true }
    );

    if (!updatedResult) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(updatedResult);
  } catch (error) {
    console.error('Error updating result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete result
export async function DELETE(
  request: NextRequest,
  { params }: { params: { resultId: string } }
) {
  try {
    await connectDB();

    const deletedResult = await LiveResult.findByIdAndDelete(params.resultId);

    if (!deletedResult) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
