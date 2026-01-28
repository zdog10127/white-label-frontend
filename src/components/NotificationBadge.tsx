import React, { useState, useEffect } from "react";
import {
  IconButton,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import patientService from "../services/patientService";
import {
  generateNotifications,
  Notification,
  getNotificationStats,
} from "../services/notificationService";

const NotificationBadge: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const patients = await patientService.getAll();
      const allNotifications = generateNotifications(patients);
      setNotifications(allNotifications);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.patientId) {
      navigate(`/clientes/${notification.patientId}`);
      handleClose();
    }
  };

  const stats = getNotificationStats(notifications);
  const highPriorityCount = stats.high;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "warning":
        return <WarningIcon color="warning" />;
      case "error":
        return <ErrorIcon color="error" />;
      case "info":
        return <InfoIcon color="info" />;
      default:
        return <CheckCircleIcon />;
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

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={highPriorityCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 420, maxHeight: 600 },
        }}
      >
        <Box px={2} py={1.5}>
          <Typography variant="h6" fontWeight="bold">
            Central de Notificações
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            <Chip label={`${stats.high} Alta`} size="small" color="error" />
            <Chip label={`${stats.medium} Média`} size="small" color="warning" />
            <Chip label={`${stats.low} Baixa`} size="small" color="info" />
          </Box>
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <Box p={3} textAlign="center">
            <CheckCircleIcon sx={{ fontSize: 48, color: "success.main", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Nenhuma notificação pendente! 🎉
            </Typography>
          </Box>
        ) : (
          <List sx={{ maxHeight: 400, overflow: "auto" }}>
            {notifications.slice(0, 10).map((notification) => (
              <ListItem
                key={notification.id}
                component="button"
                disablePadding
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  borderLeft: "4px solid",
                  borderLeftColor: `${getPriorityColor(notification.priority)}.main`,
                  "&:hover": { bgcolor: "action.hover" },
                  p: 2,
                  display: "flex",
                  cursor: "pointer",
                  border: "none",
                  background: "inherit",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" fontWeight="medium">
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.priority === "high" ? "URGENTE" : notification.priority}
                        size="small"
                        color={getPriorityColor(notification.priority)}
                        sx={{ height: 18 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        {notifications.length > 10 && (
          <>
            <Divider />
            <Box p={1.5} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                + {notifications.length - 10} notificações adicionais
              </Typography>
            </Box>
          </>
        )}

        <Divider />
        <Box p={1.5}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              navigate("/notificacoes");
              handleClose();
            }}
          >
            Ver Todas as Notificações
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationBadge;