export type ClientType = {
    NomeCompleto: string;
    CPF: string;
    DataNascimento: string;
    Telefone: string;
    Email: string;
    Genero: string;
    Endereco: string;
    Plano: string;
    Convenio: string;
    Sessao: any;
};

export type Props = {
    open: boolean;
    client: ClientType | null;
    onClose: () => void;
};