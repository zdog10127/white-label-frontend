import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  paddingLeft: 8,
  paddingRight: 16,
  width: "100%",
  boxSizing: "border-box",

  "@media (min-width: 900px)": {
    flexDirection: "row",
  },
});

export const LeftPanel = styled(Box)({
  flex: 1.5,
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const RightPanel = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const PaperStyled = styled(Paper)({
  padding: 8,
  width: "100%",
  boxSizing: "border-box",
});

export const ButtonGroupBox = styled(Box)({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 24,
});

export const CenterTextBox = styled(Box)({
  marginTop: 24,
  textAlign: "center",
});

export const CenteredImage = styled("img")({
  marginBottom: 16,
});
