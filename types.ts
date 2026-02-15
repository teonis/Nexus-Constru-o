export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  PROJECTS = 'PROJECTS',
  FINANCE = 'FINANCE',
  SALES = 'SALES',
  AI_LAB = 'AI_LAB'
}

export enum ProjectStatus {
  ON_TRACK = 'Em andamento',
  DELAYED = 'Atrasado',
  COMPLETED = 'Concluído',
  PLANNING = 'Planejamento'
}

export enum UnitStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD'
}

export interface Project {
  id: string;
  name: string;
  location: string;
  image: string;
  progress: number;
  status: ProjectStatus;
  budget: number;
  spent: number;
  startDate: string;
  completionDate: string;
}

export type FinancialCategory = 'MATERIAL' | 'LABOR' | 'EQUIPMENT' | 'ADMIN' | 'TAXES' | 'SALES' | 'OTHER';

export interface FinancialRecord {
  id: string;
  description: string;
  amount: number;
  type: 'PAYABLE' | 'RECEIVABLE';
  status: 'PENDING' | 'PAID' | 'APPROVED';
  dueDate: string;
  project: string; // Project Name or ID
  costCenter: string; // Specific task or department
  category: FinancialCategory;
}

export interface Unit {
  id: string;
  unitNumber: string;
  floor: number;
  area: number;
  price: number;
  status: UnitStatus;
  projectName: string;
}

export interface SaleLead {
  id: string;
  name: string;
  stage: 'LEAD' | 'VISIT' | 'PROPOSAL' | 'CONTRACT';
  value: number;
  interest: string;
}