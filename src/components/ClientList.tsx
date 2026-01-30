import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  InputAdornment,
  Stack,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Collapse,
  FormControlLabel,
  Checkbox,
  Menu,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Download as DownloadIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { usePermissions, Permissions } from "../hooks/userPermission";
import ProtectedComponent from "./ProtectedComponent";
import {
  exportPatientsToExcel,
  exportFiveYearsReport,
  exportStatisticsReport,
} from "../utils/exportUtils";
import { PatientTableSkeleton } from "./LoadingSkeletons";

const ClientList: React.FC = () => {
  // ============================================
  // STATE
  // ============================================
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Busca e filtros
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  const [genderFilter, setGenderFilter] = useState<string>("Todos");
  const [ageFilter, setAgeFilter] = useState<string>("Todos");
  
  // NOVOS FILTROS AMPARA
  const [treatmentYearFilter, setTreatmentYearFilter] = useState<string>("Todos");
  const [fiveYearsFilter, setFiveYearsFilter] = useState<boolean>(false);
  const [authorizeImageFilter, setAuthorizeImageFilter] = useState<boolean>(false);
  
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Modal de exclusão
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Menu de exportação
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
  const exportMenuOpen = Boolean(exportMenuAnchor);

  const navigate = useNavigate();

  // ============================================
  // CARREGAR PACIENTES DA API
  // ============================================
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📋 Carregando pacientes da API...');
      const data = await patientService.getAll();
      
      console.log('✅ Pacientes carregados:', data.length);
      setPatients(data);
      applyFilters(data, searchTerm, statusFilter, genderFilter, ageFilter, treatmentYearFilter, fiveYearsFilter, authorizeImageFilter);
      
      if (data.length > 0) {
        toast.success(`${data.length} paciente(s) carregado(s)`);
      }
    } catch (error: any) {
      console.error('❌ Erro ao carregar pacientes:', error);
      setError(error.message);
      toast.error('Erro ao carregar pacientes');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // APLICAR FILTROS
  // ============================================
  const applyFilters = (
    data: Patient[],
    search: string,
    status: string,
    gender: string,
    age: string,
    treatmentYear: string,
    fiveYears: boolean,
    authorizeImage: boolean
  ) => {
    let filtered = [...data];

    // Filtro de busca
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((patient) =>
        patient.name.toLowerCase().includes(searchLower) ||
        patient.cpf.includes(search) ||
        patient.email?.toLowerCase().includes(searchLower) ||
        patient.phone.includes(search)
      );
    }

    // Filtro de status
    if (status !== "Todos") {
      filtered = filtered.filter((patient) => {
        if (status === "Ativo") return patient.active === true;
        if (status === "Inativo") return patient.active === false;
        if (status === "Em Análise") return patient.status === "Under Review";
        return true;
      });
    }

    // Filtro de gênero
    if (gender !== "Todos") {
      filtered = filtered.filter((patient) => patient.gender === gender);
    }

    // Filtro de idade
    if (age !== "Todos") {
      filtered = filtered.filter((patient) => {
        const patientAge = calculateAge(patient.birthDate);
        if (age === "0-18") return patientAge <= 18;
        if (age === "19-30") return patientAge >= 19 && patientAge <= 30;
        if (age === "31-50") return patientAge >= 31 && patientAge <= 50;
        if (age === "51-70") return patientAge >= 51 && patientAge <= 70;
        if (age === "70+") return patientAge > 70;
        return true;
      });
    }

    // Filtro de ano de tratamento
    if (treatmentYear !== "Todos") {
      filtered = filtered.filter((patient) => 
        patient.treatmentYear?.toString() === treatmentYear
      );
    }

    // Filtro de 5 anos completados
    if (fiveYears) {
      filtered = filtered.filter((patient) => patient.fiveYears === true);
    }

    // Filtro de autorização de imagem
    if (authorizeImage) {
      filtered = filtered.filter((patient) => patient.authorizeImage === true);
    }

    setFilteredPatients(filtered);
    setPage(0); // Reset para primeira página
  };

  // ============================================
  // HANDLERS DE FILTROS
  // ============================================
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    applyFilters(patients, value, statusFilter, genderFilter, ageFilter, treatmentYearFilter, fiveYearsFilter, authorizeImageFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(patients, searchTerm, value, genderFilter, ageFilter, treatmentYearFilter, fiveYearsFilter, authorizeImageFilter);
  };

  const handleGenderChange = (value: string) => {
    setGenderFilter(value);
    applyFilters(patients, searchTerm, statusFilter, value, ageFilter, treatmentYearFilter, fiveYearsFilter, authorizeImageFilter);
  };

  const handleAgeChange = (value: string) => {
    setAgeFilter(value);
    applyFilters(patients, searchTerm, statusFilter, genderFilter, value, treatmentYearFilter, fiveYearsFilter, authorizeImageFilter);
  };

  // NOVOS HANDLERS AMPARA
  const handleTreatmentYearChange = (value: string) => {
    setTreatmentYearFilter(value);
    applyFilters(patients, searchTerm, statusFilter, genderFilter, ageFilter, value, fiveYearsFilter, authorizeImageFilter);
  };

  const handleFiveYearsChange = (checked: boolean) => {
    setFiveYearsFilter(checked);
    applyFilters(patients, searchTerm, statusFilter, genderFilter, ageFilter, treatmentYearFilter, checked, authorizeImageFilter);
  };

  const handleAuthorizeImageChange = (checked: boolean) => {
    setAuthorizeImageFilter(checked);
    applyFilters(patients, searchTerm, statusFilter, genderFilter, ageFilter, treatmentYearFilter, fiveYearsFilter, checked);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("Todos");
    setGenderFilter("Todos");
    setAgeFilter("Todos");
    setTreatmentYearFilter("Todos");
    setFiveYearsFilter(false);
    setAuthorizeImageFilter(false);
    applyFilters(patients, "", "Todos", "Todos", "Todos", "Todos", false, false);
  };

  // ============================================
  // MODAL DE EXCLUSÃO
  // ============================================
  const openDeleteModal = (id: string, name: string) => {
    setPatientToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!patientToDelete) return;

    try {
      setDeleting(true);
      console.log('🗑️ Deletando paciente:', patientToDelete.id);
      
      await patientService.delete(patientToDelete.id);
      
      toast.success('Paciente excluído com sucesso!');
      
      setDeleteModalOpen(false);
      setPatientToDelete(null);
      
      loadPatients();
    } catch (error: any) {
      console.error('❌ Erro ao deletar:', error);
      toast.error('Erro ao excluir paciente');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPatientToDelete(null);
  };

  // ============================================
  // PAGINAÇÃO
  // ============================================
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ============================================
  // CARREGAR AO MONTAR
  // ============================================
  useEffect(() => {
    loadPatients();
  }, []);

  // ============================================
  // FORMATAR DATA
  // ============================================
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  // ============================================
  // CALCULAR IDADE
  // ============================================
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // ============================================
  // DADOS PAGINADOS
  // ============================================
  const paginatedPatients = filteredPatients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ============================================
  // FUNÇÃO PARA OBTER ANOS DE TRATAMENTO DISPONÍVEIS
  // ============================================
  const getAvailableTreatmentYears = (): string[] => {
    const years = new Set<string>();
    patients.forEach(patient => {
      if (patient.treatmentYear) {
        years.add(patient.treatmentYear.toString());
      }
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Ordem decrescente
  };

  // ============================================
  // CONTADOR DE FILTROS ATIVOS
  // ============================================
  const activeFiltersCount = [
    statusFilter !== "Todos",
    genderFilter !== "Todos",
    ageFilter !== "Todos",
    treatmentYearFilter !== "Todos",
    fiveYearsFilter,
    authorizeImageFilter,
  ].filter(Boolean).length;

  // ============================================
  // HANDLERS DE EXPORTAÇÃO
  // ============================================
  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };

  const handleExportAll = () => {
    try {
      exportPatientsToExcel(filteredPatients, `pacientes_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success(`${filteredPatients.length} paciente(s) exportado(s)!`);
      handleExportMenuClose();
    } catch (error) {
      toast.error("Erro ao exportar dados");
      console.error(error);
    }
  };

  const handleExportFiveYears = () => {
    try {
      exportFiveYearsReport(patients, `pacientes_5anos_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Relatório de pacientes com 5 anos exportado!");
      handleExportMenuClose();
    } catch (error) {
      toast.error("Erro ao exportar relatório");
      console.error(error);
    }
  };

  const handleExportStatistics = () => {
    try {
      exportStatisticsReport(patients, `estatisticas_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Estatísticas exportadas!");
      handleExportMenuClose();
    } catch (error) {
      toast.error("Erro ao exportar estatísticas");
      console.error(error);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <Box p={3}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Listagem de Clientes
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportMenuOpen}
            disabled={loading || patients.length === 0}
          >
            Exportar
          </Button>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadPatients}
            disabled={loading}
          >
            Atualizar
          </Button>
          
          <ProtectedComponent 
            requiredPermissions={[Permissions.CreatePatients]}
            hideWhenNoPermission
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/cadastro-usuario')}
            >
              Adicionar Cliente
            </Button>
          </ProtectedComponent>
        </Stack>
      </Box>

      {/* Menu de Exportação */}
      <Menu
        anchorEl={exportMenuAnchor}
        open={exportMenuOpen}
        onClose={handleExportMenuClose}
      >
        <MenuItem onClick={handleExportAll}>
          <DescriptionIcon sx={{ mr: 1 }} fontSize="small" />
          Exportar Lista Atual ({filteredPatients.length} pacientes)
        </MenuItem>
        <MenuItem onClick={handleExportFiveYears}>
          <DescriptionIcon sx={{ mr: 1 }} fontSize="small" />
          Relatório: Pacientes com 5 Anos
        </MenuItem>
        <MenuItem onClick={handleExportStatistics}>
          <DescriptionIcon sx={{ mr: 1 }} fontSize="small" />
          Relatório: Estatísticas Gerais
        </MenuItem>
      </Menu>

      {/* Busca e Botão de Filtros */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          placeholder="Pesquisar por nome, CPF, email ou telefone..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          size="small"
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          variant={showFilters ? "contained" : "outlined"}
          startIcon={<FilterIcon />}
          onClick={() => setShowFilters(!showFilters)}
          disabled={loading}
        >
          Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </Stack>

      {/* Painel de Filtros Avançados */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                  <MenuItem value="Em Análise">Em Análise</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Gênero</InputLabel>
                <Select
                  value={genderFilter}
                  label="Gênero"
                  onChange={(e) => handleGenderChange(e.target.value)}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Faixa Etária</InputLabel>
                <Select
                  value={ageFilter}
                  label="Faixa Etária"
                  onChange={(e) => handleAgeChange(e.target.value)}
                >
                  <MenuItem value="Todos">Todas</MenuItem>
                  <MenuItem value="0-18">0-18 anos</MenuItem>
                  <MenuItem value="19-30">19-30 anos</MenuItem>
                  <MenuItem value="31-50">31-50 anos</MenuItem>
                  <MenuItem value="51-70">51-70 anos</MenuItem>
                  <MenuItem value="70+">70+ anos</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* NOVOS FILTROS AMPARA */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Ano Tratamento</InputLabel>
                <Select
                  value={treatmentYearFilter}
                  label="Ano Tratamento"
                  onChange={(e) => handleTreatmentYearChange(e.target.value)}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  {getAvailableTreatmentYears().map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fiveYearsFilter}
                    onChange={(e) => handleFiveYearsChange(e.target.checked)}
                  />
                }
                label="Completou 5 anos"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={authorizeImageFilter}
                    onChange={(e) => handleAuthorizeImageChange(e.target.checked)}
                  />
                }
                label="Autoriza imagem"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                disabled={activeFiltersCount === 0}
              >
                Limpar Filtros
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>

      {/* Contador */}
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary">
          Exibindo {paginatedPatients.length} de {filteredPatients.length} cliente(s)
          {searchTerm && ` (filtrado de ${patients.length} total)`}
          {activeFiltersCount > 0 && ` • ${activeFiltersCount} filtro(s) ativo(s)`}
        </Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box mb={3}>
          <PatientTableSkeleton rows={rowsPerPage} />
        </Box>
      )}

      {/* Erro */}
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button size="small" onClick={loadPatients} sx={{ ml: 2 }}>
            Tentar Novamente
          </Button>
        </Alert>
      )}

      {/* Lista Vazia */}
      {!loading && !error && filteredPatients.length === 0 && (
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm || activeFiltersCount > 0
              ? 'Nenhum cliente encontrado com os filtros aplicados'
              : 'Nenhum cliente cadastrado'}
          </Typography>
          {(searchTerm || activeFiltersCount > 0) && (
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              sx={{ mt: 2 }}
            >
              Limpar Filtros
            </Button>
          )}
          {!searchTerm && activeFiltersCount === 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/cadastro-usuario')}
              sx={{ mt: 2 }}
            >
              Cadastrar Primeiro Cliente
            </Button>
          )}
        </Paper>
      )}

      {/* Tabela */}
      {!loading && !error && paginatedPatients.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    Nome do Cliente
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    CPF
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    Idade
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    Telefone
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    E-mail
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    Data do Cadastro
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPatients.map((patient) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>
                      <Typography fontWeight="medium">{patient.name}</Typography>
                    </TableCell>
                    
                    <TableCell>{patientService.formatCPF(patient.cpf)}</TableCell>
                    
                    <TableCell>{calculateAge(patient.birthDate)} anos</TableCell>
                    
                    <TableCell>{patient.phone}</TableCell>
                    
                    <TableCell>{patient.email || '-'}</TableCell>
                    
                    <TableCell>
                      <Chip
                        label={patient.status || 'Em Análise'}
                        color={patient.active ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    
                    <TableCell>{formatDate(patient.registrationDate)}</TableCell>
                    
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => navigate(`/clientes/${patient.id}`)}
                          title="Ver Detalhes"
                        >
                          <ViewIcon />
                        </IconButton>
                        
                        <ProtectedComponent 
                          requiredPermissions={[Permissions.EditPatients]}
                          hideWhenNoPermission
                        >
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/clientes/${patient.id}/editar`)}
                            title="Editar"
                          >
                            <EditIcon />
                          </IconButton>
                        </ProtectedComponent>
                        
                        <ProtectedComponent 
                          requiredPermissions={[Permissions.DeletePatients]}
                          hideWhenNoPermission
                        >
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => openDeleteModal(patient.id!, patient.name)}
                            title="Excluir"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ProtectedComponent>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination
            component="div"
            count={filteredPatients.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
          />
        </>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleDelete}
        patientName={patientToDelete?.name || ""}
        loading={deleting}
      />
    </Box>
  );
};

export default ClientList;