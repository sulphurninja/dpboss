'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

interface Market {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  openTime: string;
  closeTime: string;
}

interface PanelStats {
  marketId: string;
  totalWeeks: number;
  completedWeeks: number;
  totalCells: number;
  filledCells: number;
  lastUpdated?: string;
}

export default function AdminPanelOverviewPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [panelStats, setPanelStats] = useState<PanelStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/markets');
      const data = await response.json();
      const activeMarkets = data.filter((m: Market) => m.isActive);
      setMarkets(activeMarkets);

      // Fetch panel stats for each market (you can create a dedicated API endpoint)
      const statsPromises = activeMarkets.map(async (market: Market) => {
        try {
          const panelRes = await fetch(`/api/admin/panel/${market.slug}`);
          const panelData = await panelRes.json();

          const totalWeeks = panelData.length;
          const completedWeeks = panelData.filter((week: any) =>
            week.jodiCells.filter((cell: any) => cell.numbers.length > 0).length === 21
          ).length;

          const totalCells = totalWeeks * 21;
          const filledCells = panelData.reduce((sum: number, week: any) =>
            sum + week.jodiCells.filter((cell: any) => cell.numbers.length > 0).length, 0
          );

          return {
            marketId: market._id,
            totalWeeks,
            completedWeeks,
            totalCells,
            filledCells,
            lastUpdated: panelData[0]?.updatedAt || panelData[0]?.createdAt
          };
        } catch (error) {
          return {
            marketId: market._id,
            totalWeeks: 0,
            completedWeeks: 0,
            totalCells: 0,
            filledCells: 0
          };
        }
      });

      const stats = await Promise.all(statsPromises);
      setPanelStats(stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMarketStats = (marketId: string) => {
    return panelStats.find(stat => stat.marketId === marketId) || {
      marketId,
      totalWeeks: 0,
      completedWeeks: 0,
      totalCells: 0,
      filledCells: 0
    };
  };

  const getCompletionPercentage = (stats: PanelStats) => {
    if (stats.totalCells === 0) return 0;
    return Math.round((stats.filledCells / stats.totalCells) * 100);
  };

  if (loading) {
    return (
      <AdminLayout title="Panel Charts Overview">
        <div className="flex items-center justify-center min-h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Panel Charts Overview">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Active Markets</p>
              <p className="text-3xl font-bold text-slate-900">{markets.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Weeks</p>
              <p className="text-3xl font-bold text-slate-900">
                {panelStats.reduce((sum, stat) => sum + stat.totalWeeks, 0)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 6V9a2 2 0 012-2h4a2 2 0 012 2v2M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Cells</p>
              <p className="text-3xl font-bold text-slate-900">
                {panelStats.reduce((sum, stat) => sum + stat.totalCells, 0)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Overall Progress</p>
              <p className="text-3xl font-bold text-slate-900">
                {panelStats.reduce((sum, stat) => sum + stat.totalCells, 0) > 0
                  ? Math.round((panelStats.reduce((sum, stat) => sum + stat.filledCells, 0) / panelStats.reduce((sum, stat) => sum + stat.totalCells, 0)) * 100)
                  : 0}%
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => {
          const stats = getMarketStats(market._id);
          const completionPercentage = getCompletionPercentage(stats);

          return (
            <div
              key={market._id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{market.name}</h3>
                    <p className="text-sm text-slate-500">{market.openTime} - {market.closeTime}</p>
                  </div>
                </div>

                <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                  completionPercentage >= 80
                    ? 'bg-green-100 text-green-800'
                    : completionPercentage >= 50
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {completionPercentage}% Complete
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Panel Progress</span>
                  <span className="text-sm font-medium text-slate-900">
                    {stats.filledCells} / {stats.totalCells} cells
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      completionPercentage >= 80
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : completionPercentage >= 50
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-50/50 rounded-xl">
                  <div className="text-lg font-bold text-slate-900">{stats.totalWeeks}</div>
                  <div className="text-xs text-slate-600">Total Weeks</div>
                </div>
                <div className="text-center p-3 bg-slate-50/50 rounded-xl">
                  <div className="text-lg font-bold text-slate-900">{stats.completedWeeks}</div>
                  <div className="text-xs text-slate-600">Completed</div>
                </div>
              </div>

           {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/admin/panel/${market.slug}`}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Manage</span>
                  </Link>

                  <Link
                    href={`/panel-chart-record/${market.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Preview</span>
                  </Link>
                </div>

                {stats.lastUpdated && (
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Last updated</p>
                    <p className="text-xs font-medium text-slate-700">
                      {new Date(stats.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {markets.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No active markets found</h3>
          <p className="text-slate-500 mb-6">Create markets first to manage their panel charts</p>
          <Link
            href="/admin/markets"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            Create Your First Market
          </Link>
        </div>
      )}

      {/* Quick Actions Floating Menu */}
      <div className="fixed bottom-8 right-8">
        <div className="relative group">
          <button className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 group-hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>

          <div className="absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col space-y-2">
            <Link
              href="/admin/markets"
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              + Add Market
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
