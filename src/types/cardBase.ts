import { SxProps, Theme } from '@mui/system';


export interface CustomCardBaseProps {
  title?: React.ReactNode;
  subheader?: string;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  centerContent?: boolean;
  sx?: SxProps<Theme>;
}