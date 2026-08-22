import Plot from 'react-plotly.js';
import ChartContainer from './ChartContainer';

export default function CategoryChart({ data, metric = 'sales' }) {
  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <ChartContainer title="Category Performance" subtitle="Sales by category">
        <div className="flex items-center justify-center h-[300px] text-slate-400">
          No data available
        </div>
      </ChartContainer>
    );
  }
  
  const categories = data.categories;
  const values = categories.map(c => c[metric]);
  const labels = categories.map(c => c.name);
  const colors = ['#3b82f6', '#10b981', '#f59e0b'];
  
  return (
    <ChartContainer title="Category Performance" subtitle={`${metric.charAt(0).toUpperCase() + metric.slice(1)} by category`}>
      <Plot
        data={[
          {
            labels: labels,
            values: values,
            type: 'pie',
            hole: 0.5,
            marker: { colors: colors.slice(0, labels.length) },
            hovertemplate: '%{label}<br>₹%{value:,.2f}<br>%{percent}<extra></extra>',
            textinfo: 'label+percent',
            textfont: { size: 12, color: '#334155' },
          }
        ]}
        layout={{
          margin: { l: 20, r: 20, t: 20, b: 20 },
          paper_bgcolor: 'transparent',
          showlegend: true,
          legend: {
            orientation: 'h',
            y: -0.1,
            x: 0.5,
            xanchor: 'center',
            font: { size: 11, color: '#64748b' },
          },
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '300px' }}
        useResizeHandler={true}
      />
    </ChartContainer>
  );
}
