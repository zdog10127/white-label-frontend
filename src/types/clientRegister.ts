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
  Grupo?: string;
  Naturalidade?: string;
  Observacoes?: string;
  Profissao?: string;
  Renda?: string;
  Pagamento?: string;
  DadosBancarios?: {
    Banco?: string;
    Agencia?: string;
    Conta?: string;
  };
  Endereco?: string;
  Numero?: string;
  Complemento?: string;
  Bairro?: string;
  Cidade?: string;
  Estado?: string;
  CEP?: string;
  Escolaridade?: string;
  Parente?: {
    Nome?: string;
    Parentesco?: string;
    Telefone?: string;
  };
  OndeNosConheceu?: string;
  EncaminhadoPor?: string;
  Tags?: string[];
  CorIdentificacao?: string;
  Nacionalidade?: string;
  NomeSocial?: string;
}
