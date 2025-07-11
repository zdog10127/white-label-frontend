import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

export const Container = styled(Box)({
  padding: 24,
});

export const HeaderTitle = styled(Typography)({
  marginBottom: 16,
});

export const ButtonsStack = styled(Stack)({
  marginBottom: 16,
  flexWrap: "wrap",
});

export const FiltersBox = styled(Box)({
  marginBottom: 16,
});

export const StyledFormControl = styled(FormControl)({
  minWidth: 150,
});

export const StyledTextField = styled(TextField)({
  flexGrow: 1,
  minWidth: 250,
});

export const ActionsButton = styled(Button)({
  marginRight: 8,
});

export const ActionsButtonDelete = styled(Button)({});
