import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";
import AccessDeniedModal from "../mod/AcessDanied-Modal/index";

const ROUTE_PERMISSIONS = {
  "/home": ["Administrador", "Usuário", "Cliente"],
  "/clientes": ["Administrador", "Usuário"],
  "/agenda": ["Administrador", "Usuário"],
  "/financeiro": ["Administrador"],
  "/relatorios": ["Administrador"],
  "/marketing": ["Administrador", "Usuário"],
  "/configuracao": ["Administrador", "Usuário"],
  "/permissions/:permissionName": ["Administrador"],
  "/minhaclinica": ["Administrador", "Usuário"],
  "/perfil": ["Administrador", "Usuário", "Cliente"],
  "/alterar-email": ["Administrador", "Usuário", "Cliente"],
  "/alterar-senha": ["Administrador", "Usuário", "Cliente"],
  "/cadastro-usuario": ["Administrador", "Usuário"],
  "/clientes/novo": ["Administrador", "Usuário"],
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
      console.log("❌ Usuário sem permissões:", user);
      return false;
    }

    console.log("📋 Permissões do usuário:", user.permissions);
    console.log("🔑 Permissões necessárias:", requiredPermissions);

    const hasAccess = user.permissions.some((permission) =>
      requiredPermissions.includes(permission)
    );

    console.log("✅ Tem acesso?", hasAccess);
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

  return {
    hasPermission,
    hasAnyPermission,
    canAccessRoute,
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
    "/minhaclinica": "Minha Clínica",
    "/permissions/:permissionName": "Gerenciar Permissões",
    "/cadastro-usuario": "Cadastro de Usuário",
  };

  return routeNames[path] || "Esta página";
};

export { ROUTE_PERMISSIONS };
