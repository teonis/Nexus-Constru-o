import React, { useState } from 'react';
import { LayoutDashboard, Building2, HardHat, DollarSign, Users, PieChart, Menu, Bell, Search, Settings, LogOut } from 'lucide-react';
import { ViewState } from '../types';
import { COMPANY_NAME, APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.PROJECTS, label: 'Obras & Projetos', icon: Building2 },
    { id: ViewState.FINANCE, label: 'Financeiro', icon: DollarSign },
    { id: ViewState.SALES, label: 'Comercial & CRM', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-nexus-dark text-white fixed h-full z-30 transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-700/50">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-nexus-blue rounded-lg flex items-center justify-center font-bold text-lg">N</div>
               <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-nexus-blue rounded-lg flex items-center justify-center font-bold text-lg">N</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors group ${
                currentView === item.id 
                ? 'bg-nexus-blue text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile Summary */}
        <div className="p-4 border-t border-slate-700/50">
          <div className={`flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
              JD
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">João Diretor</p>
                <p className="text-xs text-slate-400 truncate">{COMPANY_NAME}</p>
              </div>
            )}
            {sidebarOpen && <LogOut className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar obras, faturas ou unidades..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nexus-blue/20 transition-all"
                />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-nexus-orange rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;