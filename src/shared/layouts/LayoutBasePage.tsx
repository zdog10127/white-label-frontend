import React, { ReactNode } from "react";
import { Box, flex } from "@mui/system";
import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDrawerContext } from "../contexts";
import { MoveDown } from "@mui/icons-material";
import Header from "../../components/Header";

interface LayoutBasePageProps {
  title: string;
  children: React.ReactNode;
  toolsBar?: ReactNode;
}

export const LayoutBasePage: React.FC<LayoutBasePageProps> = ({
  children,
  title,
  toolsBar,
}) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Header
        onMenuClick={smDown ? toggleDrawerOpen : undefined}
        title="White Label"
      />

      <Box
        padding={5}
        height={"100%"}
        display={"flex"}
        sx={{ minWidth: 0, flexDirection: "column" }}
      >
        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"1"}
        >
          <Box
            padding={1}
            display={"flex"}
            alignItems={"center"}
            gap={"1"}
            height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
          >
            {smDown && (
              <IconButton onClick={toggleDrawerOpen}>
                <Icon>menu</Icon>
              </IconButton>
            )}

            <Typography
              variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
            >
              {title}
            </Typography>
          </Box>
          {toolsBar && <Box>{toolsBar}</Box>}

          <Box flex={1} overflow={"auto"}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};
