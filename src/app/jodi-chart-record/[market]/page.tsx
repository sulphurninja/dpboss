import dbConnect from '@/lib/mongodb';
import Market from '@/lib/models/Market';
import JodiCell from '@/lib/models/JobiCell';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

interface JodiPageProps {
  params: {
    market: string;
  };
}

export default async function JodiChartPage({ params }: JodiPageProps) {
  await dbConnect();

  const market = await Market.findOne({ slug: params.market, active: true }).lean();
  if (!market) {
    notFound();
  }

  const cells = await JodiCell.find({ marketSlug: params.market })
    .sort({ row: 1, col: 1 })
    .lean();

  // Group cells by row
  const rows: { [key: number]: any[] } = {};
  cells.forEach(cell => {
    if (!rows[cell.row]) rows[cell.row] = [];
    rows[cell.row][cell.col] = cell;
  });

  const rowKeys = Object.keys(rows).map(Number).sort((a, b) => a - b);

  return (
    <div className="chart-container">
      <h1 className="chart-title">
        {market.name.toUpperCase()} JODI CHART
      </h1>

      <div className="chart-table">
        <table className="jodi-table">
          <tbody>
            {rowKeys.map(rowKey => (
              <tr key={rowKey}>
                {rows[rowKey].map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={cell?.isR ? 'r' : ''}
                    dangerouslySetInnerHTML={{
                      __html: cell?.raw || ''
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  await dbConnect();
  const markets = await Market.find({ active: true }).lean();

  return markets.map((market) => ({
    market: market.slug,
  }));
}
