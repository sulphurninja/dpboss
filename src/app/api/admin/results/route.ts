import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LiveResult from '@/lib/models/LiveResult';
import Market from '@/lib/models/Market';

// GET - Fetch all results
export async function GET() {
  try {
    await connectDB();

    const results = await LiveResult.find({})
      .populate('marketId', 'name slug')
      .sort({ resultDate: -1, createdAt: -1 })
      .limit(100) // Limit for performance
      .lean();

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new result
export async function POST(request: NextRequest) {
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

    // Check if result already exists for this market and date
    const existingResult = await LiveResult.findOne({
      marketId,
      resultDate: new Date(resultDate)
    });

    if (existingResult) {
      return NextResponse.json(
        { error: 'Result already exists for this market and date' },
        { status: 400 }
      );
    }

    const newResult = new LiveResult({
      marketId,
      open: parseInt(open),
      jodi: parseInt(jodi),
      close: parseInt(close),
      resultDate: new Date(resultDate)
    });

    const savedResult = await newResult.save();
    return NextResponse.json(savedResult, { status: 201 });
  } catch (error) {
    console.error('Error creating result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
