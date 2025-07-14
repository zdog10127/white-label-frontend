import type { Dayjs } from "dayjs";

export interface FormErrors {
  [key: string]: string;
}

export interface NewClientFormData {
  name: string;
  nomeSocial: string;
  cpf: string;
  rg: string;
  cellphone: string;
  birth: Dayjs | null;
  age: string;
  email: string;
  gender: string;
  group: string;
  naturalidade: string;
  nacionalidade: string;
  profissao: string;
  renda: string;
  pagamento: string;
  escolaridade: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  ondeNosConheceu: string;
  encaminhadoPor: string;
  observacoes: string;
  tags: string[];
  corIdentificacao: string;
  dadosBancarios: {
    Banco: string;
    Agencia: string;
    Conta: string;
  };
  parente: {
    Nome: string;
    Telefone: string;
    Parentesco: string;
  };
  sessao: {
    Data: string;
    Horario: string;
    Status: string;
    Frequencia: string;
  };
}
