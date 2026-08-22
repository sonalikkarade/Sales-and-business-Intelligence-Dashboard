import { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { X, Filter } from 'lucide-react';

export default function DashboardFilters({ filters, onFilterChange, onClearAll }) {
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    categories: [],
    sub_categories: [],
    segments: [],
    years: [],
    states: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.filters.getValues()
      .then(data => {
        setFilterOptions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="skeleton-shimmer h-5 w-5 rounded-md" />
          <div className="skeleton-shimmer h-4 w-24 rounded-md" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-1.5">
              <div className="skeleton-shimmer h-3 w-16 rounded-md" />
              <div className="skeleton-shimmer h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              {activeFilterCount} active
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-slate-500 hover:text-red-600 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Year</label>
          <select
            value={filters.year || ''}
            onChange={(e) => handleChange('year', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Years</option>
            {filterOptions.years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Region</label>
          <select
            value={filters.region || ''}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Regions</option>
            {filterOptions.regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {filterOptions.categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Segment</label>
          <select
            value={filters.segment || ''}
            onChange={(e) => handleChange('segment', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Segments</option>
            {filterOptions.segments.map(seg => (
              <option key={seg} value={seg}>{seg}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">State</label>
          <select
            value={filters.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All States</option>
            {filterOptions.states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Start Date</label>
          <input
            type="date"
            value={filters.start_date || ''}
            onChange={(e) => handleChange('start_date', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">End Date</label>
          <input
            type="date"
            value={filters.end_date || ''}
            onChange={(e) => handleChange('end_date', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
