import styled from "styled-components";
import { device, max } from "../../constants/responsiveClient";

export const PageContainer = styled.div`
  padding: 24px;

  @media ${max(device.mobile)} {
    padding: 16px;
  }
`;

export const CalendarPaper = styled.div`
  padding: 16px;
  min-width: 280px;

  @media ${max(device.mobile)} {
    padding: 12px;
    min-width: 100%;
  }
`;

export const SessionsPaper = styled.div`
  padding: 24px;

  @media ${max(device.mobile)} {
    padding: 16px;
  }
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${max(device.mobile)} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  gap: 8px;

  @media ${max(device.mobile)} {
    flex-direction: column;
    gap: 6px;
  }
`;

export const EmptyStateBox = styled.div`
  margin-top: 48px;
  text-align: center;

  @media ${max(device.mobile)} {
    margin-top: 24px;
    padding: 0 16px;
  }
`;

export const EmptyIcon = styled.p`
  opacity: 0.3;
  margin-bottom: 0;

  @media ${max(device.mobile)} {
    font-size: 3rem;
  }
`;

export const SessionPaper = styled.div`
  padding: 16px;
  margin-bottom: 160px;

  @media ${max(device.mobile)} {
    margin-bottom: 80px;
    padding: 12px;
  }
`;
