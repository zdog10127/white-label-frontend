import { z } from "zod";
import { clientSchema } from "../schemas/clientSchemas";

export type ClientFormData = z.infer<typeof clientSchema>;

export interface FormErrors {
  [key: string]: string;
}

export interface ClientDataFromAPI {
  NomeCompleto?: string;
  CPF?: string;
  RG?: string;
  Telefone?: string;
  DataNascimento?: string;
  Idade?: string;
  Email?: string;
  Genero?: string;
  Plano?: string; 
  Naturalidade?: string;
  Observacoes?: string;
  Profissao?: string;
  Renda?: string;
  FormaPagamento?: string; 
  Banco?: string;
  Agencia?: string;
  Conta?: string;
  Endereco?: string;
  NumeroEndereco?: string;
  Complemento?: string;
  Bairro?: string;
  Cidade?: string;
  Estado?: string;
  CEP?: string;
  Escolaridade?: string;
  NomeParente?: string;
  Parentesco?: string;
  TelefoneParente?: string;
  OndeNosConheceu?: string;
  EncaminhadoPor?: string;
  Tags?: string[];
  CorIdentificacao?: string;
  Nacionalidade?: string;
  NomeSocial?: string;
  Sessao?: {
    Data?: string;
    Horario?: string;
    Status?: string;
    Frequencia?: string;
  };
}

export interface ClientDataAdapted {
  id?: number;
  name?: string;
  cpf?: string;
  rg?: string;
  cellphone?: string;
  birth?: string;
  age?: string;
  email?: string;
  gender?: string;
  group?: string;
  naturalidade?: string;
  observacoes?: string;
  profissao?: string;
  renda?: string;
  pagamento?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  escolaridade?: string;
  nomeParente?: string;
  parentesco?: string;
  telefoneParente?: string;
  ondeNosConheceu?: string;
  encaminhadoPor?: string;
  tags?: string[];
  corIdentificacao?: string;
  nacionalidade?: string;
  nomeSocial?: string;
  status?: "Ativo" | "Inativo" | "Lista de Espera";
  registrationDate?: string;
  sessao?: {
    Data?: string;
    Horario?: string;
    Status?: string;
    Frequencia?: string;
  };
  dadosBancarios?: {
    Banco?: string;
    Agencia?: string;
    Conta?: string;
  };
  parente?: {
    Nome?: string;
    Telefone?: string;
    Parentesco?: string;
  };
}

export interface ClientDataUnified extends ClientDataFromAPI, ClientDataAdapted {}

const parseEndereco = (enderecoCompleto: string) => {
  if (!enderecoCompleto) return { endereco: "", cidade: "", estado: "" };
  
  const parts = enderecoCompleto.split(' - ');
  if (parts.length === 2) {
    const [enderecoParte, cidadeEstado] = parts;
    const [cidade, estado] = cidadeEstado.split(', ');
    return {
      endereco: enderecoParte.trim(),
      cidade: cidade?.trim() || "",
      estado: estado?.trim() || ""
    };
  }
  
  return { endereco: enderecoCompleto, cidade: "", estado: "" };
};

export const mapClientToFormData = (client: ClientDataUnified | any): Partial<ClientFormData> & {
  birth: any; 
  age: string;
  sessao: {
    Data: string;
    Horario: string;
    Status?: string;
    Frequencia?: string;
  };
  dadosBancarios: {
    Banco: string;
    Agencia?: string;
    Conta?: string;
  };
  parente: {
    Nome?: string;
    Telefone?: string;
    Parentesco?: string;
  };
} => {
  const enderecoInfo = parseEndereco(client?.Endereco || client?.endereco || "");
  
  return {
    name: client?.NomeCompleto || client?.name || client?.nome || "",
    nomeSocial: client?.NomeSocial || client?.nomeSocial || "",
    cpf: client?.CPF || client?.cpf || "",
    rg: client?.RG || client?.rg || "",
    cellphone: client?.Telefone || client?.cellphone || client?.telefone || "",
    
    birth: client?.DataNascimento || client?.birth || client?.dataNascimento || null,
    age: client?.Idade || client?.age || client?.idade || "",
    
    email: client?.Email || client?.email || "",
    gender: client?.Genero || client?.gender || client?.genero || "",
    group: client?.Plano || client?.group || client?.grupo || client?.plano || "",
    naturalidade: client?.Naturalidade || client?.naturalidade || "",
    nacionalidade: client?.Nacionalidade || client?.nacionalidade || "",
    
    profissao: client?.Profissao || client?.profissao || "",
    renda: client?.Renda || client?.renda || "",
    pagamento: client?.FormaPagamento || client?.pagamento || client?.formaPagamento || "",
    escolaridade: client?.Escolaridade || client?.escolaridade || "",
    
    endereco: client?.endereco || enderecoInfo.endereco,
    numero: client?.NumeroEndereco || client?.numero || client?.numeroEndereco || "",
    complemento: client?.Complemento || client?.complemento || "",
    bairro: client?.Bairro || client?.bairro || "",
    cidade: client?.Cidade || client?.cidade || enderecoInfo.cidade,
    estado: client?.Estado || client?.estado || enderecoInfo.estado,
    cep: client?.CEP || client?.cep || "",
    
    ondeNosConheceu: client?.OndeNosConheceu || client?.ondeNosConheceu || "",
    encaminhadoPor: client?.EncaminhadoPor || client?.encaminhadoPor || "",
    observacoes: client?.Observacoes || client?.observacoes || "",
    tags: client?.Tags || client?.tags || [],
    corIdentificacao: client?.CorIdentificacao || client?.corIdentificacao || "#415a44",

    dadosBancarios: {
      Banco: client?.Banco || client?.dadosBancarios?.Banco || client?.banco || "",
      Agencia: client?.Agencia || client?.dadosBancarios?.Agencia || client?.agencia || "",
      Conta: client?.Conta || client?.dadosBancarios?.Conta || client?.conta || "",
    },
    
    banco: client?.Banco || client?.banco || client?.dadosBancarios?.Banco || "",
    agencia: client?.Agencia || client?.agencia || client?.dadosBancarios?.Agencia || "",
    conta: client?.Conta || client?.conta || client?.dadosBancarios?.Conta || "",
    
    parente: {
      Nome: client?.NomeParente || client?.parente?.Nome || client?.nomeParente || "",
      Telefone: client?.TelefoneParente || client?.parente?.Telefone || client?.telefoneParente || "",
      Parentesco: client?.Parentesco || client?.parente?.Parentesco || client?.parentesco || "",
    },
    
    nomeParente: client?.NomeParente || client?.nomeParente || client?.parente?.Nome || "",
    telefoneParente: client?.TelefoneParente || client?.telefoneParente || client?.parente?.Telefone || "",
    parentesco: client?.Parentesco || client?.parentesco || client?.parente?.Parentesco || "",

    sessao: {
      Data: client?.Sessao?.Data || client?.sessao?.Data || "",
      Horario: client?.Sessao?.Horario || client?.sessao?.Horario || "",
      Status: client?.Sessao?.Status || client?.sessao?.Status || "",
      Frequencia: client?.Sessao?.Frequencia || client?.sessao?.Frequencia || "",
    },
  };
};

export const hasNomeSocial = (client: ClientDataUnified | any): boolean => {
  return !!(client?.NomeSocial || client?.nomeSocial);
};