import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  paddingLeft: 8,
  paddingRight: 16,
  width: "100%",
  boxSizing: "border-box",

  [`@media ${min("900px")}`]: {
    flexDirection: "row",
  },
}));

export const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1.5,
  display: "flex",
  flexDirection: "column",
  gap: 24,

  [`@media ${max(device.mobile)}`]: {
    gap: 16,
  },
}));

export const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 24,

  [`@media ${max(device.mobile)}`]: {
    gap: 16,
  },
}));

export const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: 8,
  width: "100%",
  boxSizing: "border-box",

  [`@media ${max(device.mobile)}`]: {
    padding: 4,
  },
}));

export const ButtonGroupBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 24,

  [`@media ${max(device.mobile)}`]: {
    gap: 8,
    marginBottom: 16,
  },
}));

export const CenterTextBox = styled(Box)(({ theme }) => ({
  marginTop: 24,
  textAlign: "center",

  [`@media ${max(device.mobile)}`]: {
    marginTop: 16,
  },
}));

export const CenteredImage = styled("img")(({ theme }) => ({
  marginBottom: 16,

  [`@media ${max(device.mobile)}`]: {
    marginBottom: 8,
    width: "100%",
    height: "auto",
  },
}));
