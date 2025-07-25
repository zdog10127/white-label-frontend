import { Box, ListItemButton, ListItemIcon, styled } from "@mui/material";

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDarkMode",
})<{ isDarkMode: boolean }>(({ theme, isDarkMode }) => ({
  width: 240,
  height: "100vh",
  position: "fixed",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  borderRight: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: isDarkMode ? "#2a2a2a" : "#fafafa",
  },
}));

export const SidebarHeader = styled(Box)`
  padding: 24px 16px;
  text-align: center;
`;

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isDarkMode",
})<{
  isSelected: boolean;
  isDarkMode: boolean;
}>(({ theme, isSelected, isDarkMode }) => ({
  borderRadius: 8,
  marginBottom: 4,
  color: isSelected ? `${theme.palette.primary.main} !important` : "inherit",
  backgroundColor: isDarkMode
    ? isSelected
      ? "rgba(255,255,255,0.08)"
      : "transparent"
    : isSelected
    ? theme.palette.action.selected
    : "transparent",
  "&:hover": {
    backgroundColor: isDarkMode
      ? "rgba(255,255,255,0.05)"
      : theme.palette.action.hover,
  },
  transition: "all 0.2s ease",
}));

export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  color: isSelected ? theme.palette.primary.main : "inherit",
}));
