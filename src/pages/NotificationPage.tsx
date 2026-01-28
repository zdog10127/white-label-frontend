import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import patientService from "../services/patientService";
import {
  generateNotifications,
  Notification,
  getNotificationStats,
  filterNotificationsByType,
  filterNotificationsByPriority,
} from "../services/notificationService";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [notifications, typeFilter, priorityFilter]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const patients = await patientService.getAll();
      const allNotifications = generateNotifications(patients);
      setNotifications(allNotifications);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = notifications;

    if (typeFilter !== "all") {
      filtered = filterNotificationsByType(
        filtered,
        typeFilter as "warning" | "info" | "error" | "all"
      );
    }

    if (priorityFilter !== "all") {
      filtered = filterNotificationsByPriority(
        filtered,
        priorityFilter as "high" | "medium" | "low" | "all"
      );
    }

    setFilteredNotifications(filtered);
  };

  const handleTypeFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter !== null) {
      setTypeFilter(newFilter);
    }
  };

  const handlePriorityFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter !== null) {
      setPriorityFilter(newFilter);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.patientId) {
      navigate(`/clientes/${notification.patientId}`);
    }
  };

  const stats = getNotificationStats(notifications);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return <WarningIcon color="warning" />;
      case "error":
        return <ErrorIcon color="error" />;
      case "info":
        return <InfoIcon color="info" />;
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
    }
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Central de Notificações
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Alertas e avisos importantes do sistema
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={loadNotifications}
          disabled={loading}
        >
          Atualizar
        </Button>
      </Box>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total de Notificações
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: "4px solid", borderLeftColor: "error.main" }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Alta Prioridade
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="error">
                {stats.high}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: "4px solid", borderLeftColor: "warning.main" }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Média Prioridade
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="warning.main">
                {stats.medium}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: "4px solid", borderLeftColor: "info.main" }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Baixa Prioridade
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="info.main">
                {stats.low}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Box flex={1}>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                Filtrar por Tipo
              </Typography>
              <ToggleButtonGroup
                value={typeFilter}
                exclusive
                onChange={handleTypeFilterChange}
                size="small"
                fullWidth
              >
                <ToggleButton value="all">Todos ({stats.total})</ToggleButton>
                <ToggleButton value="warning">Avisos ({stats.warnings})</ToggleButton>
                <ToggleButton value="error">Erros ({stats.errors})</ToggleButton>
                <ToggleButton value="info">Info ({stats.info})</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box flex={1}>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                Filtrar por Prioridade
              </Typography>
              <ToggleButtonGroup
                value={priorityFilter}
                exclusive
                onChange={handlePriorityFilterChange}
                size="small"
                fullWidth
              >
                <ToggleButton value="all">Todas</ToggleButton>
                <ToggleButton value="high">Alta ({stats.high})</ToggleButton>
                <ToggleButton value="medium">Média ({stats.medium})</ToggleButton>
                <ToggleButton value="low">Baixa ({stats.low})</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      {filteredNotifications.length === 0 ? (
        <Alert severity="success">
          Nenhuma notificação encontrada com os filtros selecionados! 🎉
        </Alert>
      ) : (
        <Card>
          <List>
            {filteredNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  component="button"
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    borderLeft: "4px solid",
                    borderLeftColor: `${getPriorityColor(notification.priority)}.main`,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <Typography variant="body1" fontWeight="medium">
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.priority === "high" ? "URGENTE" : notification.priority}
                          size="small"
                          color={getPriorityColor(notification.priority)}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        {notification.patientName && (
                          <Typography variant="caption" color="primary" sx={{ mt: 0.5, display: "block" }}>
                            Clique para ver detalhes de {notification.patientName}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
                {index < filteredNotifications.length - 1 && <Box component="hr" sx={{ m: 0, border: "none", borderBottom: "1px solid", borderColor: "divider" }} />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      )}
    </Box>
  );
};

export default NotificationsPage;