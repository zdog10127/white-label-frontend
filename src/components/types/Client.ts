export interface Client {
  id: number;
  name: string;
  status: "Ativo" | "Inativo";
  registrationDate: string;
  email?: string;
  phone?: string;
}
