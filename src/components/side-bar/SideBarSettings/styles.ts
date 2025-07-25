import styled from "styled-components";
import { Box } from "@mui/material";

interface ItemProps {
  active?: boolean;
}

export const SidebarContainer = styled.aside`
  width: 260px;
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
      : `linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)`};
  border-right: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 36px 20px;
  height: calc(100vh - 64px);
  position: fixed;
  top: 64px;
  left: 104px;
  overflow-y: auto;
  z-index: 11;
  box-shadow: 2px 0 12px
    ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.4)"
        : "rgba(0, 0, 0, 0.08)"};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.03)"};
    border-radius: 4px;
    margin: 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? `rgba(255, 255, 255, 0.2)`
        : `rgba(0, 0, 0, 0.15)`};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? `rgba(255, 255, 255, 0.3)`
          : `rgba(0, 0, 0, 0.25)`};
    }
  }

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    padding: 24px 20px;
    box-shadow: 0 2px 8px
      ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "rgba(0, 0, 0, 0.3)"
          : "rgba(0, 0, 0, 0.06)"};
  }
`;

export const SidebarHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 6px 0;
  letter-spacing: -0.2px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.text.primary},
    ${({ theme }) => theme.palette.primary.main}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SidebarSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
  font-weight: 500;
  opacity: 0.8;
`;

export const Section = styled.div`
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Title = styled.h3`
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  user-select: none;
  padding: 0 8px;
`;

export const Item = styled(Box)<ItemProps>`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 2px;
  position: relative;
  overflow: hidden;
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.text.primary};
  background: ${({ active, theme }) =>
    active
      ? `linear-gradient(135deg, ${theme.palette.primary.main}12, ${theme.palette.primary.main}08)`
      : "transparent"};
  border: 1px solid
    ${({ active, theme }) =>
      active ? `${theme.palette.primary.main}20` : "transparent"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.palette.primary.main};
    transform: scaleY(${({ active }) => (active ? 1 : 0)});
    transition: transform 0.3s ease;
    border-radius: 0 2px 2px 0;
  }

  .icon {
    margin-right: 14px;
    font-size: 20px;
    opacity: ${({ active }) => (active ? 1 : 0.7)};
    transition: all 0.3s ease;
    color: ${({ active, theme }) =>
      active ? theme.palette.primary.main : theme.palette.text.secondary};
  }

  &:hover {
    background: ${({ active, theme }) =>
      active
        ? `linear-gradient(135deg, ${theme.palette.primary.main}18, ${theme.palette.primary.main}12)`
        : `${theme.palette.primary.main}08`};
    color: ${({ theme }) => theme.palette.primary.main};
    transform: translateX(4px);
    border-color: ${({ theme }) => `${theme.palette.primary.main}30`};
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.palette.primary.main}20`};

    .icon {
      opacity: 1;
      color: ${({ theme }) => theme.palette.primary.main};
      transform: scale(1.1);
    }

    &::before {
      transform: scaleY(1);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 2px;
  }

  &:active {
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 14px;
    border-radius: 12px;

    .icon {
      margin-right: 12px;
      font-size: 18px;
    }
  }
`;
