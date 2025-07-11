import { SxProps, Theme } from "@mui/material";

export const boxContainer: SxProps<Theme> = {
  display: "flex",
};

export const boxFormContainer: SxProps<Theme> = {
  flex: 1,
  p: 5,
  ml: "220px",
  maxWidth: "700px",
  mx: "auto",
};

export const typographySectionTitle: SxProps<Theme> = {
  mb: 4,
  fontWeight: 600,
};

export const typographySubTitle: SxProps<Theme> = {
  mb: 2,
  fontWeight: 600,
};

export const formControlLabelWrapper: SxProps<Theme> = {
  mb: 3,
};

export const formHelperText: SxProps<Theme> = {
  mt: 0.5,
  ml: 1.5,
};

export const gridMarginBottom10: SxProps<Theme> = {
  mb: 10,
};

export const dividerMarginY2: SxProps<Theme> = {
  my: 2,
};

export const boxButtonContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 4,
};
