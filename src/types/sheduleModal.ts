export interface ClientType {
  id: string;
  name: string;
}

export interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  clients: ClientType[];
  onSave: (novaSessao: {
    id: string;
    cpf: string;
    data: string;
    titulo: string;
    name: string;
    startTime: string;
    endTime: string;
    frequencia: string;
    status: string;
  }) => void;
}
