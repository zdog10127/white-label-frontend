import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 40px;
  padding-right: 40px;

  @media ${max(device.tablet)} {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media ${max(device.mobile)} {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media ${min(device.desktop)} {
    padding-left: 48px;
    padding-right: 48px;
  }
`;

export const GridLayout = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  grid-template-areas:
    "sessions"
    "finance"
    "tabs"
    "tasks";

  @media ${min(device.tablet)} {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "sessions finance"
      "tabs    tasks";
  }
`;

export const Area = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
`;
