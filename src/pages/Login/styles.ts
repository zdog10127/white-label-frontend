import { styled } from "@mui/material/styles";
import { Container, Paper, Box } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const BackgroundContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url('assets/fundo3dbranco.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 16px",
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: "80px",
  marginTop: "80px",
  width: 350,
  border: "3px solid",
  borderColor: "gray",
  borderRadius: "16px",

  [`@media ${max(device.mobile)}`]: {
    width: "100%",
    padding: "40px 24px",
    marginTop: "40px",
  },
}));

export const LinksBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: "80px",

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: 16,
    marginTop: "40px",
  },
}));
