import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
  Typography,
  InputAdornment,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";
import type { User } from "../../../types/permissionUser";
import * as S from "./styles";

interface AddUsersModalProps {
  open: boolean;
  onClose: () => void;
  users: User[];
  onAdd: (selectedUsers: User[]) => void;
  existingUserIds: number[];
}

export function AddUsersModal({
  open,
  onClose,
  users,
  onAdd,
  existingUserIds,
}: AddUsersModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      setSelectedUserIds([]);
    }
  }, [open]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users
    .filter((user) => !existingUserIds.includes(user.id))
    .filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm) ||
        user.name.toLowerCase().includes(searchTerm) ||
        user.cpf.toLowerCase().includes(searchTerm)
    );

  const handleToggleUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const handleAdd = () => {
    const selectedUsers = users.filter((u) => selectedUserIds.includes(u.id));
    onAdd(selectedUsers);
    onClose();
  };

  const allSelected =
    filteredUsers.length > 0 && selectedUserIds.length === filteredUsers.length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <S.StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <S.StyledDialogTitle>
        <S.HeaderInfo>
          <GroupAddIcon sx={{ fontSize: 28, color: "primary.main" }} />
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
              Adicionar Usuários
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Selecione os usuários para adicionar permissões
            </Typography>
          </Box>
        </S.HeaderInfo>
        <S.CloseButton onClick={onClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.StyledDialogTitle>

      <S.StyledDialogContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <S.StyledTextField
            variant="outlined"
            placeholder="Pesquisar por nome, e-mail ou CPF..."
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <S.ResultsChip
            label={`${filteredUsers.length} usuários`}
            size="small"
          />
        </Box>

        <S.TableContainer>
          <Table stickyHeader size="small" aria-label="user table">
            <S.StyledTableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    onChange={handleToggleAll}
                    inputProps={{ "aria-label": "select all users" }}
                    color="primary"
                  />
                </TableCell>
                <TableCell>Usuário</TableCell>
              </TableRow>
            </S.StyledTableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <S.EmptyState>
                      <PersonIcon className="icon" />
                      <Typography variant="h6" gutterBottom>
                        {searchTerm
                          ? "Nenhum usuário encontrado"
                          : "Nenhum usuário disponível"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchTerm
                          ? "Tente ajustar os termos de busca"
                          : "Todos os usuários já possuem esta permissão"}
                      </Typography>
                    </S.EmptyState>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <S.StyledTableRow key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleToggleUser(user.id)}
                        inputProps={{ "aria-labelledby": `user-${user.id}` }}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell id={`user-${user.id}`}>
                      <S.UserInfo>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "primary.main",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <S.UserDetails>
                          <Typography
                            fontWeight="bold"
                            sx={{ fontSize: "15px", lineHeight: 1.2 }}
                          >
                            {user.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "13px" }}
                          >
                            {user.email}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "12px" }}
                          >
                            CPF: {user.cpf}
                          </Typography>
                        </S.UserDetails>
                      </S.UserInfo>
                    </TableCell>
                  </S.StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </S.TableContainer>
      </S.StyledDialogContent>

      <S.StyledDialogActions>
        <S.StyledButton variant="outlined" onClick={onClose} color="inherit">
          Cancelar
        </S.StyledButton>
        <S.StyledButton
          variant="contained"
          onClick={handleAdd}
          disabled={selectedUserIds.length === 0}
          startIcon={<GroupAddIcon />}
        >
          Adicionar{" "}
          {selectedUserIds.length > 0 && `(${selectedUserIds.length})`}
        </S.StyledButton>
      </S.StyledDialogActions>
    </S.StyledDialog>
  );
}
