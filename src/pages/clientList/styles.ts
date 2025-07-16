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

  @media ${max(device.mobile)} {
    padding: 16px;
  }

  @media ${min(device.desktop)} {
    padding: 32px;
  }
`;

export const HeaderTitle = styled(Typography)`
  margin-bottom: 16px;

  @media ${max(device.mobile)} {
    font-size: 1.25rem;
  }

  @media ${min(device.desktop)} {
    font-size: 1.75rem;
  }
`;

export const ButtonsStack = styled(Stack)`
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media ${max(device.mobile)} {
    gap: 12px;
  }

  @media ${min(device.desktop)} {
    gap: 24px;
  }
`;

export const FiltersBox = styled(Box)`
  margin-bottom: 16px;

  @media ${max(device.mobile)} {
    margin-bottom: 12px;
  }

  @media ${min(device.desktop)} {
    margin-bottom: 24px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  min-width: 150px;

  @media ${max(device.mobile)} {
    min-width: 100%;
  }

  @media ${min(device.desktop)} {
    min-width: 200px;
  }
`;

export const StyledTextField = styled(TextField)`
  flex-grow: 1;
  min-width: 250px;

  @media ${max(device.mobile)} {
    min-width: 100%;
  }

  @media ${min(device.desktop)} {
    min-width: 300px;
  }
`;

export const ActionsButton = styled(Button)`
  margin-right: 8px;

  @media ${max(device.mobile)} {
    width: 100%;
    margin-right: 0;
  }

  @media ${min(device.desktop)} {
    padding: 10px 24px;
  }
`;

export const ActionsButtonDelete = styled(Button)`
  @media ${max(device.mobile)} {
    width: 100%;
  }

  @media ${min(device.desktop)} {
    padding: 10px 24px;
  }
`;

export const ConditionalButton = styled(Button)<{ $isPrimary?: boolean }>`
  margin-right: 8px;
  background-color: ${(props) => (props.$isPrimary ? "#1976d2" : "#ccc")};

  ${(props) =>
    props.disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}

  @media ${max(device.mobile)} {
    width: 100%;
    margin-right: 0;
  }

  @media ${min(device.desktop)} {
    padding: 10px 24px;
  }
`;

export const ThemedContainer = styled(Box)`
  padding: 24px;
  background-color: ${({ theme }) =>
    theme.palette?.background?.default || "#fff"};

  @media ${max(device.mobile)} {
    padding: 16px;
  }

  @media ${min(device.desktop)} {
    padding: 32px;
  }
`;

export const InteractiveButton = styled(Button)`
  margin-right: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media ${max(device.mobile)} {
    width: 100%;
    margin-right: 0;
  }

  @media ${min(device.desktop)} {
    padding: 10px 24px;
  }
`;

export const DefaultTextField = styled(TextField).attrs({
  variant: "outlined",
  size: "medium",
})`
  flex-grow: 1;
  min-width: 250px;

  @media ${max(device.mobile)} {
    min-width: 100%;
  }

  @media ${min(device.desktop)} {
    min-width: 350px;
  }
`;

export const BaseButton = styled(Button)`
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s ease;

  @media ${min(device.desktop)} {
    padding: 10px 24px;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: #1976d2;
  color: white;

  &:hover {
    background-color: #1565c0;
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;

  &:hover {
    background-color: #f5f5f5;
  }
`;
