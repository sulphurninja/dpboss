import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Market from '@/lib/models/Market';
import PanelWeek from '@/lib/models/PanelWeek';
import LiveResult from '@/lib/models/LiveResult';
import './panel-chart.css';

interface PanelChartPageProps {
  params: { market: string };
}

// Helper function to format numbers for display
const formatNumber = (num: number) => num.toString().padStart(1, '0');

// Helper function to format date range
const formatDateRange = (startDate: Date, endDate: Date) => {
  const format = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return `${format(startDate)} to ${format(endDate)}`;
};

export default async function PanelChartPage({ params }: PanelChartPageProps) {
  await connectDB();

  // Fetch market data
  const market = await Market.findOne({
    slug: params.market
  }).lean();

  if (!market) {
    notFound();
  }

  // Fetch panel data for the market (last 100 weeks for performance)
  const panelData = await PanelWeek.find({
    marketId: market._id
  })
  .sort({ startDate: -1 })
  .limit(100)
  .lean();

  // Fetch current live result
  const currentResult = await LiveResult.findOne({
    marketId: market._id
  })
  .sort({ resultDate: -1 })
  .lean();

  return (
    <div className="panel-chart-container">
      <div id="top"></div>

      {/* Header */}
      <div className="header">
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1>{market.name.toUpperCase()} PANEL CHART RECORD</h1>
      </div>

      {/* Current Result Display */}
      {currentResult && (
        <div className="chart-result">
          <div>{market.name.toUpperCase()}</div>
          <span>{currentResult.open}-{currentResult.jodi}-{currentResult.close}</span><br/>
          <Link href={`/${market.slug}`}>Refresh Result</Link>
        </div>
      )}

      {/* Main Panel Chart Table */}
      <div className="result-chart">
        <h1>{market.name.toUpperCase()} PANEL CHART RECORD</h1>

        <div className="table-container">
          <table className="panel-table">
            <thead>
              <tr>
                <th>Date Range</th>
                <th colSpan={21}>Panel Chart Records</th>
              </tr>
            </thead>
            <tbody>
              {panelData.map((week) => (
                <tr key={week._id.toString()}>
                  <td className="date-cell">
                    {formatDateRange(new Date(week.startDate), new Date(week.endDate))}
                  </td>

                  {/* Render all jodi cells for the week */}
                  {week.jodiCells.map((cell, index) => (
                    <td
                      key={index}
                      className={cell.isWinning ? 'winning-cell' : ''}
                    >
                      {cell.numbers.length === 3 ? (
                        <>
                          {formatNumber(cell.numbers[0])}<br/>
                          {formatNumber(cell.numbers[1])}<br/>
                          {formatNumber(cell.numbers[2])}
                        </>
                      ) : cell.numbers.length === 2 ? (
                        <>
                          {formatNumber(cell.numbers[0])}<br/>
                          {formatNumber(cell.numbers[1])}
                        </>
                      ) : cell.numbers.length === 1 ? (
                        formatNumber(cell.numbers[0])
                      ) : (
                        <span className="no-data">*<br/>*<br/>*</span>
                      )}
                    </td>
                  ))}

                  {/* Fill remaining cells if less than 21 */}
                  {Array.from({ length: Math.max(0, 21 - week.jodiCells.length) }).map((_, index) => (
                    <td key={`empty-${index}`} className="empty-cell">
                      <span className="no-data">*<br/>*<br/>*</span>
                    </td>
                  ))}
                </tr>
              ))}

              {panelData.length === 0 && (
                <tr>
                  <td colSpan={22} className="no-data-row">
                    No panel data available for this market
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Information */}
      <div className="container-fluid footer-text-div">
        <p>
          DPBoss Services is a renowned platform that provides comprehensive and accurate information on {market.name} Panel Chart Records.
          As a trusted name in the world of online gaming and gambling, DPBoss has carved a niche for itself by delivering reliable and
          up-to-date data to enthusiasts seeking {market.name} panel charts.
        </p>
        <br/>
        <p>
          {market.name} Panel Chart Records serve as crucial tools for players and bettors looking to analyze trends and patterns in the {market.name} market.
          DPBoss understands the significance of this data in making informed decisions and strives to offer a user-friendly interface for easy navigation
          through the {market.name} Panel Chart Records.
        </p>
        <p>
          DPBoss Services stands as a trustworthy companion for {market.name} enthusiasts, offering a seamless experience and valuable insights
          through its {market.name} Panel Chart Records section.
        </p>
        <br/>

        {/* FAQ Section */}
        <div className="faq-heading">Frequently Asked Questions (FAQ) for {market.name} Panel Chart Records:</div>
        <p className="faq-title">Q1: How often are the {market.name} Panel Chart Records updated on DPBoss Services?</p>
        <p className="faq-ans">
          DPBoss Services takes pride in its commitment to providing real-time updates. {market.name} Panel Chart Records are refreshed regularly
          to ensure that users have access to the latest and most accurate information. Whether you are a seasoned player or a novice,
          you can rely on DPBoss for timely updates to enhance your gaming experience.
        </p>
        <p className="faq-title">Q2: Is the {market.name} Panel Chart Records section on DPBoss Services user-friendly?</p>
        <p className="faq-ans">
          Absolutely! DPBoss Services prioritizes user experience, and the {market.name} Panel Chart Records section is designed with simplicity
          and ease of use in mind. The intuitive interface allows users to navigate effortlessly through the charts, making it convenient for
          both beginners and experienced players to analyze the {market.name} market trends and make informed decisions.
        </p>
      </div>

      <br/><br/>
      <center>
        <div id="bottom"></div>
        <Link href="#top" className="button2">Go to Top</Link>
      </center>

      {/* Footer */}
      <footer>
        <Link className="ftr-icon" href="/">dpboss.boston</Link>
        <p>
          All Rights Reserved®
          <br/>
          (1998-2024)
          <br/>
          Contact (Astrologer-<span>Dpboss</span>)
        </p>
      </footer>
    </div>
  );
}

// Generate static params for all markets
export async function generateStaticParams() {
  await connectDB();
  const markets = await Market.find({}, 'slug').lean();

  return markets.map((market) => ({
    market: market.slug,
  }));
}

// Metadata generation
export async function generateMetadata({ params }: PanelChartPageProps) {
  await connectDB();
  const market = await Market.findOne({ slug: params.market }).lean();

  if (!market) {
    return {
      title: 'Market Not Found',
    };
  }

  return {
    title: `${market.name} Panel Chart Record - DPBoss`,
    description: `Get the latest ${market.name} panel chart records and historical data. Analyze trends and patterns with our comprehensive ${market.name} panel charts.`,
    keywords: `${market.name}, panel chart, records, dpboss, satta matka, gambling`,
  };
}
