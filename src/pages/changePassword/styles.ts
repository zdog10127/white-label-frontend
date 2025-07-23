import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const BoxContainer = styled.div`
  max-width: 480px;
  margin: 2rem auto 0;

  ${max(device.mobile)} {
    margin: 1rem 16px 0;
  }

  ${min(device.tablet)} {
    max-width: 700px;
    margin: 3rem auto 0;
  }

  ${min(device.desktop)} {
    max-width: 900px;
  }
`;

export const StyledPaper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.palette.divider};

  ${max(device.mobile)} {
    padding: 1rem;
  }

  ${min(device.desktop)} {
    padding: 3rem;
  }
`;

export const StyledDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.palette.divider};
  margin-bottom: 1.5rem;

  ${max(device.mobile)} {
    margin-bottom: 1rem;
  }

  ${min(device.tablet)} {
    margin-bottom: 2rem;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  ${max(device.mobile)} {
    flex-direction: column;
    gap: 1rem;
  }

  ${min(device.desktop)} {
    justify-content: flex-end;
    gap: 2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 1.5rem 0;

  ${max(device.mobile)} {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  ${min(device.desktop)} {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

export const SubsectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 2rem 0 1rem 0;

  ${max(device.mobile)} {
    font-size: 1rem;
    margin: 1.5rem 0 0.75rem 0;
  }

  ${min(device.desktop)} {
    font-size: 1.25rem;
    margin: 2.5rem 0 1.5rem 0;
  }
`;

export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  text-transform: none;
  transition: all 0.2s ease;

  &.primary {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.dark};
    }
  }

  &.outlined {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.primary.main};
    border: 1px solid ${({ theme }) => theme.palette.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }
  }

  ${max(device.mobile)} {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
    width: 100%;
  }

  ${min(device.desktop)} {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  ${min(device.tablet)} {
    grid-template-columns: 2fr 1fr;
  }

  ${min(device.desktop)} {
    gap: 3rem;
  }
`;

export const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${min(device.tablet)} {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  ${min(device.desktop)} {
    gap: 2rem;
  }
`;

export const SidebarCard = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.palette.divider};
  text-align: center;

  & + & {
    margin-top: 1.5rem;
  }

  ${max(device.mobile)} {
    padding: 1rem;

    & + & {
      margin-top: 1rem;
    }
  }

  ${min(device.desktop)} {
    padding: 2rem;

    & + & {
      margin-top: 2rem;
    }
  }
`;
