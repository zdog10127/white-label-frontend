import styled from "styled-components";
import { Button } from "@mui/material";
import { device, max, min } from "../../../constants/responsiveClient";

interface NavItemProps {
  active?: boolean;
}

export const PageWrapper = styled.div`
  display: flex;
  margin-left: 104px;
  padding-top: 64px;
  min-height: 100vh;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    padding-top: 64px;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  margin-left: 240px;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

export const Container = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: 100vh;
  overflow-y: auto;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  transition: all 0.3s ease;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.2)"};
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)"};
    }
  }

  ${max(device.mobile)} {
    padding: 20px;
  }

  ${min(device.desktop)} {
    padding: 48px;
  }
`;

export const TopNav = styled.div`
  display: flex;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 16px 16px 0 0;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-bottom: none;
  margin-bottom: 8px;
  overflow-x: auto;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows[2]};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.palette.divider};
  }

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.divider};
    border-radius: 2px;
  }

  ${max(device.mobile)} {
    border-radius: 12px 12px 0 0;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }
`;

export const NavItem = styled.div<NavItemProps>`
  padding: 18px 28px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 700 : 600)};
  font-size: 15px;
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.text.secondary};
  border-bottom: 3px solid
    ${({ active, theme }) =>
      active ? theme.palette.primary.main : "transparent"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  white-space: nowrap;
  min-width: fit-content;
  border-radius: 8px 8px 0 0;
  background: transparent;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.palette.primary.main};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 8px 8px 0 0;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(59, 130, 246, 0.08)"
        : "rgba(37, 99, 235, 0.08)"};

    &::before {
      opacity: 0.04;
    }
  }

  &:active {
    transform: translateY(1px);
  }

  ${max(device.mobile)} {
    padding: 14px 20px;
    font-size: 14px;
    flex: 1;
    text-align: center;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;
  padding: 32px;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadows[3]};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.palette.primary.main},
      ${({ theme }) => theme.palette.secondary.main}
    );
  }

  ${max(device.mobile)} {
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.text.primary};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.text.primary} 0%,
    ${({ theme }) => theme.palette.primary.main} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${max(device.mobile)} {
    font-size: 24px;
    margin-bottom: 8px;
  }

  ${min(device.desktop)} {
    font-size: 36px;
    margin-bottom: 16px;
  }
`;

export const SubHeader = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;

  ${max(device.mobile)} {
    font-size: 14px;
  }

  ${min(device.desktop)} {
    font-size: 18px;
  }
`;

export const AddButton = styled(Button)`
  && {
    margin-bottom: 24px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.primary.main},
      ${({ theme }) => theme.palette.primary.dark}
    );
    color: ${({ theme }) => theme.palette.primary.contrastText};
    text-transform: none;
    font-weight: 700;
    font-size: 15px;
    padding: 14px 28px;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadows[4]};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }

    &:hover {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.palette.primary.dark},
        ${({ theme }) => theme.palette.primary.main}
      );
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows[6]};

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }

    ${max(device.mobile)} {
      width: 100%;
      font-size: 14px;
      padding: 12px 24px;
      margin-bottom: 20px;
    }

    ${min(device.desktop)} {
      font-size: 16px;
      padding: 16px 32px;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows[5]};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  position: relative;
  margin-top: 0;

  ${max(device.mobile)} {
    font-size: 12px;
    border-radius: 0 0 16px 16px;
  }

  ${min(device.desktop)} {
    border-radius: 0 0 24px 24px;
  }
`;

export const TableHeader = styled.thead`
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.grey[100]}, ${theme.palette.grey[50]})`
      : `linear-gradient(135deg, ${theme.palette.grey[50]}, ${theme.palette.grey[100]})`};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.palette.primary.main};
    opacity: 0.3;
  }

  th {
    padding: 20px 24px;
    text-align: left;
    font-weight: 700;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.text.primary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 25%;
      bottom: 25%;
      width: 1px;
      background: ${({ theme }) => theme.palette.divider};
      opacity: 0.5;
    }

    ${max(device.mobile)} {
      padding: 16px 12px;
      font-size: 11px;
    }

    ${min(device.desktop)} {
      padding: 24px 28px;
      font-size: 14px;
    }
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  transition: all 0.3s ease;
  position: relative;
  background: ${({ theme }) => theme.palette.background.paper};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(59, 130, 246, 0.05)"
        : "rgba(37, 99, 235, 0.03)"};
    transform: scale(1.001);
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  &:nth-child(even) {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(248, 250, 252, 0.02)"
        : "rgba(15, 23, 42, 0.01)"};
  }
`;

export const TableCell = styled.td`
  padding: 18px 24px;
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 500;
  line-height: 1.5;
  vertical-align: middle;
  position: relative;
  background: transparent;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    bottom: 20%;
    width: 1px;
    background: ${({ theme }) => theme.palette.divider};
    opacity: 0.3;
  }

  ${max(device.mobile)} {
    padding: 14px 12px;
    font-size: 12px;
  }

  ${min(device.desktop)} {
    padding: 22px 28px;
    font-size: 15px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;

  button {
    min-width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    background: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.text.secondary};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: ${({ theme }) => theme.palette.primary.main};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      opacity: 0.1;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.primary.main};
      border-color: ${({ theme }) => theme.palette.primary.main};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows[3]};

      &::before {
        width: 100%;
        height: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }

    svg {
      font-size: 20px;
      z-index: 1;
      position: relative;
    }
  }

  ${max(device.mobile)} {
    gap: 8px;

    button {
      min-width: 40px;
      height: 40px;
      border-radius: 8px;

      svg {
        font-size: 18px;
      }
    }
  }

  ${min(device.desktop)} {
    gap: 16px;

    button {
      min-width: 48px;
      height: 48px;
      border-radius: 12px;

      svg {
        font-size: 22px;
      }
    }
  }
`;
