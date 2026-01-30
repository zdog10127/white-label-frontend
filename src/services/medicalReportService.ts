import api from "./api";

// ============================================
// TIPOS E INTERFACES
// ============================================

export interface MedicalReport {
  id?: string;
  patientId: string;
  
  // Informações Clínicas
  diagnosis?: string;
  medications?: string;
  allergies?: string;
  comorbidities?: string;
  familyHistory?: string;
  
  // Plano de Tratamento
  treatmentPlan?: string;
  recommendations?: string;
  restrictions?: string;
  
  // Observações
  generalNotes?: string;
  
  // Metadados
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

// DTO para enviar ao backend (PascalCase)
interface MedicalReportDTO {
  Id?: string;
  PatientId: string;
  Diagnosis?: string;
  Medications?: string;
  Allergies?: string;
  Comorbidities?: string;
  FamilyHistory?: string;
  TreatmentPlan?: string;
  Recommendations?: string;
  Restrictions?: string;
  GeneralNotes?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  CreatedBy?: string;
  UpdatedBy?: string;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  oxygenSaturation?: number;
}

// DTO para enviar ao backend (PascalCase)
interface VitalSignsDTO {
  BloodPressure?: string;
  HeartRate?: number;
  Temperature?: number;
  Weight?: number;
  Height?: number;
  OxygenSaturation?: number;
}

export interface Evolution {
  id?: string;
  patientId: string;
  
  // Data e Hora
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  
  // Tipo
  type: "Consulta" | "Sessão" | "Retorno" | "Emergência" | "Acompanhamento" | "Outros";
  
  // Informações da Evolução
  chiefComplaint?: string;
  symptoms?: string;
  vitalSigns?: VitalSigns;
  physicalExam?: string;
  assessment?: string;
  conduct?: string;
  prescriptions?: string;
  examsRequested?: string;
  
  // Evolução do Tratamento
  treatmentEvolution?: string;
  sideEffects?: string;
  adherence?: "Ótima" | "Boa" | "Regular" | "Ruim";
  
  // Observações
  notes?: string;
  
  // Próxima Consulta
  nextAppointment?: string;
  
  // Metadados
  createdAt?: string;
  updatedAt?: string;
  attendedBy?: string;
  duration?: number;
}

// DTO para enviar ao backend (PascalCase)
interface EvolutionDTO {
  Id?: string;
  PatientId: string;
  Date: string;
  Time?: string;
  Type: string;
  ChiefComplaint?: string;
  Symptoms?: string;
  VitalSigns?: VitalSignsDTO;
  PhysicalExam?: string;
  Assessment?: string;
  Conduct?: string;
  Prescriptions?: string;
  ExamsRequested?: string;
  TreatmentEvolution?: string;
  SideEffects?: string;
  Adherence?: string;
  Notes?: string;
  NextAppointment?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  AttendedBy?: string;
  Duration?: number;
}

// ============================================
// SERVIÇO DE RELATÓRIOS MÉDICOS
// ============================================

class MedicalReportService {
  private reportURL = "/medicalreports";
  private evolutionURL = "/evolutions";

  // ==========================================
  // FUNÇÕES DE CONVERSÃO
  // ==========================================

  private toMedicalReportDTO(report: MedicalReport): any {
    return {
      id: report.id,
      patientId: report.patientId,
      diagnosis: report.diagnosis,
      medications: report.medications,
      allergies: report.allergies,
      comorbidities: report.comorbidities,
      familyHistory: report.familyHistory,
      treatmentPlan: report.treatmentPlan,
      recommendations: report.recommendations,
      restrictions: report.restrictions,
      generalNotes: report.generalNotes,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
      createdBy: report.createdBy,
      updatedBy: report.updatedBy,
    };
  }

  private fromMedicalReportDTO(dto: any): MedicalReport {
    return {
      id: dto.id,
      patientId: dto.patientId,
      diagnosis: dto.diagnosis,
      medications: dto.medications,
      allergies: dto.allergies,
      comorbidities: dto.comorbidities,
      familyHistory: dto.familyHistory,
      treatmentPlan: dto.treatmentPlan,
      recommendations: dto.recommendations,
      restrictions: dto.restrictions,
      generalNotes: dto.generalNotes,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      createdBy: dto.createdBy,
      updatedBy: dto.updatedBy,
    };
  }

  private toVitalSignsDTO(vital?: VitalSigns): VitalSignsDTO | undefined {
    if (!vital) return undefined;
    return {
      BloodPressure: vital.bloodPressure,
      HeartRate: vital.heartRate,
      Temperature: vital.temperature,
      Weight: vital.weight,
      Height: vital.height,
      OxygenSaturation: vital.oxygenSaturation,
    };
  }

  private fromVitalSignsDTO(dto: any): VitalSigns | undefined {
    if (!dto) return undefined;
    return {
      bloodPressure: dto.bloodPressure,
      heartRate: dto.heartRate,
      temperature: dto.temperature,
      weight: dto.weight,
      height: dto.height,
      oxygenSaturation: dto.oxygenSaturation,
    };
  }

