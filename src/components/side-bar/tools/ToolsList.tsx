import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IListingToolsProps {
  searchText?: string;
  showSearchInput?: boolean;
  onSearchTextChange?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  onNewClick?: () => void;
}

export const ListingTools: React.FC<IListingToolsProps> = ({
  searchText = "",
  showSearchInput = false,
  onSearchTextChange,
  newButtonText = "Novo",
  showNewButton = true,
  onNewClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      margin={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          value={searchText}
          onChange={(e) => onSearchTextChange?.(e.target.value)}
          size="small"
          placeholder="Pesquisar"
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={onNewClick}
            endIcon={<Icon>add</Icon>}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
