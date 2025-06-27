import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/contexts/AuthContext";

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title = "White Label",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

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

  return (
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
          <IconButton color="inherit" aria-label="Notificações">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => navigate("/perfil")}
            aria-label="Perfil do usuário"
          >
            <Avatar
              alt={user?.email || "Usuário"}
              src={avatarPreview || undefined}
              sx={{ bgcolor: avatarPreview ? "transparent" : undefined }}
            >
              {!avatarPreview && firstName
                ? firstName.charAt(0).toUpperCase()
                : !avatarPreview
                ? "U"
                : null}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
