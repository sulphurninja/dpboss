import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Market from '@/lib/models/Market';

// GET - Fetch all markets
export async function GET() {
  try {
    await connectDB();

    const markets = await Market.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(markets);
  } catch (error) {
    console.error('Error fetching markets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new market
export async function POST(request: NextRequest) {
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

    // Check if slug already exists
    const existingMarket = await Market.findOne({ slug });
    if (existingMarket) {
      return NextResponse.json(
        { error: 'A market with this slug already exists' },
        { status: 400 }
      );
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(openTime) || !timeRegex.test(closeTime)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM format' },
        { status: 400 }
      );
    }

    const newMarket = new Market({
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      isActive: Boolean(isActive),
      openTime,
      closeTime,
      description: description?.trim() || '',
    });

    const savedMarket = await newMarket.save();
    return NextResponse.json(savedMarket, { status: 201 });
  } catch (error) {
    console.error('Error creating market:', error);

    if (error.code === 11000) {
      // MongoDB duplicate key error
      return NextResponse.json(
        { error: 'A market with this name or slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
