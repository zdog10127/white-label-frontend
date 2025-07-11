import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)({
  marginTop: 16,
  marginBottom: 16,
  paddingLeft: 40,
  paddingRight: 40,
});

export const GridLayout = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  gridAutoRows: "min-content",
  gridTemplateAreas: `
    "sessions"
    "finance"
    "tabs"
    "tasks"
  `,
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "2fr 1fr",
    gridTemplateAreas: `
      "sessions finance"
      "tabs    tasks"
    `,
  },
}));

export const Area = styled(Box)<{ area: string }>(({ area }) => ({
  gridArea: area,
}));
