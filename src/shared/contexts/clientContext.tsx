import { createContext, useContext, useState, ReactNode } from "react";
import clientsData from "../../components/data/clients.json";
import { Client, ClientsContextData } from "../../types/clientContext";

const ClientsContext = createContext<ClientsContextData | undefined>(undefined);

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const initialClients: Client[] = clientsData.map((client, index) => ({
    id: index + 1,
    NomeCompleto: client.NomeCompleto,
    CPF: client.CPF,
    DataNascimento: client.DataNascimento,
    Telefone: client.Telefone,
    Email: client.Email,
    Genero: client.Genero ?? "",
    Plano: client.Plano ?? "",
    Endereco: client.Endereco ?? "",
    Convenio: client.Convenio ?? "",
    Sessao: client.Sessao ?? undefined,
    RG: undefined,
  }));

  const [clients, setClients] = useState<Client[]>(initialClients);

  const addClient = (client: Omit<Client, "id">) => {
    const newId =
      clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    const newClient: Client = { id: newId, ...client };
    setClients((prev) => [...prev, newClient]);
  };

  const updateClient = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  const deleteClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ClientsContext.Provider
      value={{ clients, addClient, updateClient, deleteClient }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients deve ser usado dentro de ClientsProvider");
  }
  return context;
};
