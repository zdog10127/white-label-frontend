export interface IListingToolsProps {
  searchText?: string;
  showSearchInput?: boolean;
  onSearchTextChange?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  onNewClick?: () => void;
}
