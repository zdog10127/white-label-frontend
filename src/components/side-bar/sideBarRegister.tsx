import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Typography,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

type Props = {
  onSelect: (section: string) => void;
  activeSection: string;
};

const SideBarRegister: React.FC<Props> = ({ onSelect, activeSection }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const menuItems = [
    { label: "Principal", value: "principal", icon: <DashboardIcon /> },
    { label: "Cadastro", value: "cadastro", icon: <PersonIcon /> },
    { label: "Sessões", value: "sessoes", icon: <ScheduleIcon /> },
    { label: "Financeiro", value: "financeiro", icon: <AttachMoneyIcon /> },
    { label: "Documentos", value: "documentos", icon: <FolderOpenIcon /> },
    { label: "Preferências", value: "preferencias", icon: <SettingsIcon /> },
  ];

  return (
    <Box
      width={240}
      height="100vh"
      position="fixed"
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 3,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: isDarkMode ? "#2a2a2a" : "#fafafa",
        },
      }}
    >
      <Box>
        <Box px={2} py={3} textAlign="center">
          <Tooltip title="Foto do usuário">
            <Avatar
              alt="Usuário"
              src="/path/to/user-image.jpg"
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                mb: 1,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
          </Tooltip>

          <Typography variant="h6" gutterBottom>
            João Silva
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Cliente
          </Typography>
        </Box>

        <Divider sx={{ borderColor: theme.palette.divider }} />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.value}
              selected={activeSection === item.value}
              onClick={() => onSelect(item.value)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                color:
                  activeSection === item.value
                    ? `${theme.palette.primary.main} !important`
                    : "text.primary",
                bgcolor: isDarkMode
                  ? activeSection === item.value
                    ? "rgba(255,255,255,0.08)"
                    : "transparent"
                  : activeSection === item.value
                  ? "action.selected"
                  : "transparent",
                "&:hover": {
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "action.hover",
                },
                transition: "all 0.2s ease",
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    activeSection === item.value
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBarRegister;
