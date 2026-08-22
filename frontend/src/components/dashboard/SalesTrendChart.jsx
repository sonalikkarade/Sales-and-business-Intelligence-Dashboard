import Plot from 'react-plotly.js';
import ChartContainer from './ChartContainer';

export default function SalesTrendChart({ data }) {
  if (!data || !data.trends || data.trends.length === 0) {
    return (
      <ChartContainer title="Sales Trend" subtitle="Monthly sales over time">
        <div className="flex items-center justify-center h-[300px] text-slate-400">
          No data available
        </div>
      </ChartContainer>
    );
  }
  
  const trends = data.trends;
  const xValues = trends.map(t => t.label);
  const yValues = trends.map(t => t.sales);
  
  return (
    <ChartContainer title="Sales Trend" subtitle="Monthly sales over time">
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#2563eb', width: 3, shape: 'spline' },
            marker: { size: 6, color: '#2563eb' },
            fill: 'tozeroy',
            fillcolor: 'rgba(37, 99, 235, 0.1)',
            hovertemplate: '%{x}<br>Sales: ₹%{y:,.2f}<extra></extra>',
          }
        ]}
        layout={{
          margin: { l: 60, r: 30, t: 20, b: 60 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: {
            gridcolor: '#f1f5f9',
            tickangle: -45,
            tickfont: { size: 11, color: '#64748b' },
          },
          yaxis: {
            gridcolor: '#f1f5f9',
            tickformat: ',.0f',
            tickprefix: '₹',
            tickfont: { size: 11, color: '#64748b' },
          },
          hovermode: 'x unified',
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '300px' }}
        useResizeHandler={true}
      />
    </ChartContainer>
  );
}
