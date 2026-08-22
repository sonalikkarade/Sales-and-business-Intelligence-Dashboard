import Plot from 'react-plotly.js';
import ChartContainer from './ChartContainer';

export default function SalesProfitChart({ data }) {
  if (!data || !data.regions || data.regions.length === 0) {
    return (
      <ChartContainer title="Sales vs Profit" subtitle="Comparative analysis">
        <div className="flex items-center justify-center h-[300px] text-slate-400">
          No data available
        </div>
      </ChartContainer>
    );
  }
  
  const regions = data.regions;
  
  return (
    <ChartContainer title="Sales vs Profit" subtitle="Comparative analysis by region">
      <Plot
        data={[
          {
            x: regions.map(r => r.name),
            y: regions.map(r => r.sales),
            name: 'Sales',
            type: 'bar',
            marker: { color: '#3b82f6' },
            hovertemplate: '%{x}<br>Sales: ₹%{y:,.2f}<extra></extra>',
          },
          {
            x: regions.map(r => r.name),
            y: regions.map(r => r.profit),
            name: 'Profit',
            type: 'bar',
            marker: { color: '#10b981' },
            hovertemplate: '%{x}<br>Profit: ₹%{y:,.2f}<extra></extra>',
          }
        ]}
        layout={{
          barmode: 'group',
          margin: { l: 60, r: 30, t: 20, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          xaxis: {
            gridcolor: '#f1f5f9',
            tickfont: { size: 11, color: '#64748b' },
          },
          yaxis: {
            gridcolor: '#f1f5f9',
            tickformat: ',.0f',
            tickprefix: '₹',
            tickfont: { size: 11, color: '#64748b' },
          },
          legend: {
            orientation: 'h',
            y: -0.15,
            x: 0.5,
            xanchor: 'center',
            font: { size: 11, color: '#64748b' },
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
