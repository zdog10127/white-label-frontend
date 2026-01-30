import api from './api';
import {
  PatientReportRequest,
  PatientReportResponse,
  ConsolidatedReportRequest,
  ConsolidatedReportResponse,
} from '../types/report';

class ReportService {
  /**
   * Gera relatório completo do paciente
   */
  async generatePatientReport(request: PatientReportRequest): Promise<PatientReportResponse> {
    const response = await api.post<{ success: boolean; data: PatientReportResponse }>(
      '/reports/patient',
      request
    );
    return response.data.data;
  }

  /**
   * Gera relatório consolidado
   */
  async generateConsolidatedReport(
    request: ConsolidatedReportRequest
  ): Promise<ConsolidatedReportResponse> {
    const response = await api.post<{ success: boolean; data: ConsolidatedReportResponse }>(
      '/reports/consolidated',
      request
    );
    return response.data.data;
  }

  /**
   * Exporta relatório do paciente para PDF
   */
  async exportPatientReportToPDF(patientId: string, startDate?: string, endDate?: string): Promise<Blob> {
    const request: PatientReportRequest = {
      patientId,
      startDate,
      endDate,
      includeMedicalHistory: true,
      includeEvolutions: true,
      includeAppointments: true,
      includeAnthropometricData: true,
    };

    const report = await this.generatePatientReport(request);
    
    // Aqui você pode implementar a geração do PDF
    // Por enquanto, retornaremos um blob vazio
    return new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  }

  /**
   * Formata data para exibição
   */
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  /**
   * Formata data e hora para exibição
   */
  formatDateTime(date: string): string {
    return new Date(date).toLocaleString('pt-BR');
  }

  /**
   * Calcula variação percentual
   */
  calculatePercentageChange(initial: number, final: number): number {
    if (initial === 0) return 0;
    return ((final - initial) / initial) * 100;
  }

  /**
   * Formata número com 2 casas decimais
   */
  formatNumber(value: number): string {
    return value.toFixed(2);
  }

  /**
   * Classifica IMC
   */
  classifyBMI(bmi: number): string {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidade grau I';
    if (bmi < 40) return 'Obesidade grau II';
    return 'Obesidade grau III';
  }

  /**
   * Cor do status do IMC
   */
  getBMIColor(bmi: number): string {
    if (bmi < 18.5) return '#FFA726'; // Laranja
    if (bmi < 25) return '#66BB6A'; // Verde
    if (bmi < 30) return '#FFA726'; // Laranja
    if (bmi < 35) return '#EF5350'; // Vermelho
    if (bmi < 40) return '#D32F2F'; // Vermelho escuro
    return '#B71C1C'; // Vermelho muito escuro
  }
}

export default new ReportService();