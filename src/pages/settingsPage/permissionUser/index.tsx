import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import { useParams } from "react-router-dom";
import { AddUsersModal } from "../../../components/mod/user-Modal";
import { useUsers } from "../../../shared/hooks/searchUser";
import * as S from "./styles";
import type { User } from "../../../types/permissionUser";

const PermissionUsers = () => {
  const { permissionName } = useParams();
  const decodedPermission = decodeURIComponent(permissionName || "");

  const { users: allUsers, loading, error } = useUsers();
  const [usersWithPermission, setUsersWithPermission] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && allUsers.length > 0) {
      const filtered = allUsers.filter((user) =>
        user.permissions?.includes(decodedPermission)
      );
      setUsersWithPermission(filtered);
      console.warn("Usuários com permissão:", filtered);
    }
  }, [allUsers, decodedPermission, loading]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddUsers = (newUsers: User[]) => {
    const updatedUsers = newUsers.map((user) => ({
      ...user,
      permissions: [...(user.permissions || []), decodedPermission],
    }));

    setUsersWithPermission((prev) => [...prev, ...updatedUsers]);
    console.warn("Usuários adicionados:", updatedUsers);
  };

  const handleRemoveUser = (userId: number) => {
    setUsersWithPermission((prev) => prev.filter((u) => u.id !== userId));
    console.warn("Usuário removido:", userId);
  };

  const existingUserIds = usersWithPermission.map((u) => u.id);

  if (loading) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <CircularProgress size={48} />
          <p>Carregando usuários...</p>
        </S.LoadingWrapper>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.ErrorWrapper>
          <Alert severity="error">Erro ao carregar usuários: {error}</Alert>
        </S.ErrorWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Gerenciamento de Permissões</S.Title>
        <S.Subtitle>
          <S.PermissionBadge>{decodedPermission}</S.PermissionBadge>
        </S.Subtitle>
      </S.Header>

      <S.Actions>
        <S.UserCount>
          <GroupIcon />
          Usuários com permissão: <span>{usersWithPermission.length}</span>
        </S.UserCount>

        <S.StyledButton
          onClick={handleOpenModal}
          disabled={
            allUsers.length === 0 || allUsers.length === existingUserIds.length
          }
        >
          <PersonAddIcon />
          {allUsers.length === existingUserIds.length
            ? "Todos já têm esta permissão"
            : "Adicionar Usuário"}
        </S.StyledButton>
      </S.Actions>

      {usersWithPermission.length === 0 ? (
        <S.EmptyState>
          <GroupIcon className="icon" />
          <h3>Nenhum usuário encontrado</h3>
          <p>
            Ainda não há usuários com esta permissão. Clique em "Adicionar
            Usuário" para começar.
          </p>
        </S.EmptyState>
      ) : (
        <S.TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell align="center">Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersWithPermission.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.cpf}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <S.ActionButton onClick={() => handleRemoveUser(user.id)}>
                        <DeleteIcon />
                      </S.ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </S.TableWrapper>
      )}

      <AddUsersModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddUsers}
        users={allUsers}
        existingUserIds={existingUserIds}
      />
    </S.Container>
  );
};

export default PermissionUsers;
