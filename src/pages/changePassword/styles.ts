import { styled } from "@mui/material/styles";
import { Box, Paper, Divider } from "@mui/material";

export const BoxContainer = styled(Box)({
  maxWidth: 480,
  margin: "2rem auto 0",
});

export const StyledPaper = styled(Paper)({
  padding: 32,
});

export const StyledDivider = styled(Divider)({
  marginBottom: 24,
});

export const ButtonsBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 24,
});
