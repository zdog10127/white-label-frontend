import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Grid,
  Tooltip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Key as KeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { User, CreateUserDto, UpdateUserDto, RoleInfo, ChangePasswordDto } from "../types/user";
import { usePermissions, Permissions } from "../hooks/userPermission";
import ProtectedComponent from "../components/ProtectedComponent";
import { translatePermission } from "../utils/permissionTranslations";

export default function UsersListPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Permissões
  const { hasPermission, isAdmin } = usePermissions();
  
  // Modal estados
  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  
  // Form estados
  const [formData, setFormData] = useState<CreateUserDto | UpdateUserDto>({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    active: true,
  });

  // Password form estados
  const [passwordData, setPasswordData] = useState<ChangePasswordDto>({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error: any) {
      console.error("Erro ao carregar usuários:", error);
      toast.error(error.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const data = await userService.getRoles();
      setRoles(data);
    } catch (error: any) {
      console.error("Erro ao carregar roles:", error);
    }
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        active: user.active,
        password: "", // Senha não é enviada para edição
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        active: true,
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      phone: "",
      active: true,
    });
  };

  const handleOpenPasswordModal = (userId: string) => {
    setSelectedUserId(userId);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });
    setConfirmPassword("");
    setOpenPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
    setSelectedUserId("");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });
    setConfirmPassword("");
    setShowPassword(false);
    setShowNewPassword(false);
  };

  const handleSubmit = async () => {
    try {
      // Validações
      if (!formData.name || !formData.email || !formData.role) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      if (!editingUser && !formData.password) {
        toast.error("Senha é obrigatória para novo usuário");
        return;
      }

      if (!editingUser && formData.password && formData.password.length < 6) {
        toast.error("Senha deve ter pelo menos 6 caracteres");
        return;
      }

      if (!userService.validateEmail(formData.email)) {
        toast.error("Email inválido");
        return;
      }

      // Verificar email duplicado
      const emailExists = await userService.emailExists(formData.email, editingUser?.id);
      if (emailExists) {
        toast.error("Email já está em uso");
        return;
      }

      if (editingUser) {
        // Atualizar usuário
        const updated = await userService.update(editingUser.id, formData as UpdateUserDto);
        setUsers(users.map(u => u.id === updated.id ? updated : u));
        toast.success("Usuário atualizado com sucesso!");
      } else {
        // Criar novo usuário
        const created = await userService.create(formData as CreateUserDto);
        setUsers([...users, created]);
        toast.success("Usuário criado com sucesso!");
      }

      handleCloseModal();
    } catch (error: any) {
      console.error("Erro ao salvar usuário:", error);
      toast.error(error.message || "Erro ao salvar usuário");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este usuário?")) {
      return;
    }

    try {
      await userService.delete(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success("Usuário deletado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao deletar usuário:", error);
      toast.error(error.message || "Erro ao deletar usuário");
    }
  };

  const handleChangePassword = async () => {
    try {
      // Validações
      if (!passwordData.currentPassword || !passwordData.newPassword) {
        toast.error("Preencha todos os campos");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        toast.error("Nova senha deve ter pelo menos 6 caracteres");
        return;
      }

      if (passwordData.newPassword !== confirmPassword) {
        toast.error("Senhas não coincidem");
        return;
      }

      await userService.changePassword(selectedUserId, passwordData);
      toast.success("Senha alterada com sucesso!");
      handleClosePasswordModal();
    } catch (error: any) {
      console.error("Erro ao alterar senha:", error);
      toast.error(error.message || "Erro ao alterar senha");
    }
  };

  const getRoleLabel = (role: string): string => {
    const roleInfo = roles.find(r => r.value === role);
    return roleInfo?.label || userService.getRoleLabel(role);
  };

  const getRoleColor = (role: string) => {
    return userService.getRoleColor(role);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Gerenciar Usuários
        </Typography>
        <ProtectedComponent 
          requiredPermissions={[Permissions.CreateUsers]} 
          hideWhenNoPermission
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
          >
            Novo Usuário
          </Button>
        </ProtectedComponent>
      </Box>

      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Nome</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Função</strong></TableCell>
                  <TableCell><strong>Telefone</strong></TableCell>
                  <TableCell><strong>Permissões</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Box py={4}>
                        <Typography color="textSecondary" variant="h6">
                          Nenhum usuário encontrado
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          Clique em "Novo Usuário" para adicionar o primeiro usuário
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              backgroundColor: getRoleColor(user.role),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '1.2rem',
                            }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </Box>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {user.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getRoleLabel(user.role)}
                          size="small"
                          sx={{
                            backgroundColor: getRoleColor(user.role),
                            color: '#fff',
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.phone ? userService.formatPhone(user.phone) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip 
                          title={
                            <Box>
                              <Typography variant="caption" fontWeight="bold">
                                Permissões:
                              </Typography>
                              {user.permissions?.map((perm) => (
                                <Typography key={perm} variant="caption" display="block">
                                  • {translatePermission(perm)}
                                </Typography>
                              ))}
                            </Box>
                          }
                        >
                          <Chip
                            label={`${user.permissions?.length || 0} permissões`}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.active ? 'Ativo' : 'Inativo'}
                          size="small"
                          color={user.active ? 'success' : 'error'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <ProtectedComponent 
                          requiredPermissions={[Permissions.EditUsers]}
                          hideWhenNoPermission
                        >
                          <Tooltip title="Editar">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenModal(user)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </ProtectedComponent>
                        
                        <ProtectedComponent 
                          requiredPermissions={[Permissions.EditUsers]}
                          hideWhenNoPermission
                        >
                          <Tooltip title="Alterar Senha">
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => handleOpenPasswordModal(user.id)}
                            >
                              <KeyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </ProtectedComponent>
                        
                        <ProtectedComponent 
                          requiredPermissions={[Permissions.DeleteUsers]}
                          hideWhenNoPermission
                        >
                          <Tooltip title="Deletar">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(user.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </ProtectedComponent>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Modal Criar/Editar Usuário */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </Typography>
            {editingUser && (
              <Chip
                label={editingUser.active ? 'Ativo' : 'Inativo'}
                color={editingUser.active ? 'success' : 'error'}
                size="small"
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            {/* Informações Básicas */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Informações Básicas
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome Completo *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: João da Silva"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ex: joao@ampara.com"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(00) 00000-0000"
              />
            </Grid>

            {!editingUser && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Senha *"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                  helperText="Mínimo 6 caracteres"
                />
              </Grid>
            )}

            {/* Função/Role */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                Função e Permissões
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Função (Role) *</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  label="Função (Role) *"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {role.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {role.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Exibir permissões da role selecionada */}
            {formData.role && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Permissões da função "{roles.find(r => r.value === formData.role)?.label}":</strong>
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {roles.find(r => r.value === formData.role)?.permissions.map((perm) => (
                      <Chip
                        key={perm}
                        label={translatePermission(perm)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Alert>
              </Grid>
            )}

            {/* Status */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active ?? true}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    color="success"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Usuário Ativo</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Usuários inativos não podem fazer login no sistema
                    </Typography>
                  </Box>
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="contained" size="large">
            {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Alterar Senha */}
      <Dialog open={openPasswordModal} onClose={handleClosePasswordModal} maxWidth="sm" fullWidth>
        <DialogTitle>Alterar Senha</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha Atual *"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nova Senha *"
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
                helperText="Mínimo 6 caracteres"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmar Nova Senha *"
                type={showNewPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword !== '' && confirmPassword !== passwordData.newPassword}
                helperText={
                  confirmPassword !== '' && confirmPassword !== passwordData.newPassword
                    ? 'Senhas não coincidem'
                    : ''
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordModal}>Cancelar</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Alterar Senha
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}