import React from "react";
import { LayoutBasePage } from "../../shared/layouts";
import ToolsDetails from "../../components/tools-details/ToolsDetails";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import CardBase from "../../components/cards/CardBase";

export const Dashboard = () => {
  return (
    <LayoutBasePage title="White Label" toolsBar={<ToolsDetails />}>
      <DashboardPanel />
    </LayoutBasePage>
  );
};

const DashboardPanel: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={3}
      px={{ xs: 1, md: 2 }}
      width="100%"
      boxSizing="border-box"
    >
      <Box flex={1.5} display="flex" flexDirection="column" gap={3}>
        <Paper sx={{ p: 1, width: "100%", boxSizing: "border-box" }}>
          <CardBase title="Próximas sessões" centerContent={false}>
            <Box mt={3} textAlign="center">
              <Typography fontWeight="bold">
                Você ainda não cadastrou nenhuma sessão.
              </Typography>
              <Typography>
                No momento, não há nenhuma sessão agendada. Registre uma sessão
                acessando o módulo Agenda.
              </Typography>
            </Box>
          </CardBase>
        </Paper>

        <Paper sx={{ p: 1, width: "100%", boxSizing: "border-box" }}>
          <CardBase title="Pendências e Atividades" centerContent={false}>
            <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
              <Button variant="outlined">Pendências (0)</Button>
              <Button variant="text">Atividade de clientes (0)</Button>
              <Button variant="text">Aniversariantes do mês</Button>
            </Box>
            <Box textAlign="center">
              <img
                src="/robot-placeholder.svg"
                alt="Placeholder"
                width={100}
                style={{ marginBottom: 16 }}
              />
              <Typography fontWeight="bold">
                Opss! Ainda não existem registros para mostrar aqui.
              </Typography>
            </Box>
          </CardBase>
        </Paper>
      </Box>

      <Box flex={1} display="flex" flexDirection="column" gap={3}>
        <Paper sx={{ p: 1, width: "100%", boxSizing: "border-box" }}>
          <CardBase title="Relatório financeiro" centerContent={false}>
            <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
              <Button variant="outlined">Relatório financeiro</Button>
              <Button variant="text">Psicobank</Button>
            </Box>

            <Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Saldo bloqueado</Typography>
                <Typography color="warning.main">R$ 0,00</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Saldo disponível para saque</Typography>
                <Typography color="primary">R$ 0,00</Typography>
              </Box>

              <Button variant="contained" fullWidth sx={{ mb: 2 }}>
                Sacar
              </Button>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Recebimentos do mês
              </Typography>

              <Box mt={1}>
                {["Cartão de crédito", "Boleto bancário", "Pix"].map(
                  (label) => (
                    <Box
                      key={label}
                      display="flex"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography>{label}</Typography>
                      <Typography>R$ 0,00</Typography>
                    </Box>
                  )
                )}
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold">Total</Typography>
                  <Typography fontWeight="bold">R$ 0,00</Typography>
                </Box>
              </Box>
            </Box>
          </CardBase>
        </Paper>

        <Paper sx={{ p: 1, width: "100%", boxSizing: "border-box" }}>
          <CardBase title="Tarefas" centerContent={false}>
            <Button sx={{ mt: 2, mb: 3 }} variant="outlined">
              + Criar uma nova tarefa
            </Button>
            <Box textAlign="center">
              <img
                src="/robot-placeholder.svg"
                alt="Placeholder"
                width={100}
                style={{ marginBottom: 16 }}
              />
              <Typography fontWeight="bold">
                Opss! Ainda não existe nenhuma tarefa cadastrada.
              </Typography>
            </Box>
          </CardBase>
        </Paper>
      </Box>
    </Box>
  );
};
