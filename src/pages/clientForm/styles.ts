import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const ClientFormContainer = styled.div`
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (${max(device.mobile)}) {
    margin: 1rem 16px;
    padding: 1.5rem;
  }

  @media (${min(device.tablet)}) {
    max-width: 700px;
    padding: 2.5rem;
  }

  @media (${min(device.desktop)}) {
    max-width: 900px;
    padding: 3rem;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #333;

  @media (${max(device.mobile)}) {
    font-size: 1.25rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 1.75rem;
  }
`;

export const ClientFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (${max(device.mobile)}) {
    gap: 0.75rem;
  }

  @media (${min(device.desktop)}) {
    gap: 1.25rem;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (${max(device.mobile)}) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 1.1rem;
    padding: 1rem;
  }

  &:hover {
    background-color: #1565c0;
  }
`;

export const SuccessMessage = styled.p`
  margin-top: 1rem;
  color: #2e7d32;
  text-align: center;
  font-weight: 500;

  @media (${max(device.mobile)}) {
    font-size: 0.9rem;
  }

  @media (${min(device.desktop)}) {
    font-size: 1.1rem;
  }
`;
