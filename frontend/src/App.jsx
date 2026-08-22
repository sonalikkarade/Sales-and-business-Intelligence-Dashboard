import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SalesAnalytics from './pages/SalesAnalytics';
import ProductAnalytics from './pages/ProductAnalytics';
import Insights from './pages/Insights';
import DataExplorer from './pages/DataExplorer';
import Sidebar from './components/layout/Sidebar';
import { useState } from 'react';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-[72px]' : 'ml-64'
        }`}
      >
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales-analytics" element={<SalesAnalytics />} />
            <Route path="/product-analytics" element={<ProductAnalytics />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/data-explorer" element={<DataExplorer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
