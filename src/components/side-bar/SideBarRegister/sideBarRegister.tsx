import React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  SidebarContainer,
  SidebarHeader,
  StyledListItemButton,
  StyledListItemIcon,
} from "./styles";

type Props = {
  onSelect: (section: string) => void;
  activeSection: string;
  clientName?: string;
  clientImageUrl?: string;
};

const SideBarRegister: React.FC<Props> = ({
  onSelect,
  activeSection,
  clientName,
  clientImageUrl,
}) => {
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
    <SidebarContainer isDarkMode={isDarkMode}>
      <div>
        <SidebarHeader>
          <Tooltip title="Foto do cliente">
            <Avatar
              alt={clientName || "Cliente"}
              src={
                clientImageUrl
                  ? clientImageUrl
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      clientName || "Cliente"
                    )}`
              }
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
            {clientName || "Cliente"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Cliente
          </Typography>
        </SidebarHeader>

        <Divider sx={{ borderColor: theme.palette.divider }} />

        <List>
          {menuItems.map((item) => (
            <StyledListItemButton
              key={item.value}
              selected={activeSection === item.value}
              onClick={() => onSelect(item.value)}
              isDarkMode={isDarkMode}
              isSelected={activeSection === item.value}
            >
              <StyledListItemIcon isSelected={activeSection === item.value}>
                {item.icon}
              </StyledListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItemButton>
          ))}
        </List>
      </div>
    </SidebarContainer>
  );
};

export default SideBarRegister;
