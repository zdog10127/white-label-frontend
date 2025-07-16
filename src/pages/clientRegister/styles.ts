import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled.div`
  display: flex;

  @media (${max(device.mobile)}) {
    flex-direction: column;
  }

  @media (${min(device.desktop)}) {
    gap: 32px;
  }
`;

export const ContentBox = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: 220px;
  margin-right: auto;
  max-width: 700px;

  @media (${max(device.mobile)}) {
    padding: 24px 16px;
    margin-left: 0;
  }

  @media (${min(device.desktop)}) {
    max-width: 900px;
    padding: 56px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 32px;
  font-weight: 600;
  color: #333;

  @media (${max(device.mobile)}) {
    font-size: 1.5rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 16px;
  font-weight: 600;
  color: #444;

  @media (${max(device.mobile)}) {
    font-size: 1.25rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 1.5rem;
  }
`;

export const FormControlLabelWrapper = styled.div`
  margin-bottom: 24px;

  @media (${max(device.mobile)}) {
    margin-bottom: 16px;
  }

  @media (${min(device.desktop)}) {
    margin-bottom: 32px;
  }
`;

export const FormHelperText = styled.p`
  margin-top: 4px;
  margin-left: 12px;
  font-size: 0.95rem;
  color: #666;

  @media (${max(device.mobile)}) {
    font-size: 0.85rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 1rem;
  }
`;

export const GridWithMarginBottom = styled.div`
  margin-bottom: 80px;

  @media (${max(device.mobile)}) {
    margin-bottom: 40px;
  }

  @media (${min(device.desktop)}) {
    margin-bottom: 96px;
  }
`;

export const SectionDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 16px;
  margin-bottom: 16px;

  @media (${max(device.mobile)}) {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  @media (${min(device.desktop)}) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  @media (${max(device.mobile)}) {
    flex-direction: column;
    gap: 16px;
  }

  @media (${min(device.desktop)}) {
    gap: 32px;
  }
`;

export const PersonalInfoSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 24px;

  @media (${max(device.mobile)}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  @media (${min(device.desktop)}) {
    gap: 12px;
  }
`;

export const ErrorText = styled.p`
  margin-top: 4px;
  margin-left: 12px;
  color: #d32f2f;

  @media (${max(device.mobile)}) {
    font-size: 0.85rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 1rem;
  }
`;
