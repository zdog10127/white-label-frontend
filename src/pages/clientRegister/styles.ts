import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled.div`
  display: flex;

  ${max(device.mobile)} {
    flex-direction: column;
  }

  ${min(device.desktop)} {
    gap: 32px;
  }
`;

export const ContentBox = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: 220px;
  margin-right: auto;
  max-width: 700px;

  ${max(device.mobile)} {
    padding: 24px 16px;
    margin-left: 0;
  }

  ${min(device.desktop)} {
    max-width: 900px;
    padding: 56px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 32px;
  font-weight: 600;
  color: #333;

  ${max(device.mobile)} {
    font-size: 1.5rem;
  }

  ${min(device.desktop)} {
    font-size: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 16px;
  font-weight: 600;
  color: #444;

  ${max(device.mobile)} {
    font-size: 1.25rem;
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
  font-size: 0.95rem;
  color: #666;

  ${max(device.mobile)} {
    font-size: 0.85rem;
  }

  ${min(device.desktop)} {
    font-size: 1rem;
  }
`;

export const GridWithMarginBottom = styled.div`
  margin-bottom: 80px;

  ${max(device.mobile)} {
    margin-bottom: 40px;
  }

  ${min(device.desktop)} {
    margin-bottom: 96px;
  }
`;

export const SectionDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  ${max(device.mobile)} {
    flex-direction: column;
    gap: 16px;
  }

  ${min(device.desktop)} {
    gap: 32px;
  }
`;

export const PersonalInfoSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 24px;

  ${max(device.mobile)} {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  ${min(device.desktop)} {
    gap: 12px;
  }
`;

export const ErrorText = styled.p`
  margin-top: 4px;
  margin-left: 12px;
  color: #d32f2f;

  ${max(device.mobile)} {
    font-size: 0.85rem;
  }

  ${min(device.desktop)} {
    font-size: 1rem;
  }
`;
