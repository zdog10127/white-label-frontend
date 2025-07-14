import { styled } from "@mui/material/styles";
import { Container, Paper, Box } from "@mui/material";

export const BackgroundContainer = styled(Container)({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url('assets/fundo3dbranco.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const LoginPaper = styled(Paper)({
  padding: "80px",
  marginTop: "80px",
  width: 350,
  border: "3px solid",
  borderColor: "gray",
  borderRadius: "16px",
});

export const LinksBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: "80px",
});
