export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  avatar?: string;

  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  occupation?: string;

  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip?: string;
}
