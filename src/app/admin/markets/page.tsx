'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Market {
  _id?: string;
  name: string;
  slug: string;
  isActive: boolean;
  openTime: string;
  closeTime: string;
  description?: string;
  createdAt?: string;
}

export default function AdminMarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);
  const [formData, setFormData] = useState<Market>({
    name: '',
    slug: '',
    isActive: true,
    openTime: '09:00',
    closeTime: '21:00',
    description: ''
  });

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await fetch('/api/admin/markets');
      const data = await response.json();
      setMarkets(data);
    } catch (error) {
      console.error('Error fetching markets:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };

      // Auto-generate slug when name changes
      if (name === 'name') {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      isActive: true,
      openTime: '09:00',
      closeTime: '21:00',
      description: ''
    });
    setEditingMarket(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingMarket
        ? `/api/admin/markets/${editingMarket._id}`
        : '/api/admin/markets';

      const method = editingMarket ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchMarkets();
        resetForm();
        alert(editingMarket ? 'Market updated successfully!' : 'Market created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error saving market:', error);
      alert('Error saving market');
    }
  };

  const handleEdit = (market: Market) => {
    setFormData({
      name: market.name,
      slug: market.slug,
      isActive: market.isActive,
      openTime: market.openTime,
      closeTime: market.closeTime,
      description: market.description || ''
    });
    setEditingMarket(market);
    setShowAddForm(true);
  };

  const handleDelete = async (marketId: string, marketName: string) => {
    if (!confirm(`Are you sure you want to delete "${marketName}"? This will also delete all associated data.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/markets/${marketId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMarkets();
        alert('Market deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error deleting market:', error);
      alert('Error deleting market');
    }
  };

  const toggleMarketStatus = async (marketId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/markets/${marketId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        await fetchMarkets();
      } else {
        alert('Error toggling market status');
      }
    } catch (error) {
      console.error('Error toggling market status:', error);
      alert('Error toggling market status');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="text-center mt-4">Loading markets...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Markets Management</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add New Market
          </button>
          <Link
            href="/admin"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Back to Admin Dashboard
          </Link>
        </div>
      </div>

      {/* Add/Edit Market Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingMarket ? 'Edit Market' : 'Add New Market'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Milan Morning"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., milan-morning"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-generated from name, but you can customize it</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Time *
                  </label>
                  <input
                    type="time"
                    name="openTime"
                    value={formData.openTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Close Time *
                  </label>
                  <input
                    type="time"
                    name="closeTime"
                    value={formData.closeTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Optional description for this market..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Market is active
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingMarket ? 'Update Market' : 'Create Market'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Markets List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Markets ({markets.length})</h2>
        </div>

        {markets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl mb-4">No markets found</p>
            <p>Create your first market to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {markets.map((market) => (
                  <tr key={market._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {market.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{market.slug}
                        </div>
                        {market.description && (
                          <div className="text-xs text-gray-400 mt-1">
                            {market.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {market.openTime} - {market.closeTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleMarketStatus(market._id!, market.isActive)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          market.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {market.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {market.createdAt
                        ? new Date(market.createdAt).toLocaleDateString()
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/panel-chart-record/${market.slug}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Chart
                      </Link>
                      <Link
                        href={`/admin/panel/${market.slug}`}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Manage Panel
                      </Link>
                      <button
                        onClick={() => handleEdit(market)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(market._id!, market.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
