import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationsActive } from "@mui/icons-material";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  SidebarSubtitle,
  Section,
  Title,
  Item,
} from "./styles";
import {
  People,
  Security,
  Description,
  Assignment,
  CalendarMonth,
  Inventory2,
  HealthAndSafety,
  Payment,
  NotificationsActive as ClientNotification,
  PersonOutline,
  BusinessCenter,
  MedicalServices,
  AccountBalance,
  Category,
  Receipt,
  RoomService,
  Visibility,
  VideoCall,
  PersonAdd,
} from "@mui/icons-material";

const iconMap = {
  usuarios: People,
  permissoes: Security,
  documentos: Description,
  formularios: Assignment,
  "recursos-terapeuticos": MedicalServices,
  agenda: CalendarMonth,
  pacotes: Inventory2,
  convenios: HealthAndSafety,
  "formas-pagamento": Payment,
  "categorias-financeiras": Category,
  cobrancas: Receipt,
  "notificacoes-clientes": PersonOutline,
  "notificacoes-profissionais": BusinessCenter,
  servicos: RoomService,
  exibicoes: Visibility,
  "atend-online": VideoCall,
  "cadastro-clientes": PersonAdd,
};

const SettingsSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const getIcon = (key: string) => {
    const IconComponent =
      iconMap[key as keyof typeof iconMap] || NotificationsActive;
    return <IconComponent className="icon" />;
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>Configurações</SidebarTitle>
        <SidebarSubtitle>Gerencie seu sistema</SidebarSubtitle>
      </SidebarHeader>

      <Section>
        <Title>Usuários</Title>
        <Item
          active={isActive("/configuracao/usuarios")}
          onClick={() => navigate("/configuracao/usuarios")}
        >
          {getIcon("usuarios")}
          Usuários
        </Item>
        <Item
          active={isActive("/configuracao/permissoes")}
          onClick={() => navigate("/configuracao/permissoes")}
        >
          {getIcon("permissoes")}
          Permissões
        </Item>
      </Section>

      <Section>
        <Title>Modelos</Title>
        <Item
          active={isActive("/configuracao/documentos")}
          onClick={() => navigate("/configuracao/documentos")}
        >
          {getIcon("documentos")}
          Documentos
        </Item>
        <Item
          active={isActive("/configuracao/formularios")}
          onClick={() => navigate("/configuracao/formularios")}
        >
          {getIcon("formularios")}
          Formulários de sessão
        </Item>
        <Item
          active={isActive("/configuracao/recursos-terapeuticos")}
          onClick={() => navigate("/configuracao/recursos-terapeuticos")}
        >
          {getIcon("recursos-terapeuticos")}
          Recursos terapêuticos
        </Item>
      </Section>

      <Section>
        <Title>Agenda</Title>
        <Item
          active={isActive("/configuracao/agenda")}
          onClick={() => navigate("/configuracao/agenda")}
        >
          {getIcon("agenda")}
          Agenda e salas
        </Item>
      </Section>

      <Section>
        <Title>Finanças</Title>
        <Item
          active={isActive("/configuracao/pacotes")}
          onClick={() => navigate("/configuracao/pacotes")}
        >
          {getIcon("pacotes")}
          Pacotes
        </Item>
        <Item
          active={isActive("/configuracao/convenios")}
          onClick={() => navigate("/configuracao/convenios")}
        >
          {getIcon("convenios")}
          Convênios e repasses
        </Item>
        <Item
          active={isActive("/configuracao/formas-pagamento")}
          onClick={() => navigate("/configuracao/formas-pagamento")}
        >
          {getIcon("formas-pagamento")}
          Formas de pagamento
        </Item>
        <Item
          active={isActive("/configuracao/categorias-financeiras")}
          onClick={() => navigate("/configuracao/categorias-financeiras")}
        >
          {getIcon("categorias-financeiras")}
          Categorias financeiras
        </Item>
        <Item
          active={isActive("/configuracao/cobrancas")}
          onClick={() => navigate("/configuracao/cobrancas")}
        >
          {getIcon("cobrancas")}
          Cobranças
        </Item>
      </Section>

      <Section>
        <Title>Notificações</Title>
        <Item
          active={isActive("/configuracao/notificacoes-clientes")}
          onClick={() => navigate("/configuracao/notificacoes-clientes")}
        >
          {getIcon("notificacoes-clientes")}
          Para clientes
        </Item>
        <Item
          active={isActive("/configuracao/notificacoes-profissionais")}
          onClick={() => navigate("/configuracao/notificacoes-profissionais")}
        >
          {getIcon("notificacoes-profissionais")}
          Para o profissional
        </Item>
      </Section>

      <Section>
        <Title>Gerais</Title>
        <Item
          active={isActive("/configuracao/servicos")}
          onClick={() => navigate("/configuracao/servicos")}
        >
          {getIcon("servicos")}
          Serviços
        </Item>
        <Item
          active={isActive("/configuracao/exibicoes")}
          onClick={() => navigate("/configuracao/exibicoes")}
        >
          {getIcon("exibicoes")}
          Exibições
        </Item>
        <Item
          active={isActive("/configuracao/atend-online")}
          onClick={() => navigate("/configuracao/atend-online")}
        >
          {getIcon("atend-online")}
          Atend. Online
        </Item>
        <Item
          active={isActive("/configuracao/cadastro-clientes")}
          onClick={() => navigate("/configuracao/cadastro-clientes")}
        >
          {getIcon("cadastro-clientes")}
          Cadastro de clientes
        </Item>
      </Section>
    </SidebarContainer>
  );
};

export default SettingsSidebar;
