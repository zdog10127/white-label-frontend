import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.divider};
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
  font-weight: 400;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 2px 8px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

export const UserCount = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.primary};

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 24px;
  }

  span {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    min-width: 32px;
    text-align: center;
  }
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 4px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"};

  .MuiSvgIcon-root {
    font-size: 20px;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px
      ${({ theme }) =>
        theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.action.disabled};
    color: ${({ theme }) => theme.palette.text.disabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

  .MuiTable-root {
    border-collapse: separate;
    border-spacing: 0;
  }

  .MuiTableHead-root {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[100]};

    .MuiTableCell-root {
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: none;
      padding: 20px 24px;
      border-bottom: 2px solid ${({ theme }) => theme.palette.divider};
    }
  }

  .MuiTableBody-root {
    .MuiTableRow-root {
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.palette.action.hover};
        transform: scale(1.001);
      }

      &:not(:last-child) .MuiTableCell-root {
        border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
      }
    }

    .MuiTableCell-root {
      padding: 20px 24px;
      font-size: 15px;
      color: ${({ theme }) => theme.palette.text.primary};

      &:first-child {
        font-weight: 600;
      }
    }
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
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 2px 8px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"};

  .MuiCircularProgress-root {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.text.secondary};
    margin: 0;
    font-weight: 500;
  }
`;

export const ErrorWrapper = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 2px solid ${({ theme }) => theme.palette.error.main};
  border-radius: 12px;
  box-shadow: 0 2px 8px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"};

  .MuiAlert-root {
    background-color: transparent;
    padding: 0;
    color: ${({ theme }) => theme.palette.error.main};
    font-size: 16px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.palette.error.main};

  .MuiSvgIcon-root {
    font-size: 20px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.error.light}20;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PermissionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
  box-shadow: 0 2px 4px
    ${({ theme }) =>
      theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"};
`;
