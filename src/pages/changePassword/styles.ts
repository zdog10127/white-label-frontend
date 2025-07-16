import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const BoxContainer = styled.div`
  max-width: 480px;
  margin: 2rem auto 0;

  @media (${max(device.mobile)}) {
    margin: 1rem 16px 0;
  }

  @media (${min(device.tablet)}) {
    max-width: 700px;
    margin: 3rem auto 0;
  }

  @media (${min(device.desktop)}) {
    max-width: 900px;
  }
`;

export const StyledPaper = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (${max(device.mobile)}) {
    padding: 1rem;
  }

  @media (${min(device.desktop)}) {
    padding: 3rem;
  }
`;

export const StyledDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 1.5rem;

  @media (${max(device.mobile)}) {
    margin-bottom: 1rem;
  }

  @media (${min(device.tablet)}) {
    margin-bottom: 2rem;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  @media (${max(device.mobile)}) {
    flex-direction: column;
    gap: 1rem;
  }

  @media (${min(device.desktop)}) {
    justify-content: flex-end;
    gap: 2rem;
  }
`;
