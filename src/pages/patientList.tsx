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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";

const PatientList: React.FC = () => {
  // ============================================
  // STATE
  // ============================================
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  // ============================================
  // CARREGAR PACIENTES
  // ============================================
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📋 Carregando pacientes...');
      const data = await patientService.getAll();
      
      console.log('✅ Pacientes carregados:', data.length);
      setPatients(data);
      setFilteredPatients(data);
      
      toast.success(`${data.length} paciente(s) carregado(s)`);
    } catch (error: any) {
      console.error('❌ Erro ao carregar pacientes:', error);
      setError(error.message);
      toast.error('Erro ao carregar pacientes');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // BUSCAR/FILTRAR
  // ============================================
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter((patient) => {
      const searchLower = term.toLowerCase();
      return (
        patient.name.toLowerCase().includes(searchLower) ||
        patient.cpf.includes(term) ||
        patient.email?.toLowerCase().includes(searchLower) ||
        patient.phone.includes(term)
      );
    });

    setFilteredPatients(filtered);
  };

  // ============================================
  // DELETAR PACIENTE
  // ============================================
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja deletar o paciente ${name}?`)) {
      return;
    }

    try {
      console.log('🗑️ Deletando paciente:', id);
      await patientService.delete(id);
      
      toast.success('Paciente deletado com sucesso!');
      loadPatients(); // Recarregar lista
    } catch (error: any) {
      console.error('❌ Erro ao deletar:', error);
      toast.error('Erro ao deletar paciente');
    }
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
  // RENDER
  // ============================================
  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Pacientes
        </Typography>
        
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadPatients}
            disabled={loading}
          >
            Atualizar
          </Button>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/pacientes/novo')}
          >
            Novo Paciente
          </Button>
        </Box>
      </Box>

      {/* Busca */}
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Buscar por nome, CPF, email ou telefone..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Contador */}
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary">
          {filteredPatients.length} de {patients.length} paciente(s)
        </Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      )}

      {/* Erro */}
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Lista Vazia */}
      {!loading && !error && filteredPatients.length === 0 && (
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/pacientes/novo')}
              sx={{ mt: 2 }}
            >
              Cadastrar Primeiro Paciente
            </Button>
          )}
        </Paper>
      )}

      {/* Tabela */}
      {!loading && !error && filteredPatients.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CPF</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Idade</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Telefone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cadastro</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>
                    <Typography fontWeight="medium">{patient.name}</Typography>
                    {patient.email && (
                      <Typography variant="caption" color="text.secondary">
                        {patient.email}
                      </Typography>
                    )}
                  </TableCell>
                  
                  <TableCell>{patientService.formatCPF(patient.cpf)}</TableCell>
                  
                  <TableCell>{calculateAge(patient.birthDate)} anos</TableCell>
                  
                  <TableCell>{patient.phone}</TableCell>
                  
                  <TableCell>
                    <Chip
                      label={patient.status || 'Em Análise'}
                      color={patient.active ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  
                  <TableCell>{formatDate(patient.registrationDate)}</TableCell>
                  
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => navigate(`/pacientes/${patient.id}`)}
                        title="Ver Detalhes"
                      >
                        <ViewIcon />
                      </IconButton>
                      
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/pacientes/${patient.id}/editar`)}
                        title="Editar"
                      >
                        <EditIcon />
                      </IconButton>
                      
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(patient.id!, patient.name)}
                        title="Deletar"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PatientList;