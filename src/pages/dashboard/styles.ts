import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  box-sizing: border-box;

  ${min(device.desktop)} {
    flex-direction: row;
    gap: 32px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const LeftPanel = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${max(device.mobile)} {
    gap: 16px;
  }

  ${min(device.desktop)} {
    gap: 32px;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${max(device.mobile)} {
    gap: 16px;
  }

  ${min(device.desktop)} {
    gap: 32px;
  }
`;

export const PaperStyled = styled.div`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;

  ${max(device.mobile)} {
    padding: 4px;
  }

  ${min(device.desktop)} {
    padding: 16px;
  }
`;

export const ButtonGroupBox = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;

  ${max(device.mobile)} {
    gap: 8px;
    margin-bottom: 16px;
  }

  ${min(device.desktop)} {
    gap: 24px;
    margin-bottom: 32px;
  }
`;

export const CenterTextBox = styled.div`
  margin-top: 24px;
  text-align: center;

  ${max(device.mobile)} {
    margin-top: 16px;
  }

  ${min(device.desktop)} {
    margin-top: 32px;
  }
`;

export const CenteredImage = styled.img`
  margin-bottom: 16px;

  ${max(device.mobile)} {
    margin-bottom: 8px;
    width: 100%;
    height: auto;
  }

  ${min(device.desktop)} {
    margin-bottom: 24px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;
