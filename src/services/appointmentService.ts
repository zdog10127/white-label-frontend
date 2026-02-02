import api from "./api";

// ============================================
// TIPOS E INTERFACES
// ============================================

export type AppointmentType = 
  | "Consulta" 
  | "Retorno" 
  | "Avaliação" 
  | "Sessão" 
  | "Emergência"
  | "Outros";

export type AppointmentStatus = 
  | "Agendado" 
  | "Confirmado" 
  | "EmAtendimento"
  | "Concluído" 
  | "Cancelado" 
  | "Faltou";

export interface Appointment {
  id?: string;
  patientId: string;
  patientName?: string;
  professionalId: string;
  professionalName?: string;
  date: string; // ISO format: YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  duration: number; // em minutos
  type: AppointmentType;
  specialty?: string;
  status: AppointmentStatus;
  notes?: string;
  cancellationReason?: string;
  reminderSent?: boolean;
  reminderDate?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateAppointmentDto {
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: number;
  type: string;
  specialty?: string;
  notes?: string;
}

export interface UpdateAppointmentDto {
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  type?: string;
  specialty?: string;
  status?: string;
  notes?: string;
}

export interface CancelAppointmentDto {
  cancellationReason: string;
}

export interface AppointmentQueryDto {
  patientId?: string;
  professionalId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  type?: string;
}

// ============================================
// SERVIÇO DE AGENDAMENTOS
// ============================================

class AppointmentService {
  private baseURL = "/appointments";

  /**
   * Listar todos os agendamentos
   */
  async getAll(): Promise<Appointment[]> {
    const response = await api.get<{ success: boolean; data: Appointment[] }>(this.baseURL);
    return response.data.data;
  }

  /**
   * Buscar agendamento por ID
   */
  async getById(id: string): Promise<Appointment> {
    const response = await api.get<{ success: boolean; data: Appointment }>(`${this.baseURL}/${id}`);
    return response.data.data;
  }

  /**
   * Buscar agendamentos por paciente
   */
  async getByPatient(patientId: string): Promise<Appointment[]> {
    const response = await api.get<{ success: boolean; data: Appointment[] }>(`${this.baseURL}/patient/${patientId}`);
    return response.data.data;
  }

  /**
   * Buscar agendamentos por profissional
   */
  async getByProfessional(professionalId: string): Promise<Appointment[]> {
    const response = await api.get<{ success: boolean; data: Appointment[] }>(`${this.baseURL}/professional/${professionalId}`);
    return response.data.data;
  }

  /**
   * Buscar agendamentos com filtros
   */
  async query(query: AppointmentQueryDto = {}): Promise<Appointment[]> {
    // Se não houver filtros, buscar todos
    if (Object.keys(query).length === 0) {
      return this.getAll();
    }
    
    // Converter datas para formato ISO DateTime se existirem
    const queryWithDates = { ...query };
    if (queryWithDates.startDate) {
      // Adiciona horário 00:00:00 e timezone
      queryWithDates.startDate = `${queryWithDates.startDate}T00:00:00.000Z`;
    }
    if (queryWithDates.endDate) {
      // Adiciona horário 23:59:59 e timezone
      queryWithDates.endDate = `${queryWithDates.endDate}T23:59:59.999Z`;
    }
    
    console.log('🔍 Query enviada:', queryWithDates);
    
    const response = await api.post<{ success: boolean; data: Appointment[] }>(`${this.baseURL}/query`, queryWithDates);
    
    console.log('✅ Query resposta:', response.data);
    
    return response.data.data;
  }

  /**
   * Buscar agendamentos por período
   */
  async getByDateRange(startDate: string, endDate: string): Promise<Appointment[]> {
    try {
      // Buscar todos e filtrar no frontend
      const all = await this.getAll();
      
      // Filtrar por data
      const filtered = all.filter(a => {
        return a.date >= startDate && a.date <= endDate;
      });
      
      return filtered;
    } catch (error) {
      console.error('❌ Erro ao buscar agendamentos:', error);
      throw error;
    }
  }

  /**
   * Criar novo agendamento
   */
  async create(appointment: CreateAppointmentDto): Promise<Appointment> {
    const response = await api.post<{ success: boolean; data: Appointment }>(this.baseURL, appointment);
    return response.data.data;
  }

  /**
   * Atualizar agendamento
   */
  async update(id: string, appointment: UpdateAppointmentDto): Promise<Appointment> {
    // Remover campos undefined/null para não enviar ao backend
    const cleanDto: any = {};
    Object.keys(appointment).forEach(key => {
      const value = (appointment as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        cleanDto[key] = value;
      }
    });
    
    console.log('🔄 Update enviando:', cleanDto);
    
    const response = await api.put<{ success: boolean; data: Appointment }>(`${this.baseURL}/${id}`, cleanDto);
    return response.data.data;
  }

