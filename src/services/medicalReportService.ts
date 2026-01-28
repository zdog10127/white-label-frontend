import api from "./api";

export interface MedicalReport {
  id?: string;
  patientId: string;
  diagnosis?: string;
  medications?: string;
  allergies?: string;
  comorbidities?: string;
  familyHistory?: string;
  treatmentPlan?: string;
  recommendations?: string;
  restrictions?: string;
  generalNotes?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  oxygenSaturation?: number;
}

export interface Evolution {
  id?: string;
  patientId: string;
  
  date: string; 
  time?: string; 

  type: "Consulta" | "Sessão" | "Retorno" | "Emergência" | "Acompanhamento" | "Outros";
  
  chiefComplaint?: string;
  symptoms?: string;
  vitalSigns?: VitalSigns;
  physicalExam?: string;
  assessment?: string;
  conduct?: string;
  prescriptions?: string;
  examsRequested?: string;
  
  treatmentEvolution?: string;
  sideEffects?: string;
  adherence?: "Ótima" | "Boa" | "Regular" | "Ruim";
  
  notes?: string;
  
  nextAppointment?: string;
  
  createdAt?: string;
  updatedAt?: string;
  attendedBy?: string;
  duration?: number;
}

class MedicalReportService {
  private reportURL = "/medicalreports";
  private evolutionURL = "/evolutions";

  async getReportByPatientId(patientId: string): Promise<MedicalReport | null> {
    try {
      const response = await api.get<MedicalReport>(`${this.reportURL}/patient/${patientId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createReport(report: MedicalReport): Promise<MedicalReport> {
    const response = await api.post<MedicalReport>(this.reportURL, report);
    return response.data;
  }

  async updateReport(id: string, report: MedicalReport): Promise<MedicalReport> {
    const response = await api.put<MedicalReport>(`${this.reportURL}/${id}`, report);
    return response.data;
  }

  async deleteReport(id: string): Promise<void> {
    await api.delete(`${this.reportURL}/${id}`);
  }

  async getEvolutionsByPatientId(patientId: string): Promise<Evolution[]> {
    const response = await api.get<Evolution[]>(`${this.evolutionURL}/patient/${patientId}`);
    return response.data;
  }

  async getEvolutionById(id: string): Promise<Evolution> {
    const response = await api.get<Evolution>(`${this.evolutionURL}/${id}`);
    return response.data;
  }

  async createEvolution(evolution: Evolution): Promise<Evolution> {
    const response = await api.post<Evolution>(this.evolutionURL, evolution);
    return response.data;
  }

  async updateEvolution(id: string, evolution: Evolution): Promise<Evolution> {
    const response = await api.put<Evolution>(`${this.evolutionURL}/${id}`, evolution);
    return response.data;
  }

  async deleteEvolution(id: string): Promise<void> {
    await api.delete(`${this.evolutionURL}/${id}`);
  }

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