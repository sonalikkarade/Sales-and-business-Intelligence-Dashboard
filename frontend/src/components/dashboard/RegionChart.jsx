import Plot from 'react-plotly.js';
import ChartContainer from './ChartContainer';

export default function RegionChart({ data, metric = 'sales' }) {
  if (!data || !data.regions || data.regions.length === 0) {
    return (
      <ChartContainer title="Regional Analysis" subtitle="Performance by region">
        <div className="flex items-center justify-center h-[300px] text-slate-400">
          No data available
        </div>
      </ChartContainer>
    );
  }
  
  const regions = data.regions;
  const xValues = regions.map(r => r.name);
  const yValues = regions.map(r => r[metric]);
  const colors = regions.map((_, i) => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]);
  
  return (
    <ChartContainer title="Regional Analysis" subtitle={`${metric.charAt(0).toUpperCase() + metric.slice(1)} by region`}>
      <Plot
        data={[
          {
            x: yValues,
            y: xValues,
            type: 'bar',
            orientation: 'h',
            marker: { color: colors },
            hovertemplate: '%{y}<br>₹%{x:,.2f}<extra></extra>',
          }
        ]}
        layout={{
          margin: { l: 80, r: 30, t: 20, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: {
            gridcolor: '#f1f5f9',
            tickformat: ',.0f',
            tickprefix: '₹',
            tickfont: { size: 11, color: '#64748b' },
          },
          yaxis: {
            gridcolor: '#f1f5f9',
            tickfont: { size: 12, color: '#334155' },
          },
          bargap: 0.3,
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '300px' }}
        useResizeHandler={true}
      />
    </ChartContainer>
  );
}