  /**
   * Deletar agendamento
   */
  async delete(id: string): Promise<void> {
    await api.delete(`${this.baseURL}/${id}`);
  }

  /**
   * Cancelar agendamento
   */
  async cancel(id: string, reason: string): Promise<void> {
    await api.post(`${this.baseURL}/${id}/cancel`, { cancellationReason: reason });
  }

  /**
   * Verificar disponibilidade
   */
  async checkAvailability(professionalId: string, date: string, startTime: string, endTime: string): Promise<boolean> {
    const response = await api.get<{ success: boolean; available: boolean }>(`${this.baseURL}/check-availability`, {
      params: { professionalId, date, startTime, endTime }
    });
    return response.data.available;
  }

  // ============================================
  // FUNÇÕES AUXILIARES
  // ============================================

  /**
   * Formatar data para exibição (DD/MM/YYYY)
   */
  formatDate(date: string): string {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  /**
   * Formatar hora (HH:mm)
   */
  formatTime(time: string): string {
    return time.substring(0, 5); // Remove segundos se houver
  }

  /**
   * Obter cor do status
   */
  getStatusColor(status: AppointmentStatus): "default" | "primary" | "success" | "error" | "warning" | "info" {
    switch (status) {
      case "Agendado":
        return "default";
      case "Confirmado":
        return "primary";
      case "EmAtendimento":
        return "info";
      case "Concluído":
        return "success";
      case "Cancelado":
        return "error";
      case "Faltou":
        return "warning";
      default:
        return "default";
    }
  }

  /**
   * Obter cor do tipo
   */
  getTypeColor(type: AppointmentType): "default" | "primary" | "secondary" | "info" {
    switch (type) {
      case "Consulta":
        return "primary";
      case "Retorno":
        return "secondary";
      case "Avaliação":
        return "info";
      case "Sessão":
        return "default";
      default:
        return "default";
    }
  }

  /**
   * Verificar se agendamento está no passado
   */
  isPast(appointment: Appointment): boolean {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
    return appointmentDateTime < new Date();
  }

  /**
   * Verificar se agendamento é hoje
   */
  isToday(appointment: Appointment): boolean {
    const today = new Date().toISOString().split("T")[0];
    return appointment.date === today;
  }

  /**
   * Verificar se agendamento está próximo (próximas 24h)
   */
  isUpcoming(appointment: Appointment): boolean {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
    const now = new Date();
    const diff = appointmentDateTime.getTime() - now.getTime();
    const hours = diff / (1000 * 60 * 60);
    return hours > 0 && hours <= 24;
  }

  /**
   * Agrupar agendamentos por data
   */
  groupByDate(appointments: Appointment[]): { [date: string]: Appointment[] } {
    return appointments.reduce((acc, appointment) => {
      const date = appointment.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {} as { [date: string]: Appointment[] });
  }

  /**
   * Ordenar agendamentos por data e hora
   */
  sortByDateTime(appointments: Appointment[]): Appointment[] {
    return [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * Filtrar agendamentos por status
   */
  filterByStatus(appointments: Appointment[], status: AppointmentStatus): Appointment[] {
    return appointments.filter(a => a.status === status);
  }

  /**
   * Filtrar agendamentos por tipo
   */
  filterByType(appointments: Appointment[], type: AppointmentType): Appointment[] {
    return appointments.filter(a => a.type === type);
  }

  /**
   * Contar agendamentos por status
   */
  countByStatus(appointments: Appointment[]): { [key in AppointmentStatus]: number } {
    return {
      "Agendado": appointments.filter(a => a.status === "Agendado").length,
      "Confirmado": appointments.filter(a => a.status === "Confirmado").length,
      "EmAtendimento": appointments.filter(a => a.status === "EmAtendimento").length,
      "Concluído": appointments.filter(a => a.status === "Concluído").length,
      "Cancelado": appointments.filter(a => a.status === "Cancelado").length,
      "Faltou": appointments.filter(a => a.status === "Faltou").length,
    };
  }

  /**
   * Calcular duração em minutos a partir de startTime e endTime
   */
  calculateDuration(startTime: string, endTime: string): number {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    return endMinutes - startMinutes;
  }

  /**
   * Calcular endTime a partir de startTime e duration
   */
  calculateEndTime(startTime: string, duration: number): string {
    const [hour, min] = startTime.split(':').map(Number);
    const totalMinutes = hour * 60 + min + duration;
    
    const endHour = Math.floor(totalMinutes / 60);
    const endMin = totalMinutes % 60;
    
    return `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
  }
}

const appointmentService = new AppointmentService();
export default appointmentService;