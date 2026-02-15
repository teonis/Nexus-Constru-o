import React, { useState } from 'react';
import { Calendar, MapPin, Users, Camera, MessageSquare, MoreVertical, Hammer } from 'lucide-react';
import { mockProjects } from '../services/mockData';
import { Project, ProjectStatus } from '../types';

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = ({ project, onSelect }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group">
    <div className="h-48 relative overflow-hidden">
      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
        {project.status}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-white font-bold text-lg">{project.name}</h3>
        <div className="flex items-center text-white/80 text-xs mt-1">
          <MapPin className="w-3 h-3 mr-1" />
          {project.location}
        </div>
      </div>
    </div>
    <div className="p-5">
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-500">Conclusão</span>
          <span className="font-semibold text-nexus-blue">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-nexus-blue h-2 rounded-full transition-all duration-1000" 
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          <p>Orçamento: R$ {(project.budget / 1000000).toFixed(1)}M</p>
          <p>Fim: {new Date(project.completionDate).toLocaleDateString('pt-BR')}</p>
        </div>
        <button 
          onClick={onSelect}
          className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
        >
          Gerenciar Obra
        </button>
      </div>
    </div>
  </div>
);

const DailyLog: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-800 flex items-center">
          <Hammer className="w-5 h-5 mr-2 text-nexus-blue" />
          Diário de Obra Digital
        </h3>
        <span className="text-sm text-slate-400">{new Date().toLocaleDateString('pt-BR')}</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
            <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none border border-slate-100 text-sm">
                <p className="font-semibold text-slate-900 mb-1">João Diretor (Eng.)</p>
                <p className="text-slate-600">Clima: Ensolarado, 28°C. Efetivo: 45 pedreiros. Iniciada concretagem da Laje 3.</p>
                <div className="mt-2 flex gap-2">
                    <div className="w-16 h-16 bg-slate-200 rounded-md"></div>
                    <div className="w-16 h-16 bg-slate-200 rounded-md"></div>
                </div>
            </div>
        </div>
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">AM</div>
            <div className="bg-blue-50 p-3 rounded-lg rounded-tl-none border border-blue-100 text-sm">
                <p className="font-semibold text-slate-900 mb-1">Ana Master (Segurança)</p>
                <p className="text-slate-600">Inspeção concluída. Conformidade de EPIs em 98%. Necessário repor luvas.</p>
            </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-nexus-blue hover:bg-slate-50 rounded-md">
                <Camera className="w-5 h-5" />
            </button>
            <input 
                type="text" 
                placeholder="Registrar atividade, clima ou incidente..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexus-blue/20"
            />
            <button className="bg-nexus-blue text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Registrar
            </button>
        </div>
      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (selectedProject) {
     const project = mockProjects.find(p => p.id === selectedProject);
     return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <button onClick={() => setSelectedProject(null)} className="text-sm text-slate-500 hover:text-nexus-blue mb-4 flex items-center">
                ← Voltar para Projetos
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                         <h2 className="text-2xl font-bold text-slate-900 mb-2">{project?.name}</h2>
                         <div className="flex gap-4 text-sm text-slate-500 mb-6">
                             <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {project?.location}</span>
                             <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> Entrega: {project?.completionDate}</span>
                         </div>
                         
                         <h3 className="font-semibold mb-4">Etapas da Obra (Visualização Gantt)</h3>
                         <div className="space-y-3">
                             {['Fundação & Estacas', 'Estrutura Nível 1-5', 'Alvenaria & Drywall', 'Instalações MEP', 'Acabamento'].map((task, i) => (
                                 <div key={i} className="flex items-center gap-4">
                                     <div className="w-36 text-xs font-medium text-slate-500">{task}</div>
                                     <div className="flex-1 h-8 bg-slate-50 rounded-md relative overflow-hidden">
                                         <div 
                                            className={`absolute top-1 bottom-1 rounded-md ${i < 2 ? 'bg-green-500' : i === 2 ? 'bg-nexus-blue' : 'bg-slate-200'}`}
                                            style={{ left: `${i * 15}%`, width: '30%' }}
                                         ></div>
                                     </div>
                                     <div className="w-24 text-xs text-right text-slate-400">{i < 2 ? 'Concluído' : i === 2 ? 'Em Andamento' : 'Pendente'}</div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
                <div className="h-[600px]">
                    <DailyLog />
                </div>
            </div>
        </div>
     )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projetos</h1>
          <p className="text-slate-500">Gerencie canteiros de obras e diários digitais.</p>
        </div>
        <button className="bg-nexus-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
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

export default Projects;