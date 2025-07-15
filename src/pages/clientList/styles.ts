import styled from "styled-components";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const Container = styled(Box)(({ theme }) => ({
  padding: 24,

  [`@media ${max(device.mobile)}`]: {
    padding: 16,
  },
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 16,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.25rem",
  },
}));

export const ButtonsStack = styled(Stack)(({ theme }) => ({
  marginBottom: 16,
  flexWrap: "wrap",

  [`@media ${max(device.mobile)}`]: {
    gap: 12,
  },
}));

export const FiltersBox = styled(Box)(({ theme }) => ({
  marginBottom: 16,

  [`@media ${max(device.mobile)}`]: {
    marginBottom: 12,
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 150,

  [`@media ${max(device.mobile)}`]: {
    minWidth: "100%",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  minWidth: 250,

  [`@media ${max(device.mobile)}`]: {
    minWidth: "100%",
  },
}));

export const ActionsButton = styled(Button)(({ theme }) => ({
  marginRight: 8,

  [`@media ${max(device.mobile)}`]: {
    width: "100%",
    marginRight: 0,
  },
}));

export const ActionsButtonDelete = styled(Button)(({ theme }) => ({
  [`@media ${max(device.mobile)}`]: {
    width: "100%",
  },
}));
