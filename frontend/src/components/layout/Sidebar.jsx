import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Lightbulb,
  Table2,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sales-analytics', label: 'Sales Analytics', icon: TrendingUp },
  { path: '/product-analytics', label: 'Product Analytics', icon: Package },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
  { path: '/data-explorer', label: 'Data Explorer', icon: Table2 },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200/80 z-40 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BarChart3 className="w-4 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-base tracking-tight">Sales BI</span>
            </motion.div>
          )}
          <button
            onClick={onToggle}
            className={`p-2 hover:bg-slate-100 rounded-lg transition-colors ${
              collapsed ? 'mx-auto' : ''
            }`}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive
                    ? 'text-blue-700 bg-blue-50/80 shadow-sm shadow-blue-500/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={`text-[11px] text-slate-400 font-medium ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? 'v1.0' : 'Sales BI Platform v1.0'}
          </div>
        </div>
      </div>
    </aside>
  );
}
