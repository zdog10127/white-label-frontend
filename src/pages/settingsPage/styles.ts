import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  width: 100%;

  ${max(device.mobile)} {
    padding: 20px;
  }

  ${min(device.desktop)} {
    padding: 48px;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.divider};

  ${max(device.mobile)} {
    margin-bottom: 32px;
    padding-bottom: 20px;
  }

  ${min(device.desktop)} {
    margin-bottom: 48px;
    padding-bottom: 28px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;

  ${max(device.mobile)} {
    font-size: 28px;
    margin-bottom: 8px;
  }

  ${min(device.desktop)} {
    font-size: 36px;
    margin-bottom: 16px;
  }
`;

export const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
  font-weight: 400;
  line-height: 1.5;

  ${max(device.mobile)} {
    font-size: 14px;
  }

  ${min(device.desktop)} {
    font-size: 18px;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 2px 8px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"};

  ${max(device.mobile)} {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }

  ${min(device.desktop)} {
    padding: 28px;
    gap: 24px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 500px;
  position: relative;

  svg {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 20px;
    position: absolute;
    left: 12px;
    z-index: 1;
  }

  ${max(device.mobile)} {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px 12px 44px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.primary.main}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  ${min(device.desktop)} {
    font-size: 15px;
    padding: 14px 18px 14px 48px;
  }
`;

export const TableWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 4px 16px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.08)"};
  overflow-x: auto;

  ${max(device.mobile)} {
    border-radius: 8px;
    box-shadow: 0 2px 8px
      ${({ theme }) =>
        theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"};
  }

  ${min(device.desktop)} {
    border-radius: 16px;
    box-shadow: 0 6px 24px
      ${({ theme }) =>
        theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  min-width: 600px;

  ${max(device.mobile)} {
    font-size: 12px;
    min-width: 500px;
  }

  ${min(device.desktop)} {
    font-size: 15px;
  }
`;

export const TableHead = styled.th`
  text-align: left;
  padding: 20px 16px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100]};
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.divider};
  white-space: nowrap;

  &:nth-child(2) {
    min-width: 300px;
  }

  ${max(device.mobile)} {
    padding: 16px 12px;
    font-size: 11px;
  }

  ${min(device.desktop)} {
    font-size: 14px;
    padding: 24px 20px;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
    transform: scale(1.001);
  }

  &:not(:last-child) td {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

export const TableCell = styled.td`
  padding: 20px 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.primary};
  vertical-align: middle;

  ${max(device.mobile)} {
    font-size: 12px;
    padding: 16px 12px;
  }

  ${min(device.desktop)} {
    font-size: 15px;
    padding: 24px 20px;
  }
`;

export const PermissionName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 1.3;

  ${max(device.mobile)} {
    font-size: 13px;
  }

  ${min(device.desktop)} {
    font-size: 16px;
  }
`;

export const Description = styled.div`
  max-width: 350px;
  line-height: 1.4;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 13px;

  ${max(device.mobile)} {
    font-size: 12px;
    max-width: 200px;
  }

  ${min(device.desktop)} {
    font-size: 14px;
    max-width: 400px;
  }
`;

export const LevelBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid;
  white-space: nowrap;

  ${min(device.desktop)} {
    font-size: 12px;
    padding: 5px 14px;
  }
`;

export const UserCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 13px;

  ${min(device.desktop)} {
    font-size: 14px;
    gap: 8px;
  }
`;

export const UserCountBadge = styled.span`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;

  ${min(device.desktop)} {
    font-size: 12px;
    padding: 4px 10px;
    min-width: 28px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.action.hover};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 20px;

    ${max(device.mobile)} {
      font-size: 18px;
    }

    ${min(device.desktop)} {
      font-size: 22px;
    }
  }

  ${max(device.mobile)} {
    padding: 8px;
  }

  ${min(device.desktop)} {
    padding: 14px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 40px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 2px 8px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"};

  .icon {
    font-size: 64px;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 24px;
    opacity: 0.7;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin: 0 0 12px 0;
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.text.secondary};
    margin: 0;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
  }

  ${max(device.mobile)} {
    padding: 60px 20px;

    .icon {
      font-size: 48px;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
    }
  }

  ${min(device.desktop)} {
    padding: 100px 60px;

    .icon {
      font-size: 80px;
      margin-bottom: 32px;
    }

    h3 {
      font-size: 26px;
      margin-bottom: 16px;
    }

    p {
      font-size: 18px;
    }
  }
`;
