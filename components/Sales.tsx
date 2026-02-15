import React, { useState } from 'react';
import { mockUnits, mockLeads } from '../services/mockData';
import { UnitStatus, Unit, SaleLead } from '../types';
import { User, Phone, Mail, FileText } from 'lucide-react';

const UnitModal: React.FC<{ unit: Unit | null; onClose: () => void }> = ({ unit, onClose }) => {
    if (!unit) return null;

    const statusMap: Record<string, string> = {
        'AVAILABLE': 'DISPONÍVEL',
        'RESERVED': 'RESERVADO',
        'SOLD': 'VENDIDO'
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Unidade {unit.unitNumber}</h2>
                        <p className="text-slate-500">{unit.projectName} • Andar {unit.floor}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-900 text-2xl">×</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase">Área</span>
                        <p className="text-lg font-semibold">{unit.area} m²</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="text-xs text-slate-400 uppercase">Preço</span>
                        <p className="text-lg font-semibold text-nexus-blue">R$ {unit.price.toLocaleString()}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <span className={`inline-block w-full text-center py-2 rounded-md font-bold text-sm ${
                        unit.status === UnitStatus.AVAILABLE ? 'bg-green-100 text-green-700' :
                        unit.status === UnitStatus.RESERVED ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                        {statusMap[unit.status]}
                    </span>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 bg-nexus-blue text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Gerar Proposta
                    </button>
                    <button className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                        Ver Planta
                    </button>
                </div>
            </div>
        </div>
    );
};

const Sales: React.FC = () => {
  const [view, setView] = useState<'MIRROR' | 'PIPELINE'>('MIRROR');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const getStatusColor = (status: UnitStatus) => {
    switch (status) {
        case UnitStatus.AVAILABLE: return 'bg-green-500 hover:bg-green-600';
        case UnitStatus.RESERVED: return 'bg-yellow-400 hover:bg-yellow-500';
        case UnitStatus.SOLD: return 'bg-red-500 hover:bg-red-600';
        default: return 'bg-slate-300';
    }
  };

  const stageLabels: Record<string, string> = {
      'LEAD': 'Novo Lead',
      'VISIT': 'Visita Agendada',
      'PROPOSAL': 'Proposta Enviada',
      'CONTRACT': 'Contrato Assinado'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Comercial & Vendas</h1>
          <p className="text-slate-500">Espelho de vendas e funil de leads.</p>
        </div>
        <div className="bg-slate-100 p-1 rounded-lg flex">
            <button 
                onClick={() => setView('MIRROR')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'MIRROR' ? 'bg-white shadow-sm text-nexus-blue' : 'text-slate-500 hover:text-slate-900'}`}
            >
                Espelho de Vendas
            </button>
            <button 
                onClick={() => setView('PIPELINE')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'PIPELINE' ? 'bg-white shadow-sm text-nexus-blue' : 'text-slate-500 hover:text-slate-900'}`}
            >
                Funil de Vendas
            </button>
        </div>
      </div>

      {view === 'MIRROR' ? (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Disponível</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div> Reservado</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Vendido</div>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
                 {mockUnits.map(unit => (
                     <button 
                        key={unit.id}
                        onClick={() => setSelectedUnit(unit)}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-sm transition-transform hover:scale-105 ${getStatusColor(unit.status)}`}
                     >
                        <span className="text-lg">{unit.unitNumber}</span>
                        <span className="text-[10px] font-normal opacity-90">{unit.area}m²</span>
                     </button>
                 ))}
             </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {['LEAD', 'VISIT', 'PROPOSAL', 'CONTRACT'].map((stage) => (
                <div key={stage} className="bg-slate-50 rounded-xl p-4 min-w-[250px]">
                    <h3 className="text-sm font-bold text-slate-500 mb-4 flex justify-between uppercase">
                        {stageLabels[stage]} <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                            {mockLeads.filter(l => l.stage === stage).length}
                        </span>
                    </h3>
                    <div className="space-y-3">
                        {mockLeads.filter(l => l.stage === stage).map(lead => (
                            <div key={lead.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md cursor-pointer transition-shadow">
                                <h4 className="font-semibold text-slate-900 mb-1">{lead.name}</h4>
                                <p className="text-xs text-nexus-blue font-medium mb-2">{lead.interest}</p>
                                <p className="text-sm font-bold text-slate-700 mb-3">R$ {lead.value.toLocaleString()}</p>
                                <div className="flex justify-end gap-2 border-t border-slate-50 pt-2">
                                    <button className="text-slate-400 hover:text-nexus-blue"><Phone className="w-4 h-4" /></button>
                                    <button className="text-slate-400 hover:text-nexus-blue"><Mail className="w-4 h-4" /></button>
                                    <button className="text-slate-400 hover:text-nexus-blue"><FileText className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      )}

      <UnitModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
    </div>
  );
};

export default Sales;