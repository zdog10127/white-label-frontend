import { styled } from "@mui/material/styles";
import { device, max } from "../../constants/responsiveClient";

export const Container = styled("div")(({ theme }) => ({
  padding: "2rem",
  textAlign: "center",

  [`@media ${max(device.mobile)}`]: {
    padding: "1rem",
  },
}));

export const Title = styled("h1")(({ theme }) => ({
  marginBottom: "1rem",

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.5rem",
  },
}));

export const Paragraph = styled("p")(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#555",

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1rem",
  },
}));
