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
  { id: '1', description: 'Fornecimento de Cimento Votoran', amount: 12500, type: 'PAYABLE', status: 'PENDING', dueDate: '2023-10-25', project: 'Residencial Horizon', costCenter: 'Fundação' },
  { id: '2', description: 'Locação de Grua', amount: 8000, type: 'PAYABLE', status: 'APPROVED', dueDate: '2023-10-28', project: 'Edifício Titan', costCenter: 'Equipamentos' },
  { id: '3', description: 'Venda Unidade 101 - Sinal', amount: 45000, type: 'RECEIVABLE', status: 'PAID', dueDate: '2023-10-20', project: 'Residencial Horizon', costCenter: 'Vendas' },
  { id: '4', description: 'Empreiteira Silva & Filhos', amount: 32000, type: 'PAYABLE', status: 'PENDING', dueDate: '2023-11-05', project: 'Galpão Logístico', costCenter: 'Mão de Obra' },
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