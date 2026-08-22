import { Bell, Search, User, Settings, ChevronRight, Home } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const routeTitles = {
  '/': 'Dashboard',
  '/sales-analytics': 'Sales Analytics',
  '/product-analytics': 'Product Analytics',
  '/insights': 'Insights',
  '/data-explorer': 'Data Explorer',
};

export default function Header({ title, subtitle }) {
  const location = useLocation();
  const currentTitle = title || routeTitles[location.pathname] || 'Dashboard';
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-6 lg:px-8 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
            <Home className="w-3.5 h-3.5" />
            <ChevronRight className="w-3 h-3" />
            {pathSegments.length > 0 ? (
              <>
                <span className="capitalize">{pathSegments[0].replace(/-/g, ' ')}</span>
                {pathSegments.length > 1 && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="capitalize">{pathSegments.slice(1).join(' ')}</span>
                  </>
                )}
              </>
            ) : (
              <span>Dashboard</span>
            )}
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-200" />
          <div>
            <h1 className="text-base font-semibold text-slate-900 tracking-tight">{currentTitle}</h1>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-9 pr-4 py-2 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 w-64 transition-all duration-200"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
              ⌘K
            </kbd>
          </div>

          <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors group">
            <Bell className="w-[18px] h-[18px] text-slate-500 group-hover:text-slate-700 transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors group">
            <Settings className="w-[18px] h-[18px] text-slate-500 group-hover:text-slate-700 transition-colors" />
          </button>

          <div className="hidden md:flex items-center gap-3 pl-3 ml-1 border-l border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-900 leading-tight">Administrator</p>
              <p className="text-[11px] text-slate-500 leading-tight">admin@salesbi.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
