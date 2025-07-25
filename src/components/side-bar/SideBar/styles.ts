import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

export const StyledListItemButton = styled(ListItemButton)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  min-width: auto;
  font-size: 36px;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledListItemText = styled(ListItemText)`
  text-align: center;
  margin: 0;
  margin-top: 4px;
`;

const BaseMainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "drawerWidth" && prop !== "smDown",
})<{
  drawerWidth: string;
  smDown: boolean;
}>(({ theme, drawerWidth, smDown }) => ({
  height: "100vh",
  marginLeft: smDown ? 0 : drawerWidth,
  marginTop: theme.spacing(8),
  padding: theme.spacing(1),
  overflow: "auto",
}));

export const MainContent = BaseMainContent.withComponent("main");
