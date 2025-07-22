import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
  Typography,
  InputAdornment,
  Chip,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import type { User } from "../../types/permissionUser";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "700px",
    width: "100%",
    margin: "16px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(0,0,0,0.5)"
        : "0 24px 48px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      borderRadius: "12px",
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: "24px 32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "32px",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 4px 12px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
}));

const TableContainer = styled(Box)(({ theme }) => ({
  maxHeight: "400px",
  overflowY: "auto",
  marginTop: "20px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 16px rgba(0,0,0,0.3)"
      : "0 4px 16px rgba(0,0,0,0.08)",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.action.hover,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.text.disabled,
    borderRadius: "3px",
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  background:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  "& .MuiTableCell-root": {
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: "20px 24px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.002)",
  },
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "16px 24px",
  },
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
}));

const UserDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "24px 32px",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: "12px",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
    flexDirection: "column-reverse",
    "& > :not(:first-of-type)": {
      marginLeft: 0,
      marginBottom: "8px",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontWeight: 600,
  padding: "12px 24px",
  textTransform: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 12px rgba(0,0,0,0.4)"
        : "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

const HeaderInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1,
}));

const CloseButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  width: "40px",
  height: "40px",
  padding: 0,
  borderRadius: "50%",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

const ResultsChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main + "20",
  color: theme.palette.primary.main,
  fontWeight: 600,
  "& .MuiChip-label": {
    fontSize: "12px",
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "60px 20px",
  color: theme.palette.text.secondary,
  "& .icon": {
    fontSize: "48px",
    marginBottom: "16px",
    opacity: 0.7,
  },
}));

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
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <HeaderInfo>
          <GroupAddIcon sx={{ fontSize: 28, color: "primary.main" }} />
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
              Adicionar Usuários
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Selecione os usuários para adicionar permissões
            </Typography>
          </Box>
        </HeaderInfo>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <StyledTextField
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
          <ResultsChip
            label={`${filteredUsers.length} usuários`}
            size="small"
          />
        </Box>

        <TableContainer>
          <Table stickyHeader size="small" aria-label="user table">
            <StyledTableHead>
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
            </StyledTableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    <EmptyState>
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
                    </EmptyState>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <StyledTableRow key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleToggleUser(user.id)}
                        inputProps={{ "aria-labelledby": `user-${user.id}` }}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell id={`user-${user.id}`}>
                      <UserInfo>
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
                        <UserDetails>
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
                        </UserDetails>
                      </UserInfo>
                    </TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledDialogContent>

      <StyledDialogActions>
        <StyledButton variant="outlined" onClick={onClose} color="inherit">
          Cancelar
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={handleAdd}
          disabled={selectedUserIds.length === 0}
          startIcon={<GroupAddIcon />}
        >
          Adicionar{" "}
          {selectedUserIds.length > 0 && `(${selectedUserIds.length})`}
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}
