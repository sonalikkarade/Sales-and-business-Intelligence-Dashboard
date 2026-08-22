import { useState, useEffect } from 'react';
import { api } from '../api/client';
import PageContainer from '../components/layout/PageContainer';
import Header from '../components/layout/Header';
import DashboardFilters from '../components/filters/DashboardFilters';
import InsightCard from '../components/insights/InsightCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Lightbulb } from 'lucide-react';

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [ready, setReady] = useState(false);
  
  const fetchData = async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.insights.get(currentFilters);
      setInsights(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setReady(true);
    }
  };
  
  useEffect(() => {
    fetchData({});
    setReady(true);
  }, []);
  
  useEffect(() => {
    if (ready) fetchData(filters);
  }, [filters, ready]);
  
  if (!ready) return <LoadingState message="Generating insights..." />;
  if (error && insights.length === 0) return <ErrorState message={error} onRetry={() => fetchData(filters)} />;
  
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.type]) acc[insight.type] = [];
    acc[insight.type].push(insight);
    return acc;
  }, {});
  
  const sectionTitles = {
    region: 'Regional Insights',
    category: 'Category Insights',
    product: 'Product Insights',
    segment: 'Segment Insights',
    trend: 'Trend Insights',
    profitability: 'Profitability Insights',
  };
  
  return (
    <div>
      <Header title="Business Insights" subtitle="AI-free deterministic insights generated from your sales data." />
      <PageContainer>
        <DashboardFilters filters={filters} onFilterChange={setFilters} onClearAll={() => setFilters({})} />
        
        {loading && <LoadingState message="Generating insights..." />}
        
        {!loading && insights.length === 0 && (
          <div className="mt-6">
            <div className="text-center py-16">
              <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No insights available</h3>
              <p className="text-slate-500">Try adjusting your filters to generate insights.</p>
            </div>
          </div>
        )}
        
        <div className="mt-6 space-y-8">
          {Object.entries(groupedInsights).map(([type, items]) => (
            <div key={type}>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                {sectionTitles[type] || type.charAt(0).toUpperCase() + type.slice(1) + ' Insights'}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {items.map((insight, idx) => (
                  <InsightCard key={idx} insight={insight} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
