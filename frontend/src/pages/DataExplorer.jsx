import { useState, useEffect } from 'react';
import { api } from '../api/client';
import PageContainer from '../components/layout/PageContainer';
import Header from '../components/layout/Header';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { ChevronLeft, ChevronRight, Download, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function DataExplorer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit,
        search,
        ...filters,
      };
      const result = await api.data.get(params);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleExport = () => {
    const url = api.export.csv(filters);
    window.open(url, '_blank');
  };

  if (loading && !data) return <LoadingState message="Loading data..." />;
  if (error && !data) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div>
      <Header title="Data Explorer" subtitle="Search, filter, and explore raw sales records." />
      <PageContainer>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-blue-500/20 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {data && data.items.length === 0 && (
          <EmptyState title="No records found" description="Try adjusting your search or filters." />
        )}

        {data && data.items.length > 0 && (
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Order ID</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Customer</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Region</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Product</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Qty</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Sales</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.order_id}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{format(new Date(item.order_date), 'MMM dd, yyyy')}</td>
                      <td className="px-4 py-3 text-slate-900 font-medium text-xs">{item.customer_name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {item.region}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{item.category}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs max-w-[200px] truncate" title={item.product_name}>{item.product_name}</td>
                      <td className="px-4 py-3 text-right text-slate-600 text-xs">{item.quantity}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900 text-xs">₹{item.sales?.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-right font-medium text-xs ${item.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.profit >= 0 ? '+' : ''}₹{item.profit?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50/30">
              <p className="text-xs text-slate-500">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, data.total)} of {data.total} records
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 hover:bg-slate-200/50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <span className="text-xs font-medium text-slate-700 px-2">
                  Page {page} of {data.total_pages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(data.total_pages, p + 1))}
                  disabled={page === data.total_pages}
                  className="p-1.5 hover:bg-slate-200/50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
