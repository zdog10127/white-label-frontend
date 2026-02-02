import appointmentService from './appointmentService';
import patientService from './patientService';

class DashboardService {
  /**
   * Obter estatísticas gerais do dashboard
   */
  async getStatistics() {
    try {
      const [patients, appointments] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll()
      ]);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const stats = {
        totalPatients: patients.length,
        activePatients: patients.filter(p => p.active !== false).length,
        inactivePatients: patients.filter(p => p.active === false).length,
        totalAppointments: appointments.length,
        appointmentsToday: appointments.filter(a => {
          const appointmentDate = new Date(a.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate.getTime() === today.getTime();
        }).length,
        appointmentsThisMonth: appointments.filter(a => {
          const appointmentDate = new Date(a.date);
          return appointmentDate >= startOfMonth && appointmentDate <= endOfMonth;
        }).length,
        appointmentsByStatus: {
          scheduled: appointments.filter(a => a.status === 'Agendado').length,
          confirmed: appointments.filter(a => a.status === 'Confirmado').length,
          completed: appointments.filter(a => a.status === 'Concluído').length,
          cancelled: appointments.filter(a => a.status === 'Cancelado').length,
          noShow: appointments.filter(a => a.status === 'Faltou').length
        }
      };

      return stats;
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw error;
    }
  }

  /**
   * Obter aniversariantes do dia
   */
  async getBirthdays() {
    try {
      const patients = await patientService.getAll();
      const today = new Date();
      
      const birthdays = patients
        .filter(p => p.active !== false && p.birthDate)
        .filter(p => {
          const birthDate = new Date(p.birthDate!);
          return birthDate.getMonth() === today.getMonth() && 
                 birthDate.getDate() === today.getDate();
        })
        .map(p => {
          const birthDate = new Date(p.birthDate!);
          const age = today.getFullYear() - birthDate.getFullYear();
          
          return {
            id: p.id,
            name: p.name,
            phone: p.phone,
            email: p.email,
            birthDate: p.birthDate,
            age
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      return birthdays;
    } catch (error) {
      console.error('Erro ao obter aniversariantes:', error);
      throw error;
    }
  }

  /**
   * Obter agendamentos de hoje
   */
  async getTodayAppointments() {
    try {
      const appointments = await appointmentService.getAll();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayAppointments = appointments
        .filter(a => {
          const appointmentDate = new Date(a.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate.getTime() === today.getTime();
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      return todayAppointments;
    } catch (error) {
      console.error('Erro ao obter agendamentos de hoje:', error);
      throw error;
    }
  }

  /**
   * Obter pacientes com cadastros incompletos
   */
  async getIncompleteRegistrations() {
    try {
      const patients = await patientService.getAll();

      const incompletePatients = patients
        .filter(p => p.active !== false)
        .map(p => {
          const missingFields = {
            basicInfo: !p.cpf || !p.phone || !p.email,
            address: !p.address || !p.address.street || !p.address.city,
            cancer: !p.cancer || !p.cancer.type,
            medicalHistory: !p.medicalHistory,
            documents: !p.documents || 
                      (!p.documents.identity && 
                       !p.documents.cpfDoc && 
                       !p.documents.addressProof)
          };

          const hasIncomplete = Object.values(missingFields).some(v => v);

          return {
            patient: {
              id: p.id,
              name: p.name
            },
            missingFields,
            hasIncomplete
          };
        })
        .filter(p => p.hasIncomplete);

      const summary = {
        total: incompletePatients.length,
        byCategory: {
          basicInfo: incompletePatients.filter(p => p.missingFields.basicInfo).length,
          address: incompletePatients.filter(p => p.missingFields.address).length,
          cancer: incompletePatients.filter(p => p.missingFields.cancer).length,
          medicalHistory: incompletePatients.filter(p => p.missingFields.medicalHistory).length,
          documents: incompletePatients.filter(p => p.missingFields.documents).length
        },
        patients: incompletePatients.slice(0, 10) // Top 10
      };

      return summary;
    } catch (error) {
      console.error('Erro ao obter cadastros incompletos:', error);
      throw error;
    }
  }
}

const dashboardService = new DashboardService();
export default dashboardService;