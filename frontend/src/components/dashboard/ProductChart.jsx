import Plot from 'react-plotly.js';
import ChartContainer from './ChartContainer';

export default function ProductChart({ data, type = 'top' }) {
  const products = type === 'top' ? data?.top_products : data?.bottom_products;
  
  if (!products || products.length === 0) {
    return (
      <ChartContainer title={type === 'top' ? 'Top Products' : 'Bottom Products'} subtitle="Product performance">
        <div className="flex items-center justify-center h-[300px] text-slate-400">
          No data available
        </div>
      </ChartContainer>
    );
  }
  
  const xValues = products.map(p => p.sales);
  const yValues = products.map(p => p.name.length > 30 ? p.name.substring(0, 30) + '...' : p.name);
  
  return (
    <ChartContainer title={type === 'top' ? 'Top Products' : 'Bottom Products'} subtitle="By sales performance">
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: 'bar',
            orientation: 'h',
            marker: { 
              color: type === 'top' ? 'rgba(37, 99, 235, 0.8)' : 'rgba(239, 68, 68, 0.8)',
            },
            hovertemplate: '%{y}<br>₹%{x:,.2f}<extra></extra>',
          }
        ]}
        layout={{
          margin: { l: 150, r: 30, t: 20, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: {
            gridcolor: '#f1f5f9',
            tickformat: ',.0f',
            tickprefix: '₹',
            tickfont: { size: 10, color: '#64748b' },
          },
          yaxis: {
            gridcolor: '#f1f5f9',
            tickfont: { size: 10, color: '#334155' },
          },
          bargap: 0.4,
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '300px' }}
        useResizeHandler={true}
      />
    </ChartContainer>
  );
}
