import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  InitColorSchemeScript,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";

import { useAppThemeContext, useDrawerContext } from "../../shared/contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import MaterialUISwitch from "../../componentes/ThemeSwitch";
import { FormControlLabel } from "@mui/material";
import { ReactNode, CSSProperties } from "react";

interface IListItemLinkProps {
  label: string;
  icon: ReactNode;
  to: string;
  flexDirection?: CSSProperties["flexDirection"];
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  label,
  icon,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPatch = useResolvedPath(to);
  const match = useMatch({ path: resolvedPatch.pathname, end: false });

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
        //primaryTypographyProps={{ variant: "caption" }}
      />
    </ListItemButton>
  );
};

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(15)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(8)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Box>

          <Box flex={1}>
            <List component={"nav"}>
              {drawerOptions.map((Options) => (
                <ListItemLink
                  key={Options.path}
                  icon={Options.icon}
                  to={Options.path}
                  label={Options.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component={"nav"}>
              <ListItemButton>
                <ListItemIcon>
                  <MaterialUISwitch
                    onChange={toggleTheme}
                    checked={themeName === "dark"}
                  />
                </ListItemIcon>
                <ListItemText primary="" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(10)}>
        {children}
      </Box>
    </>
  );
};
