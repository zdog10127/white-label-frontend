import React from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDrawerContext } from "../contexts/DrawerContext";
import { LayoutBasePageProps } from "../../types/layoutBasePage";

export const LayoutBasePage: React.FC<LayoutBasePageProps> = ({
  title,
  children,
  toolsBar,
}) => {
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box width="100%">
      <Box
        height={theme.spacing(8)}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        bgcolor={theme.palette.background.paper}
        boxShadow={1}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1100}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box>{toolsBar}</Box>
      </Box>

      <Box mt={theme.spacing(8)}>{children}</Box>
    </Box>
  );
};
