import { Group, ListAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Skeleton,
  useTheme,
} from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostarBotaoAdicionarCliente?: boolean;
  mostarBotaoListagemDeCliente?: boolean;
  mostarBotaoListaDeEspera?: boolean;
  mostarBotaoDeGrupos?: boolean;
  mostarBotaoDeVoltar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmAdicionar?: () => void;
  aoClicarEmListaDeCliente?: () => void;
  aoClicarEmListaDeEspera?: () => void;
  aoClicarEmGrupos?: () => void;
  aoClicarEmVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",
  
  mostarBotaoAdicionarCliente = true,
  mostarBotaoListagemDeCliente = true,
  mostarBotaoListaDeEspera = true,
  mostarBotaoDeGrupos = true,
  mostarBotaoDeVoltar = true,

  aoClicarEmNovo,
  aoClicarEmAdicionar,
  aoClicarEmListaDeCliente,
  aoClicarEmListaDeEspera,
  aoClicarEmGrupos,
  aoClicarEmVoltar,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      margin={1}
      padding={1}
      paddingX={2}
      display={"flex"}
      gap={1}
      component={Paper}
    >
      {mostarBotaoAdicionarCliente && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={aoClicarEmAdicionar}
          endIcon={<Icon>add</Icon>}
        >
          Adicionar Cliente
        </Button>
      )}

      {mostarBotaoListagemDeCliente && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={aoClicarEmListaDeCliente}
          endIcon={<Icon>list</Icon>}
        >
          Listagem de clientes
        </Button>
      )}
      {mostarBotaoListaDeEspera && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={aoClicarEmListaDeEspera}
          endIcon={<Icon>list</Icon>}
        >
          Lista de espera
        </Button>
      )}

      {mostarBotaoDeGrupos && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={aoClicarEmGrupos}
          endIcon={<Group></Group>}
        >
          Grupos
        </Button>
      )}

      {mostarBotaoDeVoltar && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={aoClicarEmVoltar}
          endIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
