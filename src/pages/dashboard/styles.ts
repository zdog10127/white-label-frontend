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

  @media ${min("900px")} {
    flex-direction: row;
  }
`;

export const LeftPanel = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${max(device.mobile)} {
    gap: 16px;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${max(device.mobile)} {
    gap: 16px;
  }
`;

export const PaperStyled = styled.div`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;

  @media ${max(device.mobile)} {
    padding: 4px;
  }
`;

export const ButtonGroupBox = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;

  @media ${max(device.mobile)} {
    gap: 8px;
    margin-bottom: 16px;
  }
`;

export const CenterTextBox = styled.div`
  margin-top: 24px;
  text-align: center;

  @media ${max(device.mobile)} {
    margin-top: 16px;
  }
`;

export const CenteredImage = styled.img`
  margin-bottom: 16px;

  @media ${max(device.mobile)} {
    margin-bottom: 8px;
    width: 100%;
    height: auto;
  }
`;
