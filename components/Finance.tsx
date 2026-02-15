import React, { useState } from 'react';
import { mockFinancials } from '../services/mockData';
import { Check, X, Filter, Download, DollarSign } from 'lucide-react';

const Finance: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financeiro & Suprimentos</h1>
          <p className="text-slate-500">Contas a pagar, receber e aprovações de compras.</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filtrar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50">
                <Download className="w-4 h-4" /> Exportar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-nexus-blue text-white rounded-lg text-sm hover:bg-blue-700 shadow-sm">
                <DollarSign className="w-4 h-4" /> Nova Transação
            </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase">Contas a Pagar (Out)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">R$ 452,000.00</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase">Aprovação Pendente (>5k)</p>
            <p className="text-2xl font-bold text-nexus-orange mt-1">3 Itens</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase">Posição de Caixa</p>
            <p className="text-2xl font-bold text-green-600 mt-1">R$ 1,205,000.00</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Descrição</th>
                        <th className="px-6 py-4">Projeto / Centro de Custo</th>
                        <th className="px-6 py-4">Vencimento</th>
                        <th className="px-6 py-4">Valor</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {mockFinancials.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4 font-medium text-slate-900">{item.description}</td>
                            <td className="px-6 py-4 text-slate-500">
                                <div className="text-slate-900">{item.project}</div>
                                <div className="text-xs text-slate-400">{item.costCenter}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{new Date(item.dueDate).toLocaleDateString('pt-BR')}</td>
                            <td className={`px-6 py-4 font-bold ${item.type === 'RECEIVABLE' ? 'text-green-600' : 'text-slate-900'}`}>
                                {item.type === 'RECEIVABLE' ? '+' : '-'} R$ {item.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    item.status === 'APPROVED' || item.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                                    item.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {item.status === 'PENDING' ? 'PENDENTE' : item.status === 'APPROVED' ? 'APROVADO' : 'PAGO'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                {item.status === 'PENDING' && item.type === 'PAYABLE' && (
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Aprovar">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="Rejeitar">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default Finance;