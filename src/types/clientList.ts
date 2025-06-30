export type RawClient = {
  NomeCompleto: string;
  Email?: string;
  Telefone?: string;
};

export interface ExtendedClient {
  id: number;
  name: string;
  status: "Ativo" | "Inativo" | "Lista de Espera";
  registrationDate: string;
  email?: string;
  phone?: string;
  group?: string | null;
}
