import { SxProps, Theme } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const paperMain: SxProps<Theme> = {
  p: 4,
  [`@media ${max(device.mobile)}`]: {
    p: 2,
  },
};

export const buttonBox: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  mt: 3,
  justifyContent: "center",
  flexWrap: "wrap",
};

export const editButton: SxProps<Theme> = {
  flex: 1,
  minWidth: 140,
  borderRadius: 2,
  textTransform: "none",
  fontWeight: "600",
  py: 1.5,
  [`@media ${max(device.mobile)}`]: {
    width: "100%",
  },
};

export const paperAvatar: SxProps<Theme> = {
  p: 3,
  textAlign: "center",
  [`@media ${max(device.mobile)}`]: {
    p: 2,
  },
};

export const avatar: SxProps<Theme> = {
  width: 100,
  height: 100,
  margin: "0 auto",
  [`@media ${max(device.mobile)}`]: {
    width: 70,
    height: 70,
  },
};

export const avatarImage: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
};

export const logoutButton: SxProps<Theme> = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: "bold",
  py: 1.2,
  [`@media ${max(device.mobile)}`]: {
    width: "100%",
  },
};
