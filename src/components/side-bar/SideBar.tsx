import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  useDrawerContext,
  useAppThemeContext,
} from "../../shared/contexts/IndexContexts";
import { useNavigate, useResolvedPath, useMatch } from "react-router-dom";
import MaterialUISwitch from "../ThemeSwitch";

interface IListItemLinkProps {
  label: string;
  icon: React.ReactNode;
  to: string;
  onClick?: () => void;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  label,
  icon,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    if (onClick) onClick();
  };

  return (
    <ListItemButton
      selected={!!match}
      onClick={handleClick}
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 1,
        px: 2,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: "auto",
          fontSize: 36,
          color: "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        sx={{ textAlign: "center", margin: 0, mt: 0.5 }}
      />
    </ListItemButton>
  );
};

interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();

  const drawerWidth = theme.spacing(15);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={"persistent"}
        PaperProps={{ sx: { width: drawerWidth } }}
      >
        <Box width="100%" height="100%" display="flex" flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(8)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((option) => (
                <ListItemLink
                  key={option.path}
                  icon={option.icon}
                  to={option.path}
                  label={option.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <MaterialUISwitch
                    onChange={toggleTheme}
                    checked={themeName === "dark"}
                  />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          height: "100vh",
          ml: smDown ? 0 : drawerWidth,
          mt: theme.spacing(8),
          p: 2,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
};
