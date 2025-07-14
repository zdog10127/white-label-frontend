import { SxProps, Theme } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";
export const boxContainer: SxProps<Theme> = {
  display: "flex",

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
  },
};

export const boxFormContainer: SxProps<Theme> = {
  flex: 1,
  p: 5,
  ml: "220px",
  maxWidth: "700px",
  mx: "auto",

  [`@media ${max(device.mobile)}`]: {
    p: 3,
    ml: 0,
  },
};

export const typographySectionTitle: SxProps<Theme> = {
  mb: 4,
  fontWeight: 600,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.25rem",
  },
};

export const typographySubTitle: SxProps<Theme> = {
  mb: 2,
  fontWeight: 600,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.1rem",
  },
};

export const formControlLabelWrapper: SxProps<Theme> = {
  mb: 3,

  [`@media ${max(device.mobile)}`]: {
    mb: 2,
  },
};

export const formHelperText: SxProps<Theme> = {
  mt: 0.5,
  ml: 1.5,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "0.85rem",
  },
};

export const gridMarginBottom10: SxProps<Theme> = {
  mb: 10,

  [`@media ${max(device.mobile)}`]: {
    mb: 6,
  },
};

export const dividerMarginY2: SxProps<Theme> = {
  my: 2,

  [`@media ${max(device.mobile)}`]: {
    my: 1.5,
  },
};

export const boxButtonContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mt: 4,

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: 2,
  },
};
