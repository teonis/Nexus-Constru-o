import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Camera, MessageSquare, MoreVertical, 
  Hammer, HardHat, Sun, Cloud, CloudRain, Ruler, ArrowRight,
  CheckCircle2, Clock, AlertCircle, FileText, ChevronLeft
} from 'lucide-react';
import { mockProjects, mockMeasurements } from '../services/mockData';
import { Project, ProjectStage, Measurement } from '../types';

// --- Sub-components for Tabs ---

const ScheduleTab: React.FC<{ project: Project }> = ({ project }) => {
  // Mock stages locally for the visual demo
  const stages: ProjectStage[] = [
    { name: 'Fundação & Estacas', status: 'DONE', start: '15/01/2023', end: '15/03/2023', progress: 100 },
    { name: 'Estrutura Nível 1-5', status: 'DONE', start: '16/03/2023', end: '20/06/2023', progress: 100 },
    { name: 'Estrutura Nível 6-12', status: 'IN_PROGRESS', start: '21/06/2023', end: '30/11/2023', progress: 65 },
    { name: 'Alvenaria & Drywall', status: 'IN_PROGRESS', start: '15/08/2023', end: '20/12/2023', progress: 40 },
    { name: 'Instalações MEP', status: 'PENDING', start: '01/10/2023', end: '15/02/2024', progress: 10 },
    { name: 'Acabamento', status: 'PENDING', start: '10/01/2024', end: '30/05/2024', progress: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DONE': return 'bg-green-100 text-green-700';
      case 'IN_PROGRESS': return 'bg-blue-100 text-nexus-blue';
      case 'DELAYED': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">Cronograma Físico</h3>
        <button className="text-sm text-nexus-blue hover:underline">Baixar Gantt Completo</button>
      </div>

      <div className="space-y-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-slate-900">{stage.name}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {stage.start} → {stage.end}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(stage.status)}`}>
                {stage.status === 'DONE' ? 'Concluído' : stage.status === 'IN_PROGRESS' ? 'Em Execução' : 'Pendente'}
              </span>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between text-xs">
                 <span className="font-semibold text-slate-600">{stage.progress}% Concluído</span>
              </div>
              <div className="overflow-hidden h-2.5 mb-2 text-xs flex rounded-full bg-slate-100">
                <div 
                  style={{ width: `${stage.progress}%` }} 
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    stage.status === 'DONE' ? 'bg-green-500' : 'bg-nexus-blue'
                  } transition-all duration-1000`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DiaryTab: React.FC = () => {
  const [weather, setWeather] = useState<string>('sunny');
  const [labor, setLabor] = useState({
    mason: 12,
    helper: 8,
    carpenter: 4,
    electrician: 2
  });
  const [logText, setLogText] = useState('');

  const updateLabor = (role: keyof typeof labor, delta: number) => {
    setLabor(prev => ({ ...prev, [role]: Math.max(0, prev[role] + delta) }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
      {/* Left Column: Controls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Weather Control */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Condições Climáticas (Manhã/Tarde)</h3>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setWeather('sunny')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${weather === 'sunny' ? 'border-nexus-orange bg-orange-50 text-nexus-orange' : 'border-slate-100 hover:bg-slate-50 text-slate-400'}`}
            >
              <Sun className="w-8 h-8 mb-2" />
              <span className="font-medium">Ensolarado</span>
            </button>
            <button 
              onClick={() => setWeather('cloudy')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${weather === 'cloudy' ? 'border-slate-400 bg-slate-100 text-slate-600' : 'border-slate-100 hover:bg-slate-50 text-slate-400'}`}
            >
              <Cloud className="w-8 h-8 mb-2" />
              <span className="font-medium">Nublado</span>
            </button>
            <button 
              onClick={() => setWeather('rainy')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${weather === 'rainy' ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-slate-100 hover:bg-slate-50 text-slate-400'}`}
            >
              <CloudRain className="w-8 h-8 mb-2" />
              <span className="font-medium">Chuvoso</span>
            </button>
          </div>
        </div>

        {/* Labor Control */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Controle de Efetivo (Presença)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'mason', label: 'Pedreiros', icon: Hammer },
              { id: 'helper', label: 'Serventes', icon: HardHat },
              { id: 'carpenter', label: 'Carpinteiros', icon: MoreVertical }, // Using placeholder icon
              { id: 'electrician', label: 'Eletricistas', icon: Users },
            ].map((role) => (
              <div key={role.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                 <role.icon className="w-5 h-5 text-slate-400 mb-2"/>
                 <span className="text-xs font-bold text-slate-500 uppercase mb-2">{role.label}</span>
                 <div className="flex items-center gap-3">
                   <button 
                    onClick={() => updateLabor(role.id as any, -1)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100"
                   >-</button>
                   <span className="text-xl font-bold text-slate-900 w-6 text-center">{labor[role.id as keyof typeof labor]}</span>
                   <button 
                    onClick={() => updateLabor(role.id as any, 1)}
                    className="w-8 h-8 rounded-full bg-nexus-blue text-white flex items-center justify-center hover:bg-blue-700 shadow-sm"
                   >+</button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Log Entry */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <textarea 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-nexus-blue/20 outline-none text-sm"
            rows={3}
            placeholder="Descreva as atividades de hoje, impedimentos ou observações..."
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
           ></textarea>
           <div className="flex justify-between items-center mt-3">
              <button className="flex items-center gap-2 text-slate-500 hover:text-nexus-blue text-sm font-medium">
                 <Camera className="w-4 h-4" /> Adicionar Fotos
              </button>
              <button className="bg-nexus-blue text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all">
                 Registrar Diário
              </button>
           </div>
        </div>
      </div>

      {/* Right Column: Timeline Feed */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full overflow-hidden flex flex-col">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Linha do Tempo</h3>
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
             {[1, 2, 3].map((i) => (
               <div key={i} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:pb-0 last:border-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
                  <div className="mb-1 flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-900">João Eng.</span>
                     <span className="text-[10px] text-slate-400">10:3{i} AM</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                     {i === 1 ? 'Concretagem iniciada no setor B. Caminhões chegaram no horário.' : 
                      i === 2 ? 'Visita da segurança do trabalho. Tudo ok.' : 'Reunião com empreiteiros de elétrica.'}
                  </p>
                  {i === 1 && (
                    <div className="w-full h-24 bg-slate-100 rounded-lg mt-2"></div>
                  )}
               </div>
             ))}
          </div>
      </div>
    </div>
  );
};

const MeasurementsTab: React.FC = () => {
  // Local state to handle measuring inputs
  const [measurements, setMeasurements] = useState<{
    data: Measurement[],
    inputs: Record<string, number> 
  }>({
    data: mockMeasurements,
    inputs: {}
  });

  const handleInputChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMeasurements(prev => ({
      ...prev,
      inputs: { ...prev.inputs, [id]: numValue }
    }));
  };

  const calculateBalance = (m: Measurement) => {
    const currentInput = measurements.inputs[m.id] || 0;
    return m.totalContract - m.executedPrevious - currentInput;
  };

  const handleGeneratePayment = () => {
    alert("Medições enviadas para o financeiro com sucesso! (Simulação)");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-lg font-bold text-slate-900">Controle de Empreiteiros</h3>
           <p className="text-sm text-slate-500">Insira a produção do período para gerar pagamentos.</p>
        </div>
        <button 
          onClick={handleGeneratePayment}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 shadow-sm flex items-center gap-2"
        >
           <CheckCircle2 className="w-4 h-4" /> Gerar Pagamento
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Empreiteiro / Serviço</th>
                <th className="px-6 py-4 text-center">Unid.</th>
                <th className="px-6 py-4 text-right">Contrato Total</th>
                <th className="px-6 py-4 text-right">Exec. Anterior</th>
                <th className="px-6 py-4 text-right w-32 bg-blue-50/50">Exec. Atual</th>
                <th className="px-6 py-4 text-right">Saldo</th>
                <th className="px-6 py-4 text-right">A Pagar (Est.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {measurements.data.map((m) => {
                 const current = measurements.inputs[m.id] || 0;
                 const balance = calculateBalance(m);
                 const estPayment = current * m.unitPrice;

                 return (
                   <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{m.contractor}</div>
                        <div className="text-xs text-slate-500">{m.service}</div>
                     </td>
                     <td className="px-6 py-4 text-center text-slate-500 font-medium">{m.unit}</td>
                     <td className="px-6 py-4 text-right font-medium">{m.totalContract.toLocaleString()}</td>
                     <td className="px-6 py-4 text-right text-slate-500">{m.executedPrevious.toLocaleString()}</td>
                     <td className="px-6 py-4 bg-blue-50/30">
                        <input 
                          type="number" 
                          className="w-full text-right bg-white border border-blue-200 rounded-md px-2 py-1 text-nexus-blue font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="0"
                          onChange={(e) => handleInputChange(m.id, e.target.value)}
                        />
                     </td>
                     <td className={`px-6 py-4 text-right font-bold ${balance < 0 ? 'text-red-600' : 'text-slate-700'}`}>
                        {balance.toLocaleString()}
                     </td>
                     <td className="px-6 py-4 text-right font-bold text-green-600">
                        R$ {estPayment.toLocaleString()}
                     </td>
                   </tr>
                 )
               })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main Project View ---

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'DIARY' | 'MEASUREMENTS'>('SCHEDULE');

  if (selectedProject) {
     const project = mockProjects.find(p => p.id === selectedProject);
     if (!project) return null;

     // Progress Logic (Mocked logic for demo)
     const actualProgress = project.progress;
     const plannedProgress = project.expectedProgress || 0;
     const isDelayed = actualProgress < plannedProgress;
     const progressDiff = plannedProgress - actualProgress;

     return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 pb-20">
            {/* Header / Back Button */}
            <div className="mb-6">
              <button 
                onClick={() => setSelectedProject(null)} 
                className="text-sm font-medium text-slate-500 hover:text-nexus-blue flex items-center mb-2 group"
              >
                  <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                  Voltar para Lista de Projetos
              </button>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                    <div>
                       <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{project.name}</h2>
                       <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
                           <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {project.location}</span>
                           <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> Entrega Prevista: {new Date(project.completionDate).toLocaleDateString()}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${isDelayed ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {isDelayed ? <AlertCircle className="w-4 h-4 mr-1"/> : <CheckCircle2 className="w-4 h-4 mr-1"/>}
                          {isDelayed ? 'Atenção: Atrasado' : 'Em Dia'}
                       </span>
                    </div>
                 </div>

                 {/* Advanced Progress Bar */}
                 <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-sm font-bold text-slate-700">
                         Progresso Físico
                      </div>
                      <div className="text-sm font-medium text-slate-500">
                         Realizado: <span className="text-slate-900 font-bold">{actualProgress}%</span> 
                         <span className="mx-2 text-slate-300">|</span> 
                         Previsto: <span className="text-slate-900 font-bold">{plannedProgress}%</span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-slate-100 relative">
                      {/* Expected Marker (as a background bar or line) */}
                      <div style={{ width: `${plannedProgress}%` }} className="absolute top-0 bottom-0 left-0 bg-slate-300/50 border-r-2 border-slate-400 z-0"></div>
                      
                      {/* Actual Progress */}
                      <div 
                        style={{ width: `${actualProgress}%` }} 
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center z-10 ${
                          isDelayed ? 'bg-nexus-orange' : 'bg-green-500'
                        } transition-all duration-1000 relative`}
                      >
                         {/* Stripe effect */}
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                      </div>
                    </div>
                    {isDelayed && (
                       <p className="text-xs text-red-600 font-medium mt-1">
                          A obra está {progressDiff}% atrás do cronograma previsto para hoje.
                       </p>
                    )}
                 </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto gap-8">
               {[
                 { id: 'SCHEDULE', label: 'Cronograma & Avanço', icon: Calendar },
                 { id: 'DIARY', label: 'Diário de Obra', icon: FileText },
                 { id: 'MEASUREMENTS', label: 'Medições & Empreiteiros', icon: Ruler },
               ].map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 flex items-center gap-2 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                       activeTab === tab.id 
                       ? 'border-nexus-blue text-nexus-blue' 
                       : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                 >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                 </button>
               ))}
            </div>

            {/* Content Area */}
            <div className="flex-1">
               {activeTab === 'SCHEDULE' && <ScheduleTab project={project} />}
               {activeTab === 'DIARY' && <DiaryTab />}
               {activeTab === 'MEASUREMENTS' && <MeasurementsTab />}
            </div>
        </div>
     )
  }

  // --- Project List View (Default) ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projetos</h1>
          <p className="text-slate-500">Selecione uma obra para acessar o painel de controle.</p>
        </div>
        <button className="bg-nexus-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
          + Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map(project => (
          <ProjectCard key={project.id} project={project} onSelect={() => setSelectedProject(project.id)} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = ({ project, onSelect }) => (
  <div onClick={onSelect} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
    <div className="h-48 relative overflow-hidden">
      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
        {project.status}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
        <h3 className="text-white font-bold text-lg mb-1">{project.name}</h3>
        <div className="flex items-center text-white/90 text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          {project.location}
        </div>
      </div>
    </div>
    <div className="p-5">
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-500 font-medium">Avanço Físico</span>
          <span className="font-bold text-nexus-blue">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-nexus-blue h-2 rounded-full transition-all duration-1000" 
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          <p className="mb-0.5">Orçamento: <span className="font-semibold text-slate-700">R$ {(project.budget / 1000000).toFixed(1)}M</span></p>
          <p>Entrega: <span className="font-semibold text-slate-700">{new Date(project.completionDate).toLocaleDateString('pt-BR')}</span></p>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-nexus-blue group-hover:text-white transition-colors">
           <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

export default Projects;