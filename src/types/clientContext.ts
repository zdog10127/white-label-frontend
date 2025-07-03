export type Sessao = {
    Data: string;
    Horario: string;
    Status: string;
    Frequencia: string;
};

export type Client = {
    id: number;
    NomeCompleto: string;
    CPF: string;
    RG?: string;
    Email: string;
    Telefone: string;
    DataNascimento: string;
    Genero?: string;
    Plano?: string;
    Endereco?: string;
    Convenio?: string;
    Sessao?: Sessao;
};

export type ClientsContextData = {
    clients: Client[];
    addClient: (client: Omit<Client, "id">) => void;
    updateClient: (client: Client) => void;
    deleteClient: (id: number) => void;
};