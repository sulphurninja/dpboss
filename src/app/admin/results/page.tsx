'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '../components/AdminLayout';

interface Market {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface LiveResult {
  _id?: string;
  marketId: string;
  open: number;
  jodi: number;
  close: number;
  resultDate: string;
  marketName?: string;
  createdAt?: string;
}

 function AdminResultsPageContent() {
  const searchParams = useSearchParams();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [results, setResults] = useState<LiveResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingResult, setEditingResult] = useState<LiveResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [formData, setFormData] = useState<LiveResult>({
    marketId: '',
    open: 0,
    jodi: 0,
    close: 0,
    resultDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
    if (searchParams.get('action') === 'add') {
      setShowModal(true);
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      const [marketsRes, resultsRes] = await Promise.all([
        fetch('/api/admin/markets'),
        fetch('/api/admin/results')
      ]);

      const marketsData = await marketsRes.json();
      const resultsData = await resultsRes.json();

      setMarkets(marketsData.filter((m: Market) => m.isActive));
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      marketId: '',
      open: 0,
      jodi: 0,
      close: 0,
      resultDate: new Date().toISOString().split('T')[0]
    });
    setEditingResult(null);
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'open' || name === 'jodi' || name === 'close'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.marketId) {
      alert('Please select a market');
      return;
    }

    if (formData.open < 0 || formData.open > 999 ||
        formData.jodi < 0 || formData.jodi > 99 ||
        formData.close < 0 || formData.close > 999) {
      alert('Invalid values. Open/Close: 0-999, Jodi: 0-99');
      return;
    }

    try {
      const url = editingResult
        ? `/api/admin/results/${editingResult._id}`
        : '/api/admin/results';

      const method = editingResult ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchData();
        resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving result:', error);
      alert('Error saving result');
    }
  };

  const handleEdit = (result: LiveResult) => {
    setFormData({
      marketId: result.marketId,
      open: result.open,
      jodi: result.jodi,
      close: result.close,
      resultDate: new Date(result.resultDate).toISOString().split('T')[0]
    });
    setEditingResult(result);
    setShowModal(true);
  };

  const handleDelete = async (resultId: string) => {
    if (!confirm('Delete this result?')) return;

    try {
      const response = await fetch(`/api/admin/results/${resultId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('Error deleting result');
    }
  };

  const getMarketName = (marketId: string) => {
    const market = markets.find(m => m._id === marketId);
    return market ? market.name : 'Unknown Market';
  };

  const filteredResults = results.filter(result => {
    const marketName = getMarketName(result.marketId).toLowerCase();
    const matchesSearch = marketName.includes(searchTerm.toLowerCase()) ||
                         result.open.toString().includes(searchTerm) ||
                         result.jodi.toString().includes(searchTerm) ||
                         result.close.toString().includes(searchTerm);
    const matchesMarket = selectedMarket === 'all' || result.marketId === selectedMarket;
return matchesSearch && matchesMarket;
  });

  if (loading) {
    return (
      <AdminLayout title="Results Management">
        <div className="flex items-center justify-center min-h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Results Management">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Market Filter */}
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
          >
            <option value="all">All Markets</option>
            {markets.map(market => (
              <option key={market._id} value={market._id}>
                {market.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 font-medium flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Add Result</span>
        </button>
      </div>

      {/* Quick Add for Active Markets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {markets.slice(0, 4).map((market) => (
          <div key={market._id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-slate-200/60 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-900">{market.name}</h4>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <button
              onClick={() => {
                setFormData(prev => ({ ...prev, marketId: market._id }));
                setShowModal(true);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              Quick Add Result
            </button>
          </div>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid gap-4">
        {filteredResults.map((result) => (
          <div key={result._id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{getMarketName(result.marketId)}</h3>
                    <p className="text-sm text-slate-500">
                      {new Date(result.resultDate).toLocaleDateString()} •
                      {result.createdAt && (
                        <span> Added {new Date(result.createdAt).toLocaleTimeString()}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">OPEN</p>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-lg min-w-[60px]">
                      {result.open.toString().padStart(3, '0')}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">JODI</p>
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-lg min-w-[50px]">
                      {result.jodi.toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">CLOSE</p>
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-bold text-lg min-w-[60px]">
                      {result.close.toString().padStart(3, '0')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(result)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Result"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(result._id!)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Result"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No results found</h3>
          <p className="text-slate-500 mb-6">Add your first result to get started</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            Add First Result
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm" onClick={resetForm}></div>

            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/60">
              <div className="px-6 py-4 border-b border-slate-200/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    {editingResult ? 'Edit Result' : 'Add New Result'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Market *
                    </label>
                    <select
                      name="marketId"
                      value={formData.marketId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50/50"
                    >
                      <option value="">Select Market</option>
                      {markets.map(market => (
                        <option key={market._id} value={market._id}>
                          {market.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Open *
                      </label>
                      <input
                        type="number"
                        name="open"
                        value={formData.open}
                        onChange={handleInputChange}
                        min="0"
                        max="999"
                        required
                        placeholder="000"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50 text-center font-mono text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Jodi *
                      </label>
                      <input
                        type="number"
                        name="jodi"
                        value={formData.jodi}
                        onChange={handleInputChange}
                        min="0"
                        max="99"
                        required
                        placeholder="00"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50/50 text-center font-mono text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Close *
                      </label>
                      <input
                        type="number"
                        name="close"
                        value={formData.close}
                        onChange={handleInputChange}
                        min="0"
                        max="999"
                        required
                        placeholder="000"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50/50 text-center font-mono text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Result Date *
                    </label>
                    <input
                      type="date"
                      name="resultDate"
                      value={formData.resultDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  {/* Preview */}
                  {(formData.open || formData.jodi || formData.close) && (
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
                      <p className="text-sm text-slate-600 mb-2">Preview:</p>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="px-3 py-2 bg-blue-500 text-white rounded-lg font-bold">
                          {formData.open.toString().padStart(3, '0')}
                        </div>
                        <span className="text-slate-400">-</span>
                        <div className="px-3 py-2 bg-green-500 text-white rounded-lg font-bold">
                          {formData.jodi.toString().padStart(2, '0')}
                        </div>
                        <span className="text-slate-400">-</span>
                        <div className="px-3 py-2 bg-purple-500 text-white rounded-lg font-bold">
                          {formData.close.toString().padStart(3, '0')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 font-medium"
                  >
                    {editingResult ? 'Update Result' : 'Add Result'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminResultsPage() {
  return (
    <Suspense fallback={
      <AdminLayout title="Results Management">
        <div className="flex items-center justify-center min-h-96">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </AdminLayout>
    }>
      <AdminResultsPageContent />
    </Suspense>
  );
}
