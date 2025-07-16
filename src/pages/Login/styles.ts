import styled from "styled-components";
import { Container, Paper, Box } from "@mui/material";
import { device, max, min } from "../../constants/responsiveClient";

export const BackgroundContainer = styled(Container)`
  height: 100vh;
  width: 100vw;
  background-image: url("assets/fundo3dbranco.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;

  @media ${min(device.desktop)} {
    padding: 0 48px;
  }
`;

export const LoginPaper = styled(Paper)`
  padding: 80px;
  margin-top: 80px;
  width: 350px;
  border: 3px solid;
  border-color: gray;
  border-radius: 16px;

  @media ${max(device.mobile)} {
    width: 100%;
    padding: 40px 24px;
    margin-top: 40px;
  }

  @media ${min(device.desktop)} {
    width: 400px;
    padding: 96px;
    margin-top: 96px;
  }
`;

export const LinksBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 80px;

  @media ${max(device.mobile)} {
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
  }

  @media ${min(device.desktop)} {
    margin-top: 96px;
    gap: 24px;
  }
`;
