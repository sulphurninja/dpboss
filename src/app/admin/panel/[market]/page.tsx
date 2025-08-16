'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '../../components/AdminLayout';

interface JodiCell {
  numbers: number[];
  isWinning: boolean;
}

interface PanelWeek {
  _id?: string;
  marketId: string;
  startDate: string;
  endDate: string;
  jodiCells: JodiCell[];
}

export default function AdminPanelPage() {
  const params = useParams();
  const router = useRouter();
  const [market, setMarket] = useState<any>(null);
  const [panelWeeks, setPanelWeeks] = useState<PanelWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);

  useEffect(() => {
    fetchData();
  }, [params.market]);

  const fetchData = async () => {
    try {
      const marketRes = await fetch(`/api/markets`);
      const markets = await marketRes.json();
      const currentMarket = markets.find((m: any) => m.slug === params.market);
      setMarket(currentMarket);

      const panelRes = await fetch(`/api/admin/panel/${params.market}`);
      const panelData = await panelRes.json();
      setPanelWeeks(panelData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNewWeek = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay());

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const newWeek: PanelWeek = {
      marketId: market._id,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      jodiCells: Array.from({ length: 21 }, () => ({
        numbers: [],
        isWinning: false
      }))
    };

    setPanelWeeks([newWeek, ...panelWeeks]);
    setExpandedWeek(0);
  };

  const updateCell = (weekIndex: number, cellIndex: number, numbers: number[], isWinning: boolean = false) => {
    const updatedWeeks = [...panelWeeks];
    updatedWeeks[weekIndex].jodiCells[cellIndex] = { numbers, isWinning };
    setPanelWeeks(updatedWeeks);
  };

  const saveWeek = async (weekIndex: number) => {
    setSaving(true);
    try {
      const week = panelWeeks[weekIndex];
      const method = week._id ? 'PUT' : 'POST';
      const url = week._id
        ? `/api/admin/panel/${params.market}/${week._id}`
        : `/api/admin/panel/${params.market}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(week),
      });

      if (response.ok) {
        const savedWeek = await response.json();
        const updatedWeeks = [...panelWeeks];
        updatedWeeks[weekIndex] = savedWeek;
        setPanelWeeks(updatedWeeks);
      } else {
        alert('Error saving week');
      }
    } catch (error) {
      console.error('Error saving week:', error);
      alert('Error saving week');
    } finally {
      setSaving(false);
    }
  };

  const deleteWeek = async (weekIndex: number) => {
    if (!confirm('Delete this week?')) return;

    const week = panelWeeks[weekIndex];
    if (week._id) {
      try {
        await fetch(`/api/admin/panel/${params.market}/${week._id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting week:', error);
        alert('Error deleting week');
        return;
      }
    }

    const updatedWeeks = panelWeeks.filter((_, index) => index !== weekIndex);
    setPanelWeeks(updatedWeeks);
    if (expandedWeek === weekIndex) {
      setExpandedWeek(null);
    }
  };

  const duplicateWeek = (weekIndex: number) => {
    const weekToDuplicate = panelWeeks[weekIndex];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay());

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const newWeek: PanelWeek = {
      marketId: market._id,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      jodiCells: [...weekToDuplicate.jodiCells]
    };

    setPanelWeeks([newWeek, ...panelWeeks]);
    setExpandedWeek(0);
  };

  const quickFillPatterns = [
    { name: 'Random', pattern: () => Array.from({length: 3}, () => Math.floor(Math.random() * 10)) },
    { name: '1-2-3', pattern: () => [1, 2, 3] },
    { name: '0-0-0', pattern: () => [0, 0, 0] },
    { name: '5-5-5', pattern: () => [5, 5, 5] },
    { name: '7-8-9', pattern: () => [7, 8, 9] },
  ];

  const applyQuickFill = (weekIndex: number, patternFn: () => number[]) => {
    const updatedWeeks = [...panelWeeks];
    updatedWeeks[weekIndex].jodiCells = updatedWeeks[weekIndex].jodiCells.map(cell => ({
      ...cell,
      numbers: patternFn()
    }));
    setPanelWeeks(updatedWeeks);
  };

  if (loading) {
    return (
      <AdminLayout title="Panel Management">
        <div className="flex items-center justify-center min-h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!market) {
    return (
      <AdminLayout title="Panel Management">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Market not found</h3>
          <button
            onClick={() => router.push('/admin/markets')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            Back to Markets
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`${market.name} Panel Management`}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{market.name}</h2>
              <p className="text-sm text-slate-500">{panelWeeks.length} weeks configured</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={addNewWeek}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Week</span>
          </button>

          <a
            href={`/panel-chart-record/${market.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Preview Chart</span>
          </a>
        </div>
      </div>

      {/* Panel Weeks */}
      <div className="space-y-6">
        {panelWeeks.map((week, weekIndex) => (
          <div key={weekIndex} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 overflow-hidden">
            {/* Week Header */}
            <div
              className="p-6 border-b border-slate-200/60 cursor-pointer hover:bg-slate-50/50 transition-colors"
              onClick={() => setExpandedWeek(expandedWeek === weekIndex ? null : weekIndex)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    week._id
                      ? 'bg-gradient-to-tr from-green-500 to-emerald-600'
                      : 'bg-gradient-to-tr from-orange-500 to-yellow-600'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {weekIndex + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={week.startDate}
                        onChange={(e) => {
                          const updatedWeeks = [...panelWeeks];
                          updatedWeeks[weekIndex].startDate = e.target.value;
                          setPanelWeeks(updatedWeeks);
                        }}
                        className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={week.endDate}
                        onChange={(e) => {
                          const updatedWeeks = [...panelWeeks];
                          updatedWeeks[weekIndex].endDate = e.target.value;
                          setPanelWeeks(updatedWeeks);
                        }}
                        className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    week._id
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {week._id ? 'Saved' : 'Unsaved'}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveWeek(weekIndex);
                      }}
                      disabled={saving}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateWeek(weekIndex);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Duplicate Week"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWeek(weekIndex);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Week"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="text-slate-400">
                      <svg className={`w-5 h-5 transition-transform duration-200 ${expandedWeek === weekIndex ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Week Content */}
            {expandedWeek === weekIndex && (
              <div className="p-6">
                {/* Quick Fill Actions */}
                <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
                  <span className="text-sm font-medium text-slate-700 mr-2">Quick Fill:</span>
                  {quickFillPatterns.map((pattern, index) => (
                    <button
                      key={index}
                      onClick={() => applyQuickFill(weekIndex, pattern.pattern)}
                      className="px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                    >
                      {pattern.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      const updatedWeeks = [...panelWeeks];
                      updatedWeeks[weekIndex].jodiCells = updatedWeeks[weekIndex].jodiCells.map(cell => ({
                        ...cell,
                        numbers: []
                      }));
                      setPanelWeeks(updatedWeeks);
                    }}
                    className="px-3 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {/* Cells Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {week.jodiCells.slice(0, 21).map((cell, cellIndex) => (
                    <div key={cellIndex} className={`relative group border-2 rounded-xl p-4 transition-all duration-200 ${
                      cell.isWinning
                        ? 'border-red-300 bg-red-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
                    }`}>
                      <div className="text-center mb-3">
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          #{cellIndex + 1}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="1,2,3"
                          value={cell.numbers.join(',')}
                          onChange={(e) => {
                            const numbers = e.target.value
                              .split(',')
                              .map(n => parseInt(n.trim()))
                              .filter(n => !isNaN(n) && n >= 0 && n <= 9);
                            updateCell(weekIndex, cellIndex, numbers, cell.isWinning);
                          }}
                          className="w-full text-center text-sm font-mono border border-slate-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50/50"
                        />

                        <div className="flex items-center justify-center">
                          <label className="flex items-center space-x-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cell.isWinning}
                              onChange={(e) => updateCell(weekIndex, cellIndex, cell.numbers, e.target.checked)}
                              className="w-3 h-3 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="text-xs text-slate-600 select-none">Win</span>
                          </label>
                        </div>

                        {/* Number Display */}
                        {cell.numbers.length > 0 && (
                          <div className="flex flex-col space-y-1">
                            {cell.numbers.map((num, numIndex) => (
                              <div key={numIndex} className={`text-center py-1 px-2 rounded text-xs font-bold ${
                                cell.isWinning
                                  ? 'bg-red-500 text-white'
                                  : 'bg-purple-500 text-white'
                              }`}>
                                {num}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Quick number buttons */}
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white border border-slate-200 rounded-lg p-1 shadow-lg">
                          <div className="grid grid-cols-5 gap-1">
                            {[0,1,2,3,4,5,6,7,8,9].map(num => (
                              <button
                                key={num}
                                onClick={() => {
                                  const newNumbers = [...cell.numbers];
                                  if (newNumbers.includes(num)) {
                                    const index = newNumbers.indexOf(num);
                                    newNumbers.splice(index, 1);
                                  } else if (newNumbers.length < 3) {
                                    newNumbers.push(num);
                                  }
                                  updateCell(weekIndex, cellIndex, newNumbers, cell.isWinning);
                                }}
                                className={`w-6 h-6 text-xs rounded ${
                                  cell.numbers.includes(num)
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200'
                                } transition-colors`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fill Progress */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Fill Progress</span>
                    <span className="text-sm font-medium text-purple-600">
                      {week.jodiCells.filter(cell => cell.numbers.length > 0).length} / 21 cells
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(week.jodiCells.filter(cell => cell.numbers.length > 0).length / 21) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-lg font-bold text-blue-600">
                      {week.jodiCells.filter(cell => cell.numbers.length > 0).length}
                    </div>
                    <div className="text-xs text-blue-600">Filled Cells</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-lg font-bold text-green-600">
                      {week.jodiCells.filter(cell => cell.isWinning).length}
                    </div>
                    <div className="text-xs text-green-600">Winning Cells</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <div className="text-lg font-bold text-purple-600">
                      {week.jodiCells.reduce((sum, cell) => sum + cell.numbers.length, 0)}
                    </div>
                    <div className="text-xs text-purple-600">Total Numbers</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="text-lg font-bold text-orange-600">
                      {Math.round((week.jodiCells.filter(cell => cell.numbers.length > 0).length / 21) * 100)}%
                    </div>
                    <div className="text-xs text-orange-600">Completion</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {panelWeeks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No panel weeks found</h3>
          <p className="text-slate-500 mb-6">Create your first panel week for {market.name}</p>
          <button
            onClick={addNewWeek}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            Create First Week
          </button>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>

        <button
          onClick={addNewWeek}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </AdminLayout>
  );
}
