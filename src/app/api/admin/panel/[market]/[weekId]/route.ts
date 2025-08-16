import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PanelWeek from '@/lib/models/PanelWeek';

// PUT - Update panel week
export async function PUT(
  request: NextRequest,
  { params }: { params: { market: string; weekId: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const updatedWeek = await PanelWeek.findByIdAndUpdate(
      params.weekId,
      {
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        jodiCells: body.jodiCells || []
      },
      { new: true }
    );

    if (!updatedWeek) {
      return NextResponse.json({ error: 'Panel week not found' }, { status: 404 });
    }

    return NextResponse.json(updatedWeek);
  } catch (error) {
    console.error('Error updating panel week:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete panel week
export async function DELETE(
  request: NextRequest,
  { params }: { params: { market: string; weekId: string } }
) {
  try {
    await connectDB();

    const deletedWeek = await PanelWeek.findByIdAndDelete(params.weekId);

    if (!deletedWeek) {
      return NextResponse.json({ error: 'Panel week not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Panel week deleted successfully' });
  } catch (error) {
    console.error('Error deleting panel week:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
