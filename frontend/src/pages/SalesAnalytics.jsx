import { useState, useEffect } from 'react';
import { api } from '../api/client';
import PageContainer from '../components/layout/PageContainer';
import Header from '../components/layout/Header';
import ChartContainer from '../components/dashboard/ChartContainer';
import DashboardFilters from '../components/filters/DashboardFilters';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import Plot from 'react-plotly.js';

export default function SalesAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [ready, setReady] = useState(false);
  
  const fetchData = async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const [regions, categories, segments, yearly] = await Promise.all([
        api.analytics.regions(currentFilters),
        api.analytics.categories(currentFilters),
        api.analytics.segments(currentFilters),
        api.analytics.yearly(currentFilters),
      ]);
      setData({ regions, categories, segments, yearly });
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
  
  if (!ready) return <LoadingState />;
  if (error && !data) return <ErrorState message={error} onRetry={() => fetchData(filters)} />;
  
  const renderBarChart = (items, xKey, yKey, title, color = '#3b82f6') => {
    if (!items || items.length === 0) return null;
    return (
      <Plot
        data={[
          {
            x: items.map(i => i[yKey]),
            y: items.map(i => i[xKey]),
            type: 'bar',
            orientation: 'h',
            marker: { color },
            hovertemplate: '%{y}<br>₹%{x:,.2f}<extra></extra>',
          }
        ]}
        layout={{
          margin: { l: 100, r: 30, t: 20, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: { gridcolor: '#f1f5f9', tickformat: ',.0f', tickprefix: '₹', tickfont: { size: 10, color: '#64748b' } },
          yaxis: { gridcolor: '#f1f5f9', tickfont: { size: 11, color: '#334155' } },
          bargap: 0.3,
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '300px' }}
        useResizeHandler={true}
      />
    );
  };
  
  return (
    <div>
      <Header title="Sales Analytics" subtitle="Detailed sales performance analysis across regions, categories, and time periods." />
      <PageContainer>
        <DashboardFilters filters={filters} onFilterChange={setFilters} onClearAll={() => setFilters({})} />
        
        {loading && <LoadingState message="Loading analytics..." />}
        
        {data && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ChartContainer title="Sales by Region" subtitle="Regional sales performance">
              {renderBarChart(data.regions?.regions, 'name', 'sales', 'Sales by Region', '#3b82f6')}
            </ChartContainer>
            
            <ChartContainer title="Sales by Category" subtitle="Category-wise sales breakdown">
              {renderBarChart(data.categories?.categories, 'name', 'sales', 'Sales by Category', '#10b981')}
            </ChartContainer>
            
            <ChartContainer title="Sales by Segment" subtitle="Customer segment analysis">
              {renderBarChart(data.segments?.segments, 'name', 'sales', 'Sales by Segment', '#f59e0b')}
            </ChartContainer>
            
            <ChartContainer title="Yearly Performance" subtitle="Annual sales comparison">
              {renderBarChart(data.yearly?.yearly, 'year', 'sales', 'Yearly Sales', '#8b5cf6')}
            </ChartContainer>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
