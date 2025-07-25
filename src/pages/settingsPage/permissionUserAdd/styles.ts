import styled from "styled-components";
import { device, max, min } from "../../../constants/responsiveClient";

export const Container = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: 100vh;
  width: 100%;

  ${max(device.mobile)} {
    padding: 1rem;
  }

  ${min(device.desktop)} {
    padding: 3rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  ${max(device.mobile)} {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }

  ${min(device.desktop)} {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 0.75rem 0;

  ${max(device.mobile)} {
    font-size: 1.5rem;
  }

  ${min(device.desktop)} {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const Subtitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
  font-weight: 400;

  ${max(device.mobile)} {
    font-size: 0.875rem;
  }

  ${min(device.desktop)} {
    font-size: 1.125rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadows[3]};

  ${max(device.mobile)} {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  ${min(device.desktop)} {
    padding: 2rem;
    margin-bottom: 2.5rem;
  }
`;

export const UserCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.5rem;
  }

  span {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    padding: 0.375rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 700;
    min-width: 2rem;
    text-align: center;
  }

  ${max(device.mobile)} {
    font-size: 0.875rem;

    span {
      padding: 0.25rem 0.75rem;
      font-size: 0.8rem;
    }
  }

  ${min(device.desktop)} {
    font-size: 1.125rem;
    gap: 1rem;

    span {
      padding: 0.5rem 1.25rem;
      font-size: 1rem;
    }
  }
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  box-shadow: ${({ theme }) => theme.shadows[3]};

  .MuiSvgIcon-root {
    font-size: 1.25rem;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[300]};
    color: ${({ theme }) => theme.palette.text.disabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  ${max(device.mobile)} {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    width: 100%;
  }

  ${min(device.desktop)} {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

export const TableWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadows[3]};

  .MuiTable-root {
    border-collapse: separate;
    border-spacing: 0;
    background-color: ${({ theme }) => theme.palette.background.paper};
  }

  .MuiTableHead-root {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.grey[100]
        : theme.palette.grey[100]};

    .MuiTableCell-root {
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: 700;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: none;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
      background-color: transparent;
    }
  }

  .MuiTableBody-root {
    .MuiTableRow-root {
      transition: all 0.2s ease;
      background-color: ${({ theme }) => theme.palette.background.paper};

      &:hover {
        background-color: ${({ theme }) =>
          theme.palette.mode === "dark"
            ? "rgba(59, 130, 246, 0.05)"
            : "rgba(37, 99, 235, 0.03)"};
      }

      &:not(:last-child) .MuiTableCell-root {
        border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
      }

      &:nth-child(even) {
        background-color: ${({ theme }) =>
          theme.palette.mode === "dark"
            ? "rgba(248, 250, 252, 0.02)"
            : "rgba(15, 23, 42, 0.01)"};
      }
    }

    .MuiTableCell-root {
      padding: 1.25rem 1.5rem;
      font-size: 0.9375rem;
      color: ${({ theme }) => theme.palette.text.primary};
      background-color: transparent;

      &:first-child {
        font-weight: 600;
      }
    }
  }

  ${max(device.mobile)} {
    .MuiTableCell-root {
      padding: 1rem !important;
      font-size: 0.875rem !important;
    }
  }

  ${min(device.desktop)} {
    .MuiTableCell-root {
      padding: 1.5rem 2rem !important;
      font-size: 1rem !important;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2.5rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadows[2]};

  .icon {
    font-size: 4rem;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }

  h3 {
    font-size: 1.375rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin: 0 0 0.75rem 0;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    margin: 0;
    line-height: 1.6;
    max-width: 25rem;
    margin: 0 auto;
  }

  ${max(device.mobile)} {
    padding: 3rem 1.5rem;

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.875rem;
    }
  }

  ${min(device.desktop)} {
    padding: 6rem 3rem;

    .icon {
      font-size: 5rem;
      margin-bottom: 2rem;
    }

    h3 {
      font-size: 1.625rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.125rem;
    }
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 25rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadows[2]};

  .MuiCircularProgress-root {
    margin-bottom: 1.25rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    margin: 0;
    font-weight: 500;
  }

  ${max(device.mobile)} {
    min-height: 20rem;

    p {
      font-size: 0.875rem;
    }
  }

  ${min(device.desktop)} {
    min-height: 30rem;

    p {
      font-size: 1.125rem;
    }
  }
`;

export const ErrorWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.error.main};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows[2]};

  .MuiAlert-root {
    background-color: transparent;
    padding: 0;
    color: ${({ theme }) => theme.palette.error.main};
    font-size: 1rem;
  }

  ${max(device.mobile)} {
    padding: 1rem;

    .MuiAlert-root {
      font-size: 0.875rem;
    }
  }

  ${min(device.desktop)} {
    padding: 2rem;

    .MuiAlert-root {
      font-size: 1.125rem;
    }
  }
`;

export const ActionButton = styled.button`
  background: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.palette.error.main};

  .MuiSvgIcon-root {
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(239, 68, 68, 0.08)"
        : "rgba(239, 68, 68, 0.05)"};
    border-color: ${({ theme }) => theme.palette.error.main};
  }

  &:active {
    transform: scale(0.95);
  }

  ${max(device.mobile)} {
    padding: 0.5rem;

    .MuiSvgIcon-root {
      font-size: 1.125rem;
    }
  }

  ${min(device.desktop)} {
    padding: 1rem;

    .MuiSvgIcon-root {
      font-size: 1.375rem;
    }
  }
`;

export const PermissionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 0.5rem 1.25rem;
  border-radius: 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows[1]};

  ${max(device.mobile)} {
    padding: 0.375rem 1rem;
    font-size: 0.875rem;
  }

  ${min(device.desktop)} {
    padding: 0.625rem 1.5rem;
    font-size: 1rem;
  }
`;
