import api from './api';

// ============================================
// INTERFACES - Baseadas no seu backend
// ============================================

export interface Address {
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface CancerData {
  type: string;
  detectionDate?: string;
  stage?: string;
  treatmentLocation?: string;
  treatmentStartDate?: string;
  currentTreatment?: string;
  hasBiopsyResult?: boolean;
}

export interface MedicalHistory {
  diabetes?: boolean;
  hypertension?: boolean;
  cholesterol?: boolean;
  triglycerides?: boolean;
  kidneyProblems?: boolean;
  anxiety?: boolean;
  heartAttack?: boolean;
  others?: string;
}

export interface Medication {
  name: string;
  dosage?: string;
  frequency?: string;
}

export interface FamilyComposition {
  name: string;
  relationship?: string;
  age?: number;
  income?: number;
  profession?: string;
}

export interface Documents {
  identity?: boolean;
  cpfDoc?: boolean;
  marriageCertificate?: boolean;
  medicalReport?: boolean;
  recentExams?: boolean;
  addressProof?: boolean;
  incomeProof?: boolean;
  hospitalCardDoc?: boolean;
  susCardDoc?: boolean;
  biopsyResultDoc?: boolean;
}

export interface Patient {
  id?: string;
  name: string;
  cpf: string;
  rg?: string;
  birthDate: string;
  gender: string;
  maritalStatus?: string;
  phone: string;
  secondaryPhone?: string;
  email?: string;
  address?: Address;
  cancer?: CancerData;
  medicalHistory?: MedicalHistory;
  medications?: Medication[];
  susCard?: string;
  hospitalCard?: string;
  familyIncome?: number;
  numberOfResidents?: number;
  familyComposition?: FamilyComposition[];
  registrationDate?: string;
  lastReviewDate?: string;
  nextReviewDate?: string;
  status?: string;
  active?: boolean;
  treatmentYear?: number;
  fiveYears?: boolean;
  deathDate?: string;
  authorizeImage?: boolean;
  notes?: string;
  documents?: Documents;
  registeredById?: string;
}

export interface PatientResponse {
  success: boolean;
  data: Patient | Patient[];
  message?: string;
  total?: number;
}

// ============================================
// PATIENT SERVICE
// ============================================

class PatientService {
  /**
   * Listar todos os pacientes
   */
  async getAll(): Promise<Patient[]> {
    try {
      const response = await api.get<PatientResponse>('/patient');
      
      // Se retornar array direto
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Se retornar objeto com data
      if (response.data.data) {
        return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
      }
      
      return [];
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao buscar pacientes';
      throw new Error(errorMessage);
    }
  }

  /**
   * Buscar paciente por ID
   */
  async getById(id: string): Promise<Patient> {
    try {
      const response = await api.get<PatientResponse>(`/patient/${id}`);
      
      if (response.data.data) {
        return response.data.data as Patient;
      }
      
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao buscar paciente';
      throw new Error(errorMessage);
    }
  }

  /**
   * Criar novo paciente
   */
  async create(patient: Patient): Promise<Patient> {
    try {
      console.log('📝 Criando paciente:', patient);
      const response = await api.post<PatientResponse>('/patient', patient);
      
      if (response.data.data) {
        return response.data.data as Patient;
      }
      
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao criar paciente';
      throw new Error(errorMessage);
    }
  }

  /**
   * Atualizar paciente existente
   */
  async update(id: string, patient: Partial<Patient>): Promise<Patient> {
    try {
      console.log('✏️ Atualizando paciente:', id, patient);
      const response = await api.put<PatientResponse>(`/patient/${id}`, patient);
      
      if (response.data.data) {
        return response.data.data as Patient;
      }
      
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao atualizar paciente';
      throw new Error(errorMessage);
    }
  }

  /**
   * Deletar paciente
   */
  async delete(id: string): Promise<void> {
    try {
      console.log('🗑️ Deletando paciente:', id);
      await api.delete(`/patient/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao deletar paciente';
      throw new Error(errorMessage);
    }
  }

  /**
   * Buscar paciente por CPF
   */
  async searchByCPF(cpf: string): Promise<Patient | null> {
    try {
      const allPatients = await this.getAll();
      const cleanCPF = this.unformatCPF(cpf);
      return allPatients.find(p => this.unformatCPF(p.cpf) === cleanCPF) || null;
    } catch (error) {
      console.error('Erro ao buscar por CPF:', error);
      return null;
    }
  }

  /**
   * Validar CPF (básico)
   */
  validateCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    return true;
  }

  /**
   * Formatar CPF (adicionar máscara)
   */
  formatCPF(cpf: string): string {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  /**
   * Remover máscara do CPF
   */
  unformatCPF(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }
}

// Exportar instância única (Singleton)
export default new PatientService();