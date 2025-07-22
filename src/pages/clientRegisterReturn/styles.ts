import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const BoxContainer = styled.div`
  display: flex;

  ${max(device.mobile)} {
    flex-direction: column;
  }

  ${min(device.desktop)} {
    gap: 32px;
  }
`;

export const BoxFormContainer = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: 220px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  ${max(device.mobile)} {
    padding: 24px;
    margin-left: 0;
  }

  ${min(device.desktop)} {
    max-width: 900px;
    padding: 56px;
  }
`;

export const TypographySectionTitle = styled.h2`
  margin-bottom: 32px;
  font-weight: 600;

  ${max(device.mobile)} {
    font-size: 1.25rem;
  }

  ${min(device.desktop)} {
    font-size: 2rem;
  }
`;

export const TypographySubTitle = styled.h3`
  margin-bottom: 16px;
  font-weight: 600;

  ${max(device.mobile)} {
    font-size: 1.1rem;
  }

  ${min(device.desktop)} {
    font-size: 1.5rem;
  }
`;

export const FormControlLabelWrapper = styled.div`
  margin-bottom: 24px;

  ${max(device.mobile)} {
    margin-bottom: 16px;
  }

  ${min(device.desktop)} {
    margin-bottom: 32px;
  }
`;

export const FormHelperText = styled.p`
  margin-top: 4px;
  margin-left: 12px;

  ${max(device.mobile)} {
    font-size: 0.85rem;
  }

  ${min(device.desktop)} {
    font-size: 1rem;
  }
`;

export const GridMarginBottom10 = styled.div`
  margin-bottom: 80px;

  ${max(device.mobile)} {
    margin-bottom: 48px;
  }

  ${min(device.desktop)} {
    margin-bottom: 96px;
  }
`;

export const DividerMarginY2 = styled.hr`
  margin-top: 16px;
  margin-bottom: 16px;

  ${max(device.mobile)} {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  ${min(device.desktop)} {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export const BoxButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  ${max(device.mobile)} {
    flex-direction: column;
    gap: 16px;
  }

  ${min(device.desktop)} {
    gap: 24px;
  }
`;
