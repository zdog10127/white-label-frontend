import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title = "White Label",
}) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
        {onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ ml: 2 }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <IconButton color="inherit" aria-label="Notificações">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar alt="Usuário" src="/caminho/para/imagem.jpg" />
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
