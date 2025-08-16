import dbConnect from '@/lib/mongodb';
import JodiCell from '@/lib/models/JobiCell';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: { market: string } }
) {
  try {
    await dbConnect();
    const cells = await JodiCell.find({ marketSlug: params.market })
      .sort({ row: 1, col: 1 })
      .lean();

    // Group by rows
    const rows: { [key: number]: any[] } = {};
    cells.forEach(cell => {
      if (!rows[cell.row]) rows[cell.row] = [];
      rows[cell.row][cell.col] = {
        raw: cell.raw,
        isR: cell.isR
      };
    });

    const sortedRows = Object.keys(rows)
      .map(Number)
      .sort((a, b) => a - b)
      .map(rowKey => rows[rowKey]);

    return NextResponse.json({
      headers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Adjust as needed
      rows: sortedRows
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jodi data' },
      { status: 500 }
    );
  }
}
