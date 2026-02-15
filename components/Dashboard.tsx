import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, AlertTriangle, DollarSign, HardHat, TrendingUp } from 'lucide-react';
import { MOCK_CHART_DATA } from '../constants';

const KPICard: React.FC<{ title: string; value: string; trend?: string; icon: React.ElementType; alert?: boolean }> = ({ title, value, trend, icon: Icon, alert }) => (
  <div className={`p-6 rounded-xl border ${alert ? 'border-orange-200 bg-orange-50' : 'border-slate-100 bg-white'} shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${alert ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Painel Executivo</h1>
        <p className="text-slate-500">Visão geral em tempo real das operações da Construtora Alpha.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="VGV Total (Valor de Venda)" value="R$ 142.5M" trend="+12%" icon={DollarSign} />
        <KPICard title="Desempenho de Custo" value="94.2%" trend="Dentro do Orçamento" icon={TrendingUp} />
        <KPICard title="Unidades Vendidas (Mês)" value="24" trend="+4" icon={HardHat} />
        <KPICard title="Dias Sem Acidentes" value="142 Dias" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Fluxo de Caixa: Previsto vs Realizado</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0056b3" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0056b3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="projected" stroke="#64748b" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={2} name="Previsto" />
                <Area type="monotone" dataKey="actual" stroke="#0056b3" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} name="Realizado" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-nexus-orange mr-2" />
            Alertas Urgentes
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Entrega de Cimento Atrasada', project: 'Residencial Horizon', time: '2h atrás', level: 'high' },
              { title: 'Aprovação de Fatura Pendente', project: 'Edifício Titan', time: '4h atrás', level: 'medium' },
              { title: 'Alerta Climático: Chuva Forte', project: 'Todas as Obras', time: '6h atrás', level: 'medium' },
              { title: 'Inspeção de Segurança', project: 'Galpão Alpha', time: '1d atrás', level: 'low' },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-start p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  alert.level === 'high' ? 'bg-red-500' : alert.level === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{alert.title}</h4>
                  <p className="text-xs text-slate-500">{alert.project} • {alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-nexus-blue font-medium border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
            Ver Todas Notificações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;