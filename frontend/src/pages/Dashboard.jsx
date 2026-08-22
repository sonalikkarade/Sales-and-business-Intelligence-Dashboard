import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import KpiCard from '../components/dashboard/KpiCard';
import SalesTrendChart from '../components/dashboard/SalesTrendChart';
import ProfitTrendChart from '../components/dashboard/ProfitTrendChart';
import RegionChart from '../components/dashboard/RegionChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import ProductChart from '../components/dashboard/ProductChart';
import SalesProfitChart from '../components/dashboard/SalesProfitChart';
import ChartContainer from '../components/dashboard/ChartContainer';
import DashboardFilters from '../components/filters/DashboardFilters';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import PageContainer from '../components/layout/PageContainer';
import Header from '../components/layout/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, ShoppingCart, Package, Percent, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [trends, setTrends] = useState(null);
  const [regions, setRegions] = useState(null);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [filtersReady, setFiltersReady] = useState(false);

  const fetchData = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const [kpiData, trendData, regionData, categoryData, productData] = await Promise.all([
        api.dashboard.summary(currentFilters),
        api.dashboard.trends(currentFilters),
        api.analytics.regions(currentFilters),
        api.analytics.categories(currentFilters),
        api.analytics.products(currentFilters),
      ]);
      setKpis(kpiData);
      setTrends(trendData);
      setRegions(regionData);
      setCategories(categoryData);
      setProducts(productData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFiltersReady(true);
    }
  }, []);

  useEffect(() => {
    if (filtersReady) {
      fetchData(filters);
    }
  }, [filters, filtersReady, fetchData]);

  useEffect(() => {
    fetchData({});
    setFiltersReady(true);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearAll = () => {
    setFilters({});
  };

  if (!filtersReady) {
    return (
      <div>
        <Header
          title="Sales & Business Intelligence Dashboard"
          subtitle="Interactive analysis of sales performance, profitability and business trends."
        />
        <PageContainer>
          <LoadingState message="Initializing dashboard..." />
        </PageContainer>
      </div>
    );
  }

  if (error && !kpis) {
    return (
      <div>
        <Header
          title="Sales & Business Intelligence Dashboard"
          subtitle="Interactive analysis of sales performance, profitability and business trends."
        />
        <PageContainer>
          <ErrorState message={error} onRetry={() => fetchData(filters)} />
        </PageContainer>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Sales & Business Intelligence Dashboard"
        subtitle="Interactive analysis of sales performance, profitability and business trends."
      />
      <PageContainer>
        <div className="mb-6">
          <DashboardFilters filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <LoadingState message="Updating dashboard..." />
            </motion.div>
          )}
        </AnimatePresence>

        {kpis && !loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
              <KpiCard title="Total Sales" value={kpis.total_sales} metricType="currency" icon={DollarSign} color="blue" />
              <KpiCard title="Total Profit" value={kpis.total_profit} metricType="currency" icon={TrendingUp} color="green" />
              <KpiCard title="Total Orders" value={kpis.total_orders} metricType="number" icon={ShoppingCart} color="purple" />
              <KpiCard title="Total Quantity" value={kpis.total_quantity} metricType="number" icon={Package} color="orange" />
              <KpiCard title="Profit Margin" value={kpis.profit_margin} metricType="percentage" icon={Percent} color="teal" />
              <KpiCard title="Avg Order Value" value={kpis.average_order_value} metricType="currency" icon={BarChart3} color="rose" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <SalesTrendChart data={trends} />
              <ProfitTrendChart data={trends} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <RegionChart data={regions} metric="sales" />
              <RegionChart data={regions} metric="profit" />
              <CategoryChart data={categories} metric="sales" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <SalesProfitChart data={regions} />
              <div className="grid grid-cols-1 gap-6">
                <ProductChart data={products} type="top" />
              </div>
            </div>
          </>
        )}
      </PageContainer>
    </div>
  );
}
