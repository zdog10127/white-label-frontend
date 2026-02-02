import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/contexts/AuthContext";
import { HeaderProps } from "../types/header";
import Logo from "./Logo";
import { toast } from "react-toastify";

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title = "MedInova",
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (user?.email) {
      const savedImage = localStorage.getItem(
        `user-profile-image-${user.email}`
      );
      setAvatarPreview(savedImage || user.avatar || null);

      const savedData = localStorage.getItem(`user-profile-data-${user.email}`);
      if (savedData) {
        const profileData = JSON.parse(savedData);
        if (profileData.firstName) setFirstName(profileData.firstName);
      }
    }
  }, [user]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/login");
  };

  // Obter inicial do nome do usuário
  const getUserInitial = () => {
    if (firstName) return firstName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <AppBar
      position="fixed"
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: (theme) => 
          theme.palette.mode === 'dark'
            ? '0 4px 20px 0 rgba(0,0,0,0.4)'
            : '0 2px 10px 0 rgba(25,118,210,0.2)',
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {onMenuClick && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMenuClick}
              sx={{ 
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo + Título */}
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1.5,
              cursor: 'pointer',
            }}
            onClick={() => navigate("/home")}
          >
            <Logo size={40} variant="icon" />
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* <IconButton 
            color="inherit" 
            aria-label="Notificações"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-label="Menu do usuário"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Avatar
              alt={user?.email || "Usuário"}
              src={avatarPreview || undefined}
              sx={{ 
                bgcolor: avatarPreview ? "transparent" : "rgba(255, 255, 255, 0.2)",
                border: '2px solid rgba(255, 255, 255, 0.3)',
                width: 40,
                height: 40,
                fontWeight: 600,
              }}
            >
              {!avatarPreview && getUserInitial()}
            </Avatar>
          </IconButton>

          {/* Menu do Usuário */}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 8,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                mt: 1.5,
                minWidth: 200,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            {/* Info do Usuário */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" noWrap>
                {firstName || "Usuário"}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            </Box>

            <Divider />

            {/* Opção de Logout */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sair</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;