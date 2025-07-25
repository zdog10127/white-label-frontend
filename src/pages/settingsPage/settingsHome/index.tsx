import React, { useState } from "react";
import {
  PageWrapper,
  Content,
  Header,
  Title,
  SubHeader,
  AddButton,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButtons,
  TopNav,
  NavItem,
} from "./styles";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import SettingsSidebar from "../../../components/side-bar/SideBarSettings/SideBarSettings";

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState<"profissionais" | "colaboradores">(
    "profissionais"
  );

  return (
    <PageWrapper>
      <SettingsSidebar />

      <Content>
        <TopNav>
          <NavItem
            active={activeTab === "profissionais"}
            onClick={() => setActiveTab("profissionais")}
          >
            Profissionais
          </NavItem>
          <NavItem
            active={activeTab === "colaboradores"}
            onClick={() => setActiveTab("colaboradores")}
          >
            Colaboradores
          </NavItem>
        </TopNav>

        {activeTab === "profissionais" && (
          <>
            <Header>
              <Title>Profissionais</Title>
              <SubHeader>
                Usuários profissionais são os usuários que atendem em sua
                clínica e que poderão ou não utilizar o sistema.
              </SubHeader>
              <AddButton variant="contained">
                + Adicionar profissional
              </AddButton>
            </Header>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Atende grupos?</TableCell>
                  <TableCell>Acesso ao sistema</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHeader>
              <tbody>
                <TableRow>
                  <TableCell>Jhonathan Costa</TableCell>
                  <TableCell>jhonathancosta_dev@hotmail.com</TableCell>
                  <TableCell></TableCell>
                  <TableCell>✅</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </>
        )}

        {activeTab === "colaboradores" && (
          <div>
            <p>Conteúdo de colaboradores (em desenvolvimento)</p>
          </div>
        )}
      </Content>
    </PageWrapper>
  );
};

export default Configuracoes;
