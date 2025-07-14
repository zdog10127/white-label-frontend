import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const device = {
  mobile: "480px",
  tablet: "820px",
  desktop: "1024px",
};

export const Container = styled(Box)({
  marginTop: 16,
  marginBottom: 16,
  paddingLeft: 40,
  paddingRight: 40,

  [`@media (max-width: ${device.tablet})`]: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  [`@media (max-width: ${device.mobile})`]: {
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export const GridLayout = styled(Box)({
  display: "grid",
  gap: 32,
  gridTemplateColumns: "1fr",
  gridAutoRows: "min-content",
  gridTemplateAreas: `
    "sessions"
    "finance"
    "tabs"
    "tasks"
  `,

  [`@media (min-width: ${device.tablet})`]: {
    gridTemplateColumns: "2fr 1fr",
    gridTemplateAreas: `
      "sessions finance"
      "tabs    tasks"
    `,
  },
});

export const Area = styled(Box)<{ area: string }>(({ area }) => ({
  gridArea: area,
}));
