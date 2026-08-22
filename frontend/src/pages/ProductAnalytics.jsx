import { useState, useEffect } from 'react';
import { api } from '../api/client';
import PageContainer from '../components/layout/PageContainer';
import Header from '../components/layout/Header';
import ChartContainer from '../components/dashboard/ChartContainer';
import DashboardFilters from '../components/filters/DashboardFilters';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import Plot from 'react-plotly.js';

export default function ProductAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [ready, setReady] = useState(false);
  
  const fetchData = async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const [products, categories] = await Promise.all([
        api.analytics.products(currentFilters),
        api.analytics.categories(currentFilters),
      ]);
      setData({ products, categories });
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
  
  const renderProductBar = (items, color) => {
    if (!items || items.length === 0) return null;
    return (
      <Plot
        data={[
          {
            x: items.map(i => i.sales),
            y: items.map(i => i.name.length > 25 ? i.name.substring(0, 25) + '...' : i.name),
            type: 'bar',
            orientation: 'h',
            marker: { color },
            hovertemplate: '%{y}<br>Sales: ₹%{x:,.2f}<br>Profit: ₹%{customdata[0]:,.2f}<extra></extra>',
            customdata: items.map(i => i.profit),
          }
        ]}
        layout={{
          margin: { l: 150, r: 30, t: 20, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: { gridcolor: '#f1f5f9', tickformat: ',.0f', tickprefix: '₹', tickfont: { size: 10, color: '#64748b' } },
          yaxis: { gridcolor: '#f1f5f9', tickfont: { size: 10, color: '#334155' } },
          bargap: 0.4,
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '350px' }}
        useResizeHandler={true}
      />
    );
  };
  
  return (
    <div>
      <Header title="Product Analytics" subtitle="Deep dive into product performance, profitability, and category analysis." />
      <PageContainer>
        <DashboardFilters filters={filters} onFilterChange={setFilters} onClearAll={() => setFilters({})} />
        
        {loading && <LoadingState message="Loading product analytics..." />}
        
        {data && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ChartContainer title="Top 10 Products" subtitle="By sales revenue">
              {renderProductBar(data.products?.top_products, '#3b82f6')}
            </ChartContainer>
            
            <ChartContainer title="Bottom 10 Products" subtitle="By sales revenue">
              {renderProductBar(data.products?.bottom_products, '#ef4444')}
            </ChartContainer>
            
            <ChartContainer title="Sales vs Profit by Category" subtitle="Comparative category performance">
              {data.categories?.categories && data.categories.categories.length > 0 && (
                <Plot
                  data={[
                    {
                      x: data.categories.categories.map(c => c.name),
                      y: data.categories.categories.map(c => c.sales),
                      name: 'Sales',
                      type: 'bar',
                      marker: { color: '#3b82f6' },
                    },
                    {
                      x: data.categories.categories.map(c => c.name),
                      y: data.categories.categories.map(c => c.profit),
                      name: 'Profit',
                      type: 'bar',
                      marker: { color: '#10b981' },
                    }
                  ]}
                  layout={{
                    barmode: 'group',
                    margin: { l: 60, r: 30, t: 20, b: 40 },
                    paper_bgcolor: 'transparent',
                    plot_bgcolor: 'transparent',
                    xaxis: { gridcolor: '#f1f5f9', tickfont: { size: 11, color: '#64748b' } },
                    yaxis: { gridcolor: '#f1f5f9', tickformat: ',.0f', tickprefix: '₹', tickfont: { size: 11, color: '#64748b' } },
                    legend: { orientation: 'h', y: -0.15, x: 0.5, xanchor: 'center', font: { size: 11, color: '#64748b' } },
                    bargap: 0.3,
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  style={{ width: '100%', height: '300px' }}
                  useResizeHandler={true}
                />
              )}
            </ChartContainer>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
