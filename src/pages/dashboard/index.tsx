import React from "react";
import { LayoutBasePage } from "../../shared/layouts";
import ToolsDetails from "../../components/tools-details/ToolsDetails";
import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import CardBase from "../../components/cards/CardBase";

import {
  Container,
  LeftPanel,
  RightPanel,
  PaperStyled,
  ButtonGroupBox,
  CenterTextBox,
  CenteredImage,
} from "./styles";

export const Dashboard = () => {
  return (
    <LayoutBasePage title="White Label" toolsBar={<ToolsDetails />}>
      <DashboardPanel />
    </LayoutBasePage>
  );
};

const DashboardPanel: React.FC = () => {
  return (
    <Container>
      <LeftPanel>
        <PaperStyled>
          <CardBase title="Próximas sessões" centerContent={false}>
            <CenterTextBox>
              <Typography fontWeight="bold">
                Você ainda não cadastrou nenhuma sessão.
              </Typography>
              <Typography>
                No momento, não há nenhuma sessão agendada. Registre uma sessão
                acessando o módulo Agenda.
              </Typography>
            </CenterTextBox>
          </CardBase>
        </PaperStyled>

        <PaperStyled>
          <CardBase title="Pendências e Atividades" centerContent={false}>
            <ButtonGroupBox>
              <Button variant="outlined">Pendências (0)</Button>
              <Button variant="text">Atividade de clientes (0)</Button>
              <Button variant="text">Aniversariantes do mês</Button>
            </ButtonGroupBox>
            <CenterTextBox>
              <CenteredImage
                src="/robot-placeholder.svg"
                alt="Placeholder"
                width={100}
              />
              <Typography fontWeight="bold">
                Opss! Ainda não existem registros para mostrar aqui.
              </Typography>
            </CenterTextBox>
          </CardBase>
        </PaperStyled>
      </LeftPanel>

      <RightPanel>
        <PaperStyled>
          <CardBase title="Relatório financeiro" centerContent={false}>
            <ButtonGroupBox>
              <Button variant="outlined">Relatório financeiro</Button>
              <Button variant="text">Psicobank</Button>
            </ButtonGroupBox>

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
        </PaperStyled>

        <PaperStyled>
          <CardBase title="Tarefas" centerContent={false}>
            <Button sx={{ mt: 2, mb: 3 }} variant="outlined">
              + Criar uma nova tarefa
            </Button>
            <CenterTextBox>
              <CenteredImage
                src="/robot-placeholder.svg"
                alt="Placeholder"
                width={100}
              />
              <Typography fontWeight="bold">
                Opss! Ainda não existe nenhuma tarefa cadastrada.
              </Typography>
            </CenterTextBox>
          </CardBase>
        </PaperStyled>
      </RightPanel>
    </Container>
  );
};
