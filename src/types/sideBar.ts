export interface IListItemLinkProps {
  label: string;
  icon: React.ReactNode;
  to: string;
  onClick?: () => void;
}

export interface SideBarProps {
  children: React.ReactNode;
}