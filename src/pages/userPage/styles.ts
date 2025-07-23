import styled from "styled-components";
import { device, max, min } from "../../constants/responsiveClient";

export const PaperMain = styled.div`
  padding: 32px;

  ${max(device.mobile)} {
    padding: 16px;
  }

  ${min(device.desktop)} {
    padding: 48px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: center;
  flex-wrap: wrap;

  ${min(device.desktop)} {
    gap: 24px;
    margin-top: 32px;
  }
`;

export const EditButton = styled.button`
  flex: 1;
  min-width: 140px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  padding: 12px 0;
  cursor: pointer;

  ${max(device.mobile)} {
    width: 100%;
  }

  ${min(device.desktop)} {
    min-width: 180px;
    padding: 16px 0;
  }
`;

export const PaperAvatar = styled.div`
  padding: 24px;
  text-align: center;

  ${max(device.mobile)} {
    padding: 16px;
  }

  ${min(device.desktop)} {
    padding: 32px;
  }
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;

  ${max(device.mobile)} {
    width: 70px;
    height: 70px;
  }

  ${min(device.desktop)} {
    width: 120px;
    height: 120px;
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

  ${max(device.mobile)} {
    width: 100%;
  }

  ${min(device.desktop)} {
    padding: 14px 0;
  }
`;
