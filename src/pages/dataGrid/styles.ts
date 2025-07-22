import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const PageContainer = styled.div`
  padding: 24px;

  ${max(device.mobile)} {
    padding: 16px;
  }

  ${min(device.desktop)} {
    padding: 40px;
  }
`;

export const CalendarPaper = styled.div`
  padding: 16px;
  min-width: 280px;

  ${max(device.mobile)} {
    padding: 12px;
    min-width: 100%;
  }

  ${min(device.desktop)} {
    padding: 24px;
    min-width: 320px;
  }
`;

export const SessionsPaper = styled.div`
  padding: 24px;

  ${max(device.mobile)} {
    padding: 16px;
  }

  ${min(device.desktop)} {
    padding: 32px;
  }
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${max(device.mobile)} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  ${min(device.desktop)} {
    gap: 24px;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  gap: 8px;

  ${max(device.mobile)} {
    flex-direction: column;
    gap: 6px;
  }

  ${min(device.desktop)} {
    gap: 16px;
  }
`;

export const EmptyStateBox = styled.div`
  margin-top: 48px;
  text-align: center;

  ${max(device.mobile)} {
    margin-top: 24px;
    padding: 0 16px;
  }

  ${min(device.desktop)} {
    margin-top: 64px;
  }
`;

export const EmptyIcon = styled.p`
  opacity: 0.3;
  margin-bottom: 0;

  ${max(device.mobile)} {
    font-size: 3rem;
  }

  ${min(device.desktop)} {
    font-size: 5rem;
  }
`;

export const SessionPaper = styled.div`
  padding: 16px;
  margin-bottom: 160px;

  ${max(device.mobile)} {
    margin-bottom: 80px;
    padding: 12px;
  }

  ${min(device.desktop)} {
    padding: 24px;
    margin-bottom: 200px;
  }
`;
