import { Project, ProjectStatus, FinancialRecord, Unit, UnitStatus, SaleLead } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Residencial Horizon',
    location: 'Centro, São Paulo',
    image: 'https://picsum.photos/id/122/400/300',
    progress: 65,
    status: ProjectStatus.ON_TRACK,
    budget: 15000000,
    spent: 8500000,
    startDate: '2023-01-15',
    completionDate: '2024-12-01'
  },
  {
    id: '2',
    name: 'Edifício Titan',
    location: 'Zona Sul, Rio de Janeiro',
    image: 'https://picsum.photos/id/142/400/300',
    progress: 22,
    status: ProjectStatus.DELAYED,
    budget: 28000000,
    spent: 7200000,
    startDate: '2023-06-01',
    completionDate: '2025-06-01'
  },
  {
    id: '3',
    name: 'Galpão Logístico Alpha',
    location: 'Campinas, SP',
    image: 'https://picsum.photos/id/158/400/300',
    progress: 89,
    status: ProjectStatus.ON_TRACK,
    budget: 5000000,
    spent: 4200000,
    startDate: '2023-03-01',
    completionDate: '2023-11-30'
  }
];

export const mockFinancials: FinancialRecord[] = [
  // Residencial Horizon
  { id: '1', description: 'Cimento Votoran (500 sacos)', amount: 12500, type: 'PAYABLE', status: 'PENDING', dueDate: '2023-10-25', project: 'Residencial Horizon', costCenter: 'Fundação', category: 'MATERIAL' },
  { id: '3', description: 'Venda Unidade 101 - Entrada', amount: 45000, type: 'RECEIVABLE', status: 'PAID', dueDate: '2023-10-20', project: 'Residencial Horizon', costCenter: 'Vendas', category: 'SALES' },
  { id: '5', description: 'Aço Gerdau CA-50', amount: 28000, type: 'PAYABLE', status: 'PAID', dueDate: '2023-09-15', project: 'Residencial Horizon', costCenter: 'Estrutura', category: 'MATERIAL' },
  { id: '6', description: 'Folha de Pagamento (Set)', amount: 120000, type: 'PAYABLE', status: 'PAID', dueDate: '2023-10-05', project: 'Residencial Horizon', costCenter: 'RH', category: 'LABOR' },
  { id: '7', description: 'Venda Unidade 304 - Parcela', amount: 15000, type: 'RECEIVABLE', status: 'PENDING', dueDate: '2023-10-30', project: 'Residencial Horizon', costCenter: 'Vendas', category: 'SALES' },
  
  // Edifício Titan
  { id: '2', description: 'Locação de Grua Potain', amount: 8000, type: 'PAYABLE', status: 'APPROVED', dueDate: '2023-10-28', project: 'Edifício Titan', costCenter: 'Equipamentos', category: 'EQUIPMENT' },
  { id: '8', description: 'Licença Prefeitura', amount: 4500, type: 'PAYABLE', status: 'PAID', dueDate: '2023-08-10', project: 'Edifício Titan', costCenter: 'Administrativo', category: 'TAXES' },
  { id: '9', description: 'Serviço de Terraplanagem', amount: 15000, type: 'PAYABLE', status: 'APPROVED', dueDate: '2023-09-01', project: 'Edifício Titan', costCenter: 'Fundação', category: 'LABOR' },
  { id: '10', description: 'Venda Unidade Cobertura - Sinal', amount: 150000, type: 'RECEIVABLE', status: 'PAID', dueDate: '2023-09-20', project: 'Edifício Titan', costCenter: 'Vendas', category: 'SALES' },

  // Galpão Logístico
  { id: '4', description: 'Empreiteira Silva & Filhos', amount: 32000, type: 'PAYABLE', status: 'PENDING', dueDate: '2023-11-05', project: 'Galpão Logístico Alpha', costCenter: 'Mão de Obra', category: 'LABOR' },
  { id: '11', description: 'Telhas Metálicas', amount: 42000, type: 'PAYABLE', status: 'APPROVED', dueDate: '2023-10-15', project: 'Galpão Logístico Alpha', costCenter: 'Cobertura', category: 'MATERIAL' },
  { id: '12', description: 'Instalação Elétrica Industrial', amount: 18000, type: 'PAYABLE', status: 'PENDING', dueDate: '2023-11-10', project: 'Galpão Logístico Alpha', costCenter: 'Instalações', category: 'LABOR' },
  
  // Geral / Outros
  { id: '13', description: 'Software NEXUS (Mensalidade)', amount: 1200, type: 'PAYABLE', status: 'PAID', dueDate: '2023-10-01', project: 'Escritório Central', costCenter: 'TI', category: 'ADMIN' },
  { id: '14', description: 'Manutenção Frota', amount: 3500, type: 'PAYABLE', status: 'PAID', dueDate: '2023-09-28', project: 'Escritório Central', costCenter: 'Logística', category: 'EQUIPMENT' },
  { id: '15', description: 'Aporte de Capital', amount: 500000, type: 'RECEIVABLE', status: 'PAID', dueDate: '2023-07-01', project: 'Escritório Central', costCenter: 'Financeiro', category: 'OTHER' },
];

export const mockUnits: Unit[] = Array.from({ length: 20 }, (_, i) => {
  const statusRoll = Math.random();
  let status = UnitStatus.AVAILABLE;
  if (statusRoll > 0.6) status = UnitStatus.SOLD;
  else if (statusRoll > 0.4) status = UnitStatus.RESERVED;

  return {
    id: `u-${i}`,
    unitNumber: `${Math.floor(i / 4) + 1}0${(i % 4) + 1}`,
    floor: Math.floor(i / 4) + 1,
    area: 75 + Math.floor(Math.random() * 50),
    price: 450000 + Math.floor(Math.random() * 300000),
    status,
    projectName: 'Residencial Horizon'
  };
});

export const mockLeads: SaleLead[] = [
  { id: 'l1', name: 'Roberto Almeida', stage: 'LEAD', value: 550000, interest: '3 Quartos' },
  { id: 'l2', name: 'Juliana Costa', stage: 'VISIT', value: 800000, interest: 'Cobertura' },
  { id: 'l3', name: 'Construtora Beta', stage: 'PROPOSAL', value: 1200000, interest: 'Laje Corporativa' },
  { id: 'l4', name: 'Marcos & Filhos', stage: 'CONTRACT', value: 450000, interest: 'Apto 101' },
];