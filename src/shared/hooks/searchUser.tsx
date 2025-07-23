import { useState, useEffect } from "react";
import type { User } from "../../types/permissionUser";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch("/user.json");

        if (!response.ok) {
          throw new Error("Falha ao carregar o arquivo user.json");
        }

        const data = await response.json();
        setUsers(data.users || data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar usuários"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
