import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title = "White Label",
}) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {onMenuClick && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMenuClick}
              sx={{ ml: 1 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
         

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
};

export default Header;
