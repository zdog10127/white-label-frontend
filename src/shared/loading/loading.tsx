import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { LoadingProps } from "../../types/loading";

const Loading: React.FC<LoadingProps> = ({
  fullScreen = true,
  size = 60,
  padding = 0,
}) => {
  if (fullScreen) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" p={padding}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loading;
