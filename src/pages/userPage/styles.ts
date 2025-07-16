import styled from "styled-components";
import { device, max } from "../../constants/responsiveClient";

export const PaperMain = styled.div`
  padding: 32px;

  @media ${max(device.mobile)} {
    padding: 16px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const EditButton = styled.button`
  flex: 1;
  min-width: 140px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  padding: 12px 0;
  cursor: pointer;

  @media ${max(device.mobile)} {
    width: 100%;
  }
`;

export const PaperAvatar = styled.div`
  padding: 24px;
  text-align: center;

  @media ${max(device.mobile)} {
    padding: 16px;
  }
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;

  @media ${max(device.mobile)} {
    width: 70px;
    height: 70px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const LogoutButton = styled.button`
  border-radius: 8px;
  text-transform: none;
  font-weight: bold;
  padding: 10px 0;
  cursor: pointer;

  @media ${max(device.mobile)} {
    width: 100%;
  }
`;
