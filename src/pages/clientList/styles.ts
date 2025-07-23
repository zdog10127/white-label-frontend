import styled from "styled-components";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled(Box)`
  padding: 24px;
  background-color: ${({ theme }) =>
    theme.palette.background.paper || "#fafafa"};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);

  ${max(device.mobile)} {
    padding: 16px;
  }

  ${min(device.desktop)} {
    padding: 32px;
  }
`;

export const HeaderTitle = styled(Typography)`
  margin-bottom: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};

  ${max(device.mobile)} {
    font-size: 1.3rem;
  }

  ${min(device.desktop)} {
    font-size: 2rem;
  }
`;

export const ButtonsStack = styled(Stack)`
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;

  ${max(device.mobile)} {
    gap: 12px;
  }

  ${min(device.desktop)} {
    gap: 24px;
  }
`;

export const FiltersBox = styled(Box)`
  margin-bottom: 20px;

  ${max(device.mobile)} {
    margin-bottom: 14px;
  }

  ${min(device.desktop)} {
    margin-bottom: 28px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  min-width: 180px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 8px;

  ${max(device.mobile)} {
    min-width: 100%;
  }

  ${min(device.desktop)} {
    min-width: 220px;
  }
`;

export const StyledTextField = styled(TextField)`
  flex-grow: 1;
  min-width: 280px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 8px;

  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }

  ${max(device.mobile)} {
    min-width: 100%;
  }

  ${min(device.desktop)} {
    min-width: 320px;
  }
`;

export const ActionsButton = styled(Button)`
  margin-right: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgb(25 118 210 / 0.4);
  text-transform: none;
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #1565c0;
    box-shadow: 0 4px 12px rgb(21 101 192 / 0.6);
  }

  ${max(device.mobile)} {
    width: 100%;
    margin-right: 0;
  }

  ${min(device.desktop)} {
    padding: 12px 28px;
  }
`;

export const ActionsButtonDelete = styled(Button)`
  border-radius: 8px;
  color: ${({ theme }) => theme.palette.error.main};
  border-color: ${({ theme }) => theme.palette.error.main};
  font-weight: 600;
  text-transform: none;
  box-shadow: 0 1px 4px rgb(211 47 47 / 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.error.light};
    box-shadow: 0 4px 12px rgb(211 47 47 / 0.6);
  }

  ${max(device.mobile)} {
    width: 100%;
  }

  ${min(device.desktop)} {
    padding: 12px 28px;
  }
`;

export const ConditionalButton = styled(Button)<{ $isPrimary?: boolean }>`
  margin-right: 10px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: none;
  background-color: ${(props) => (props.$isPrimary ? "#1976d2" : "#b0b0b0")};
  color: ${(props) => (props.$isPrimary ? "white" : "#4f4f4f")};
  box-shadow: ${(props) =>
    props.$isPrimary ? "0 2px 6px rgb(25 118 210 / 0.45)" : "none"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isPrimary ? "#1565c0" : "#999")};
    box-shadow: ${(props) =>
      props.$isPrimary ? "0 6px 14px rgb(21 101 192 / 0.65)" : "none"};
  }

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}

  ${max(device.mobile)} {
    width: 100%;
    margin-right: 0;
  }

  ${min(device.desktop)} {
    padding: 12px 28px;
  }
`;

export const ThemedContainer = styled(Box)`
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) =>
    theme.palette?.background?.default || "#fff"};
  box-shadow: 0 3px 12px rgb(0 0 0 / 0.05);

  ${max(device.mobile)} {
    padding: 16px;
  }

  ${min(device.desktop)} {
    padding: 32px;
  }
`;

export const InteractiveButton = styled(Button)`
  margin-right: 10px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: none;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgb(0 0 0 / 0.15);
    background-color: #1565c0;
    color: white;
  }

  &:active {
    transform: translateY(0);
  }

  ${max(device.mobile)} {
    width: 100%;
    margin-right: 0;
  }

  ${min(device.desktop)} {
    padding: 12px 28px;
  }
`;

export const DefaultTextField = styled(TextField).attrs({
  variant: "outlined",
  size: "medium",
})`
  flex-grow: 1;
  min-width: 280px;
  border-radius: 8px;

  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }

  ${max(device.mobile)} {
    min-width: 100%;
  }

  ${min(device.desktop)} {
    min-width: 360px;
  }
`;

export const BaseButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.25s ease;
  text-transform: none;

  ${min(device.desktop)} {
    padding: 12px 28px;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: #1976d2;
  color: white;

  &:hover {
    background-color: #1565c0;
    box-shadow: 0 4px 12px rgb(21 101 192 / 0.6);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: transparent;
  color: #1976d2;
  border: 1.5px solid #1976d2;

  &:hover {
    background-color: #f0f4ff;
  }
`;

export const StatusAtivo = styled(Typography)`
  color: #2e7d32;
  font-weight: 600;
`;

export const StatusInativo = styled(Typography)`
  color: #b71c1c;
  font-weight: 600;
`;

export const StatusListaEspera = styled(Typography)`
  color: #f57c00;
  font-weight: 600;
`;
