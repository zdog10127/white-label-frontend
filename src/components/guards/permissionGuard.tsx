import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";
import AccessDeniedModal from "../../components/mod/AccessDenied-Modal/index";

const ROUTE_PERMISSIONS = {
  "/home": ["Administrador", "Usuário", "Cliente"],
  "/clientes": ["Administrador", "Usuário"],
  "/clientes/novo": ["Administrador", "Usuário"],
  "/agenda": ["Administrador", "Usuário"],
  "/financeiro": ["Administrador"],
  "/relatorios": ["Administrador"],
  "/marketing": ["Administrador", "Usuário"],
  "/configuracao": ["Administrador", "Usuário"],
  "/configuracao/usuarios": ["Administrador", "Usuário"],
  "/configuracao/permissoes": ["Administrador"],
  "/configuracao/documentos": ["Administrador", "Usuário"],
  "/configuracao/formularios": ["Administrador", "Usuário"],
  "/configuracao/recursos-terapeuticos": ["Administrador", "Usuário"],
  "/configuracao/agenda": ["Administrador", "Usuário"],
  "/configuracao/pacotes": ["Administrador", "Usuário"],
  "/configuracao/convenios": ["Administrador", "Usuário"],
  "/configuracao/formas-pagamento": ["Administrador", "Usuário"],
  "/configuracao/categorias-financeiras": ["Administrador", "Usuário"],
  "/configuracao/cobrancas": ["Administrador", "Usuário"],
  "/configuracao/notificacoes-clientes": ["Administrador", "Usuário"],
  "/configuracao/notificacoes-profissionais": ["Administrador", "Usuário"],
  "/configuracao/servicos": ["Administrador", "Usuário"],
  "/configuracao/exibicoes": ["Administrador", "Usuário"],
  "/configuracao/atend-online": ["Administrador", "Usuário"],
  "/configuracao/cadastro-clientes": ["Administrador", "Usuário"],
  "/permissions/:permissionName": ["Administrador"],
  "/minhaclinica": ["Administrador", "Usuário"],
  "/perfil": ["Administrador", "Usuário", "Cliente"],
  "/alterar-email": ["Administrador", "Usuário", "Cliente"],
  "/alterar-senha": ["Administrador", "Usuário", "Cliente"],
  "/cadastro-usuario": ["Administrador", "Usuário"],
};

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermissions: string[];
  routePath: string;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermissions,
  routePath,
}) => {
  const { user } = useAuth();
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const hasPermission = () => {
    if (!user || !user.permissions) {
      return false;
    }

    const hasAccess = user.permissions.some((permission) =>
      requiredPermissions.includes(permission)
    );

    return hasAccess;
  };

  if (!hasPermission()) {
    return (
      <>
        <AccessDeniedModal
          open={true}
          onClose={() => {
            window.history.back();
          }}
          routeName={getRouteName(routePath)}
          userPermissions={user?.permissions || []}
          requiredPermissions={requiredPermissions}
        />

        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <p>Acesso negado</p>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: string) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]) => {
    if (!user || !user.permissions) return false;
    return user.permissions.some((p) => permissions.includes(p));
  };

  const canAccessRoute = (routePath: string) => {
    const requiredPermissions =
      ROUTE_PERMISSIONS[routePath as keyof typeof ROUTE_PERMISSIONS];
    if (!requiredPermissions) return true;
    return hasAnyPermission(requiredPermissions);
  };

  const canShowMenuItem = (routePath: string) => {
    return canAccessRoute(routePath);
  };

  return {
    hasPermission,
    hasAnyPermission,
    canAccessRoute,
    canShowMenuItem,
    userPermissions: user?.permissions || [],
  };
};

const getRouteName = (path: string): string => {
  const routeNames: { [key: string]: string } = {
    "/home": "Painel",
    "/clientes": "Clientes",
    "/agenda": "Agenda",
    "/financeiro": "Financeiro",
    "/relatorios": "Relatórios",
    "/marketing": "Marketing",
    "/configuracao": "Configuração",
    "/configuracao/usuarios": "Usuários",
    "/configuracao/permissoes": "Permissões",
    "/configuracao/documentos": "Documentos",
    "/configuracao/formularios": "Formulários de Sessão",
    "/configuracao/recursos-terapeuticos": "Recursos Terapêuticos",
    "/configuracao/agenda": "Agenda e Salas",
    "/configuracao/pacotes": "Pacotes",
    "/configuracao/convenios": "Convênios e Repasses",
    "/configuracao/formas-pagamento": "Formas de Pagamento",
    "/configuracao/categorias-financeiras": "Categorias Financeiras",
    "/configuracao/cobrancas": "Cobranças",
    "/configuracao/notificacoes-clientes": "Notificações para Clientes",
    "/configuracao/notificacoes-profissionais":
      "Notificações para Profissionais",
    "/configuracao/servicos": "Serviços",
    "/configuracao/exibicoes": "Exibições",
    "/configuracao/atend-online": "Atendimento Online",
    "/configuracao/cadastro-clientes": "Cadastro de Clientes",
    "/minhaclinica": "Minha Clínica",
    "/permissions/:permissionName": "Gerenciar Permissões",
    "/cadastro-usuario": "Cadastro de Usuário",
  };

  return routeNames[path] || "Esta página";
};

export { ROUTE_PERMISSIONS };
