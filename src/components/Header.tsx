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
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled("input")(({ theme }) => ({
  color: "inherit",
  paddingLeft: `calc(1em + ${theme.spacing(5)})`,
  width: "100%",
}));

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
            sx={{ mr: 2 }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ minWidth: 100 }}>
          {title}
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar clientes..."
            aria-label="Pesquisar clientes"
          />
        </Search>
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
