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
import NotificationBadge from "./NotificationBadge";

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title = "MedInova",
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

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

  const handleProfile = () => {
    handleMenuClose();
    navigate("/perfil");
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
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
            <NotificationBadge /> 

            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="Menu do usuário"
              aria-controls={menuOpen ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : undefined}
            >
              <Avatar
                alt={user?.name || user?.email || "Usuário"}
                src={avatarPreview || undefined}
                sx={{ bgcolor: avatarPreview ? "transparent" : "primary.dark" }}
              >
                {!avatarPreview && firstName
                  ? firstName.charAt(0).toUpperCase()
                  : !avatarPreview && user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 220,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.name || "Usuário"}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        {/* <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Meu Perfil</ListItemText>
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;