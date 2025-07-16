import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const Container = styled.div`
  padding: 2rem;
  text-align: center;

  @media ${max(device.mobile)} {
    padding: 1rem;
  }

  @media ${min(device.desktop)} {
    padding: 3rem;
  }
`;

export const Title = styled.h1`
  margin-bottom: 1rem;

  @media ${max(device.mobile)} {
    font-size: 1.5rem;
  }

  @media ${min(device.desktop)} {
    font-size: 2.5rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #555;

  @media ${max(device.mobile)} {
    font-size: 1rem;
  }

  @media ${min(device.desktop)} {
    font-size: 1.3rem;
  }
`;
