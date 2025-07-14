import { styled } from "@mui/material/styles";
import { Box, Typography, Divider } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
});

export const ContentBox = styled(Box)({
  flex: 1,
  padding: "40px",
  marginLeft: "220px",
  maxWidth: 700,
  marginRight: "auto",
});

export const Title = styled(Typography)({
  marginBottom: 32,
  fontWeight: 600,
});

export const SectionTitle = styled(Typography)({
  marginBottom: 16,
  fontWeight: 600,
});

export const FormControlLabelWrapper = styled(Box)({
  marginBottom: 24,
});

export const FormHelperText = styled(Typography)({
  marginTop: 4,
  marginLeft: 12,
});

export const GridWithMarginBottom = styled(Box)({
  marginBottom: 80,
});

export const SectionDivider = styled(Divider)({
  marginTop: 16,
  marginBottom: 16,
});

export const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 32,
});

export const PersonalInfoSwitchWrapper = styled(Box)({
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  gap: 4,
});

export const ErrorText = styled(Typography)({
  marginTop: 4,
  marginLeft: 12,
});