  private toEvolutionDTO(evolution: Evolution): EvolutionDTO {
    return {
      Id: evolution.id,
      PatientId: evolution.patientId,
      Date: evolution.date,
      Time: evolution.time,
      Type: evolution.type,
      ChiefComplaint: evolution.chiefComplaint,
      Symptoms: evolution.symptoms,
      VitalSigns: this.toVitalSignsDTO(evolution.vitalSigns),
      PhysicalExam: evolution.physicalExam,
      Assessment: evolution.assessment,
      Conduct: evolution.conduct,
      Prescriptions: evolution.prescriptions,
      ExamsRequested: evolution.examsRequested,
      TreatmentEvolution: evolution.treatmentEvolution,
      SideEffects: evolution.sideEffects,
      Adherence: evolution.adherence,
      Notes: evolution.notes,
      NextAppointment: evolution.nextAppointment,
      CreatedAt: evolution.createdAt,
      UpdatedAt: evolution.updatedAt,
      AttendedBy: evolution.attendedBy,
      Duration: evolution.duration,
    };
  }

  private fromEvolutionDTO(dto: any): Evolution {
    return {
      id: dto.id,
      patientId: dto.patientId,
      date: dto.date,
      time: dto.time,
      type: dto.type,
      chiefComplaint: dto.chiefComplaint,
      symptoms: dto.symptoms,
      vitalSigns: this.fromVitalSignsDTO(dto.vitalSigns),
      physicalExam: dto.physicalExam,
      assessment: dto.assessment,
      conduct: dto.conduct,
      prescriptions: dto.prescriptions,
      examsRequested: dto.examsRequested,
      treatmentEvolution: dto.treatmentEvolution,
      sideEffects: dto.sideEffects,
      adherence: dto.adherence,
      notes: dto.notes,
      nextAppointment: dto.nextAppointment,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      attendedBy: dto.attendedBy,
      duration: dto.duration,
    };
  }

  // ==========================================
  // RELATÓRIOS MÉDICOS
  // ==========================================

  async getReportByPatientId(patientId: string): Promise<MedicalReport | null> {
    try {
      const response = await api.get(`${this.reportURL}/patient/${patientId}`);
      // Backend retorna { success: true, data: { ... } }
      const reportData = response.data?.data || response.data;
      if (!reportData) return null;
      return this.fromMedicalReportDTO(reportData);
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createReport(report: MedicalReport): Promise<MedicalReport> {
    const dto = this.toMedicalReportDTO(report);
    const response = await api.post(this.reportURL, dto);
    const reportData = response.data?.data || response.data;
    return this.fromMedicalReportDTO(reportData);
  }

  async updateReport(id: string, report: MedicalReport): Promise<MedicalReport> {
    const dto = this.toMedicalReportDTO(report);
    const response = await api.put(`${this.reportURL}/${id}`, dto);
    const reportData = response.data?.data || response.data;
    return this.fromMedicalReportDTO(reportData);
  }

  async deleteReport(id: string): Promise<void> {
    await api.delete(`${this.reportURL}/${id}`);
  }

  // ==========================================
  // EVOLUÇÕES
  // ==========================================

  async getEvolutionsByPatientId(patientId: string): Promise<Evolution[]> {
    const response = await api.get(`${this.evolutionURL}/patient/${patientId}`);
    // Backend retorna { success: true, data: [...] }
    const evolutionsData = response.data?.data || response.data;
    return (evolutionsData as any[]).map(dto => this.fromEvolutionDTO(dto));
  }

  async getEvolutionById(id: string): Promise<Evolution> {
    const response = await api.get(`${this.evolutionURL}/${id}`);
    const evolutionData = response.data?.data || response.data;
    return this.fromEvolutionDTO(evolutionData);
  }

  async createEvolution(evolution: Evolution): Promise<Evolution> {
    const dto = this.toEvolutionDTO(evolution);
    const response = await api.post(this.evolutionURL, dto);
    const evolutionData = response.data?.data || response.data;
    return this.fromEvolutionDTO(evolutionData);
  }

  async updateEvolution(id: string, evolution: Evolution): Promise<Evolution> {
    const dto = this.toEvolutionDTO(evolution);
    const response = await api.put(`${this.evolutionURL}/${id}`, dto);
    const evolutionData = response.data?.data || response.data;
    return this.fromEvolutionDTO(evolutionData);
  }

  async deleteEvolution(id: string): Promise<void> {
    await api.delete(`${this.evolutionURL}/${id}`);
  }

  // ==========================================
  // FUNÇÕES AUXILIARES
  // ==========================================

  formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  formatDateTime(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR");
  }

  getTypeColor(type: Evolution["type"]): "primary" | "secondary" | "info" | "success" | "warning" {
    switch (type) {
      case "Consulta":
        return "primary";
      case "Sessão":
        return "secondary";
      case "Retorno":
        return "info";
      case "Emergência":
        return "warning";
      case "Acompanhamento":
        return "success";
      default:
        return "primary";
    }
  }

  getAdherenceColor(adherence?: string): "success" | "info" | "warning" | "error" {
    switch (adherence) {
      case "Ótima":
        return "success";
      case "Boa":
        return "info";
      case "Regular":
        return "warning";
      case "Ruim":
        return "error";
      default:
        return "info";
    }
  }
}

const medicalReportService = new MedicalReportService();
export default medicalReportService;