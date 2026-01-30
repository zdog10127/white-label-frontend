export interface PatientReportRequest {
  patientId: string;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  includeMedicalHistory?: boolean;
  includeEvolutions?: boolean;
  includeAppointments?: boolean;
  includeAnthropometricData?: boolean;
  comments?: string; // Observações do relatório
}

export interface ConsolidatedReportRequest {
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  professionalId?: string;
  reportType?: string;
}

export interface PatientReportResponse {
  patient: PatientBasicInfo;
  medicalHistory?: MedicalHistorySummary;
  evolutions: EvolutionSummary[];
  appointments: AppointmentSummary[];
  anthropometricData: AnthropometricDataPoint[];
  statistics: ReportStatistics;
  comments?: string; // Observações do relatório
  generatedAt: string;
  period: ReportPeriod;
}

export interface PatientBasicInfo {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
}

export interface MedicalHistorySummary {
  mainComplaint: string;
  currentIllnessHistory: string;
  chronicDiseases: string[];
  medications: string[];
  allergies: string[];
  familyHistory: string;
}

export interface EvolutionSummary {
  id: string;
  date: string;
  professionalName: string;
  professionalRole: string;
  subjectiveData: string;
  objectiveData: string;
  assessment: string;
  plan: string;
  notes: string;
}

export interface AppointmentSummary {
  id: string;
  date: string;
  professionalName: string;
  type: string;
  status: string;
  notes: string;
}

export interface AnthropometricDataPoint {
  date: string;
  weight?: number;
  height?: number;
  bmi?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  bodyFatPercentage?: number;
}

export interface ReportStatistics {
  totalEvolutions: number;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  missedAppointments: number;
  weightChange?: number;
  bmiChange?: number;
  daysInTreatment: number;
}

export interface ReportPeriod {
  startDate?: string;
  endDate?: string;
  totalDays: number;
}

export interface ConsolidatedReportResponse {
  startDate: string;
  endDate: string;
  totalPatients: number;
  newPatients: number;
  totalAppointments: number;
  totalEvolutions: number;
  appointmentsByProfessional: Record<string, number>;
  appointmentsByType: Record<string, number>;
  patientsByGender: Record<string, number>;
  patientsByAgeGroup: Record<string, number>;
  topDiagnoses: TopDiagnosis[];
  generatedAt: string;
}

export interface TopDiagnosis {
  diagnosis: string;
  count: number;
  percentage: number;
}