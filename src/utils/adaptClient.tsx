// src/utils/adaptClient.ts
import dayjs from "dayjs";

export type Sessao = {
  Data: string;
  Horario: string;
  Status: string;
  Frequencia: string;
};

export type Parente = {
  Nome: string;
  Parentesco: string;
  Telefone: string;
};

export type DadosBancarios = {
  Banco: string;
  Agencia: string;
  Conta: string;
};

export type RawClient = {
  NomeCompleto: string;
  CPF: string;
  RG?: string;
  Telefone?: string;
  Email?: string;
  DataNascimento?: string;
  Genero?: string;
  Endereco?: string;
  Plano?: string;
  Convenio?: string;
  Sessao?: Sessao;
  Parente?: Parente;
  DadosBancarios?: DadosBancarios;
  Tags?: string[];
  CorIdentificacao?: string;
};

export type ClientWithExtras = {
  id: number;
  status: "Ativo" | "Inativo" | "Lista de Espera";
  registrationDate: string;
  group: string | null;

  name: string;
  cpf: string;
  rg?: string;
  email?: string;
  cellphone?: string;
  birth?: string;
  gender?: string;
  endereco?: string;
  plano?: string;
  convenio?: string;

  sessao?: Sessao;
  parente?: Parente;
  dadosBancarios?: DadosBancarios;
  tags?: string[];
  corIdentificacao?: string;
};

export function adaptClient(raw: RawClient, index: number): ClientWithExtras {
  return {
    id: index + 1,

    status:
      index % 3 === 0
        ? "Ativo"
        : index % 3 === 1
        ? "Inativo"
        : "Lista de Espera",
    registrationDate: new Date().toISOString().split("T")[0],
    group: index % 2 === 0 ? "Grupo A" : null,

    name: raw.NomeCompleto,
    cpf: raw.CPF,
    rg: raw.RG ?? undefined,
    email: raw.Email ?? undefined,
    cellphone: raw.Telefone ?? undefined,

    birth: raw.DataNascimento
      ? dayjs(raw.DataNascimento, "DD/MM/YYYY").isValid()
        ? dayjs(raw.DataNascimento, "DD/MM/YYYY").toISOString()
        : raw.DataNascimento
      : undefined,

    gender: raw.Genero ?? undefined,
    endereco: raw.Endereco ?? undefined,
    plano: raw.Plano ?? undefined,
    convenio: raw.Convenio ?? undefined,

    sessao: raw.Sessao,
    parente: raw.Parente,
    dadosBancarios: raw.DadosBancarios,
    tags: raw.Tags ?? [],
    corIdentificacao: raw.CorIdentificacao ?? "",
  };
}
