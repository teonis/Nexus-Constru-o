import React, { useState, useMemo } from 'react';
import { mockFinancials, mockProjects } from '../services/mockData';
import { FinancialRecord, FinancialCategory } from '../types';
import { 
  Check, X, Filter, Download, DollarSign, Plus, 
  TrendingUp, TrendingDown, Wallet, MoreHorizontal, FileText 
} from 'lucide-react';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- Colors & Constants ---
const COLORS = {
  income: '#10b981', // Emerald 500
  expense: '#ef4444', // Red 500
  balance: '#0056b3', // Nexus Blue
  pie: ['#0056b3', '#0ea5e9', '#64748b', '#f59e0b', '#ef4444', '#8b5cf6']
};

// --- Components ---

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    PENDING: 'bg-orange-100 text-orange-700 border-orange-200',
    APPROVED: 'bg-blue-100 text-blue-700 border-blue-200',
    PAID: 'bg-green-100 text-green-700 border-green-200'
  };
  const labels: Record<string, string> = {
    PENDING: 'PENDENTE',
    APPROVED: 'APROVADO',
    PAID: 'PAGO'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-gray-100'}`}>
      {labels[status] || status}
    </span>
  );
};

const CategoryTag: React.FC<{ category: string }> = ({ category }) => {
  const colorMap: Record<string, string> = {
    MATERIAL: 'bg-slate-100 text-slate-700',
    LABOR: 'bg-blue-50 text-blue-700',
    EQUIPMENT: 'bg-orange-50 text-orange-700',
    ADMIN: 'bg-purple-50 text-purple-700',
    TAXES: 'bg-red-50 text-red-700',
    SALES: 'bg-green-50 text-green-700',
    OTHER: 'bg-gray-50 text-gray-700'
  };

  const labelMap: Record<string, string> = {
    MATERIAL: 'Material',
    LABOR: 'Mão de Obra',
    EQUIPMENT: 'Equipamentos',
    ADMIN: 'Administrativo',
    TAXES: 'Impostos',
    SALES: 'Vendas',
    OTHER: 'Outros'
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colorMap[category] || colorMap.OTHER}`}>
      {labelMap[category] || category}
    </span>
  );
};

const NewTransactionModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (record: Partial<FinancialRecord>) => void; 
}> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Simulate formatting data
    const newRecord: Partial<FinancialRecord> = {
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      type: formData.get('type') as 'PAYABLE' | 'RECEIVABLE',
      project: formData.get('project') as string,
      category: formData.get('category') as FinancialCategory,
      dueDate: formData.get('date') as string,
      costCenter: formData.get('costCenter') as string,
      status: 'PENDING'
    };
    
    onSave(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Nova Transação</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X className="w-6 h-6"/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                <select name="type" className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                   <option value="PAYABLE">Despesa (Saída)</option>
                   <option value="RECEIVABLE">Receita (Entrada)</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data Vencimento</label>
                <input type="date" name="date" required className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
             <input name="description" required placeholder="Ex: Compra de Cimento" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
                <input name="amount" type="number" step="0.01" required className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                <select name="category" className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                   <option value="MATERIAL">Material</option>
                   <option value="LABOR">Mão de Obra</option>
                   <option value="EQUIPMENT">Equipamentos</option>
                   <option value="ADMIN">Administrativo</option>
                   <option value="TAXES">Impostos</option>
                   <option value="SALES">Vendas</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Projeto</label>
                <select name="project" className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                   {mockProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                   <option value="Escritório Central">Escritório Central</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Centro de Custo</label>
                <input name="costCenter" placeholder="Ex: Fundação" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
             </div>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-slate-400 text-sm hover:bg-slate-50 cursor-pointer">
              <Plus className="w-4 h-4 mx-auto mb-1"/>
              Anexar Comprovante / NF
          </div>

          <div className="pt-4 flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancelar</button>
             <button type="submit" className="flex-1 py-2 bg-nexus-blue text-white font-bold rounded-lg hover:bg-blue-700">Salvar Transação</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Component ---

const Finance: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'ALL' | 'PAYABLE' | 'RECEIVABLE' | 'PENDING' | 'APPROVED'>('ALL');
  const [transactions, setTransactions] = useState<FinancialRecord[]>(mockFinancials);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesProject = selectedProject === 'ALL' || t.project === selectedProject;
      const matchesTab = 
        activeTab === 'ALL' ? true :
        activeTab === 'PAYABLE' ? t.type === 'PAYABLE' :
        activeTab === 'RECEIVABLE' ? t.type === 'RECEIVABLE' :
        activeTab === 'PENDING' ? t.status === 'PENDING' :
        activeTab === 'APPROVED' ? t.status === 'APPROVED' : true;
      
      return matchesProject && matchesTab;
    });
  }, [selectedProject, activeTab, transactions]);

  // KPI Calculations
  const kpis = useMemo(() => {
    const projectTrans = selectedProject === 'ALL' 
      ? transactions 
      : transactions.filter(t => t.project === selectedProject);
    
    const income = projectTrans.filter(t => t.type === 'RECEIVABLE').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = projectTrans.filter(t => t.type === 'PAYABLE').reduce((acc, curr) => acc + curr.amount, 0);
    const balance = income - expense;
    const pending = projectTrans.filter(t => t.status === 'PENDING' && t.type === 'PAYABLE').length;

    return { income, expense, balance, pending };
  }, [selectedProject, transactions]);

  // Chart Data Preparation
  const chartData = useMemo(() => {
    const data: any[] = [];
    const months = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    months.forEach(month => {
       // Mock distribution logic just for visualization (since mock dates are strings)
       // In a real app, use dayjs/date-fns to group by month properly
       const randomFactor = selectedProject === 'ALL' ? 1 : 0.4; // Scale down for single project
       const inc = Math.floor((Math.random() * 50000 + 20000) * randomFactor);
       const exp = Math.floor((Math.random() * 40000 + 15000) * randomFactor);
       data.push({
         name: month,
         Entradas: inc,
         Saídas: exp,
         Saldo: inc - exp
       });
    });
    return data;
  }, [selectedProject]);

  const pieData = useMemo(() => {
    const projectTrans = selectedProject === 'ALL' ? transactions : transactions.filter(t => t.project === selectedProject);
    const expenses = projectTrans.filter(t => t.type === 'PAYABLE');
    
    const categories: Record<string, number> = {};
    expenses.forEach(t => {
       categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return Object.keys(categories).map(key => ({
       name: key,
       value: categories[key]
    }));
  }, [selectedProject, transactions]);

  // Actions
  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'APPROVED' } : t));
  };

  const handleAddTransaction = (newRecord: Partial<FinancialRecord>) => {
    const record: FinancialRecord = {
       id: Math.random().toString(36).substr(2, 9),
       ...newRecord as FinancialRecord
    };
    setTransactions([record, ...transactions]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
       {/* --- Top Bar: Master Filter & Actions --- */}
       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4 w-full lg:w-auto">
             <div className="p-2 bg-nexus-blue/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-nexus-blue" />
             </div>
             <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Gestão Financeira</h1>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Visualizando:</span>
                   <select 
                      value={selectedProject} 
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="bg-slate-50 border-none text-sm font-bold text-slate-900 focus:ring-0 cursor-pointer hover:text-nexus-blue transition-colors"
                   >
                      <option value="ALL">Todas as Obras (Global)</option>
                      {mockProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      <option value="Escritório Central">Escritório Central</option>
                   </select>
                </div>
             </div>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-nexus-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all active:scale-95"
              >
                  <Plus className="w-4 h-4" /> Nova Transação
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50">
                  <Download className="w-4 h-4" />
              </button>
          </div>
       </div>

      {/* --- KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Wallet className="w-16 h-16 text-nexus-blue" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo em Caixa</p>
            <p className={`text-2xl font-bold mt-1 ${kpis.balance >= 0 ? 'text-nexus-blue' : 'text-red-600'}`}>
               R$ {kpis.balance.toLocaleString()}
            </p>
            <div className="flex items-center mt-2 text-xs text-slate-500">
               <span className="bg-slate-100 px-2 py-0.5 rounded-full mr-2">Atualizado hoje</span>
            </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Entradas (Mês)</p>
               <div className="p-1.5 bg-green-50 rounded-full"><TrendingUp className="w-4 h-4 text-green-600"/></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">R$ {kpis.income.toLocaleString()}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saídas (Mês)</p>
               <div className="p-1.5 bg-red-50 rounded-full"><TrendingDown className="w-4 h-4 text-red-600"/></div>
            </div>
            <p className="text-2xl font-bold text-slate-900">R$ {kpis.expense.toLocaleString()}</p>
            {kpis.pending > 0 && (
               <p className="text-xs text-orange-600 mt-2 font-medium flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1 animate-pulse"></span>
                  {kpis.pending} pagamentos pendentes
               </p>
            )}
        </div>
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Monthly Cash Flow */}
         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6">Fluxo de Caixa Mensal</h3>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `k${val/1000}`} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                     />
                     <Legend verticalAlign="top" height={36} iconType="circle" />
                     <Bar dataKey="Entradas" stackId="a" fill={COLORS.income} barSize={32} radius={[0, 0, 4, 4]} />
                     <Bar dataKey="Saídas" stackId="a" fill={COLORS.expense} barSize={32} radius={[4, 4, 0, 0]} />
                     <Line type="monotone" dataKey="Saldo" stroke={COLORS.balance} strokeWidth={3} dot={{r: 4, fill: COLORS.balance, strokeWidth: 2, stroke: '#fff'}} />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Cost Breakdown */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-slate-900 mb-2">Breakdown de Custos</h3>
            <div className="flex-1 min-h-[250px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS.pie[index % COLORS.pie.length]} />
                        ))}
                     </Pie>
                     <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                     <p className="text-xs text-slate-400 font-medium">Total Despesas</p>
                     <p className="text-lg font-bold text-slate-900">R$ {kpis.expense.toLocaleString()}</p>
                  </div>
               </div>
            </div>
            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
               {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center text-xs text-slate-600">
                     <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS.pie[index % COLORS.pie.length] }}></div>
                     <span className="truncate">{entry.name}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- Transaction Table --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
             {[
               { id: 'ALL', label: 'Todas Transações' },
               { id: 'PAYABLE', label: 'A Pagar' },
               { id: 'RECEIVABLE', label: 'A Receber' },
               { id: 'PENDING', label: 'Pendentes' },
               { id: 'APPROVED', label: 'Aprovados' },
             ].map(tab => (
               <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                     activeTab === tab.id 
                     ? 'border-nexus-blue text-nexus-blue bg-blue-50/50' 
                     : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
               >
                  {tab.label}
               </button>
             ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Descrição</th>
                        <th className="px-6 py-4">Categoria / Centro</th>
                        <th className="px-6 py-4">Projeto</th>
                        <th className="px-6 py-4">Valor</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.length > 0 ? filteredTransactions.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-slate-900">{item.description}</div>
                                <div className="text-xs text-slate-400 lg:hidden">{item.project}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col items-start gap-1">
                                   <CategoryTag category={item.category} />
                                   <span className="text-xs text-slate-400">{item.costCenter}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{item.project}</td>
                            <td className={`px-6 py-4 font-bold whitespace-nowrap ${item.type === 'RECEIVABLE' ? 'text-green-600' : 'text-slate-900'}`}>
                                {item.type === 'RECEIVABLE' ? '+' : '-'} R$ {item.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={item.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2">
                                    {item.status === 'PENDING' && item.type === 'PAYABLE' && (
                                        <button 
                                            onClick={() => handleApprove(item.id)}
                                            className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded hover:bg-green-100 transition-colors border border-green-200"
                                        >
                                            <Check className="w-3 h-3" /> Aprovar
                                        </button>
                                    )}
                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                           <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                              <div className="flex flex-col items-center justify-center">
                                 <FileText className="w-10 h-10 mb-2 opacity-20" />
                                 <p>Nenhuma transação encontrada para este filtro.</p>
                              </div>
                           </td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
      </div>

      <NewTransactionModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         onSave={handleAddTransaction}
      />
    </div>
  );
};

export default Finance;