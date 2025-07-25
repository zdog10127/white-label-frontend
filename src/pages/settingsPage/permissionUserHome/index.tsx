import React, { useState } from "react";
import * as S from "../permissionUserHome/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../shared/hooks/searchUser";
import SettingsSidebar from "../../../components/side-bar/SideBarSettings/SideBarSettings";

interface Permission {
  name: string;
  description: string;
  level: "high" | "medium" | "low";
  category: "administrativa" | "operacional";
}

const permissions: Permission[] = [
  {
    name: "Administrador",
    description:
      "Acesso total ao sistema, pode gerenciar usuários e todas as funcionalidades",
    level: "high",
    category: "administrativa",
  },
  {
    name: "Usuário",
    description:
      "Acesso ao sistema com permissões limitadas para uso das funcionalidades principais",
    level: "medium",
    category: "operacional",
  },
  {
    name: "Cliente",
    description: "Acesso somente ao aplicativo mobile ou portal do cliente",
    level: "low",
    category: "operacional",
  },
];

const PermissionList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { users, loading } = useUsers();

  const handleNavigate = (permissionName: string) => {
    navigate(`/permissions/${encodeURIComponent(permissionName)}`);
  };

  const getUserCountByPermission = (permissionName: string): number => {
    if (!users || users.length === 0) return 0;
    return users.filter(
      (user) => user.permissions && user.permissions.includes(permissionName)
    ).length;
  };

  const filteredPermissions = permissions.filter((perm) => {
    const matchesSearch =
      perm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perm.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "#f44336";
      case "medium":
        return "#ff9800";
      case "low":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "high":
        return "Alto";
      case "medium":
        return "Médio";
      case "low":
        return "Baixo";
      default:
        return "N/A";
    }
  };

  const getPermissionIcon = (name: string) => {
    switch (name) {
      case "Administrador":
        return <AdminPanelSettingsIcon />;
      case "Usuário":
        return <PersonIcon />;
      case "Cliente":
        return <PeopleIcon />;
      default:
        return <SecurityIcon />;
    }
  };

  const getPermissionColor = (name: string) => {
    switch (name) {
      case "Administrador":
        return "#f44336";
      case "Usuário":
        return "#2196f3";
      case "Cliente":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.Header>
          <S.Title>
            <SecurityIcon style={{ marginRight: "12px", fontSize: "32px" }} />
            Sistema de Permissões
          </S.Title>
          <S.Subtitle>Carregando dados...</S.Subtitle>
        </S.Header>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <SettingsSidebar />
      <S.Header>
        <S.Title>
          <SecurityIcon style={{ marginRight: "12px", fontSize: "32px" }} />
          Sistema de Permissões
        </S.Title>
        <S.Subtitle>
          Gerencie os três níveis de acesso do sistema: Administrador, Usuário e
          Cliente
        </S.Subtitle>
      </S.Header>

      <S.FilterSection>
        <S.SearchContainer>
          <SearchIcon />
          <S.SearchInput
            type="text"
            placeholder="Buscar permissões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchContainer>

        <div
          style={{
            color: "#666",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SecurityIcon style={{ fontSize: "18px" }} />
          {filteredPermissions.length} de {permissions.length} permissões
        </div>
      </S.FilterSection>

      {filteredPermissions.length === 0 ? (
        <S.EmptyState>
          <SearchIcon className="icon" />
          <h3>Nenhuma permissão encontrada</h3>
          <p>
            Tente ajustar os termos de busca para encontrar as permissões
            desejadas.
          </p>
        </S.EmptyState>
      ) : (
        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <S.TableHead>Permissão</S.TableHead>
                <S.TableHead>Definição</S.TableHead>
                <S.TableHead>Nível</S.TableHead>
                <S.TableHead>Usuários</S.TableHead>
                <S.TableHead>Ações</S.TableHead>
              </tr>
            </thead>
            <tbody>
              {filteredPermissions.map((perm, index) => {
                const userCount = getUserCountByPermission(perm.name);

                return (
                  <S.TableRow key={index}>
                    <S.TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            color: getPermissionColor(perm.name),
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {getPermissionIcon(perm.name)}
                        </div>
                        <S.PermissionName>{perm.name}</S.PermissionName>
                      </div>
                    </S.TableCell>
                    <S.TableCell>
                      <S.Description>{perm.description}</S.Description>
                    </S.TableCell>
                    <S.TableCell>
                      <S.LevelBadge
                        style={{
                          backgroundColor: getLevelColor(perm.level) + "20",
                          color: getLevelColor(perm.level),
                          borderColor: getLevelColor(perm.level) + "40",
                        }}
                      >
                        {getLevelText(perm.level)}
                      </S.LevelBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.UserCount>
                        <S.UserCountBadge
                          style={{
                            backgroundColor:
                              getPermissionColor(perm.name) + "20",
                            color: getPermissionColor(perm.name),
                          }}
                        >
                          {userCount}
                        </S.UserCountBadge>
                        usuários
                      </S.UserCount>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ActionButton
                        onClick={() => handleNavigate(perm.name)}
                        title="Gerenciar usuários dessa permissão"
                      >
                        <InfoOutlinedIcon />
                      </S.ActionButton>
                    </S.TableCell>
                  </S.TableRow>
                );
              })}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      )}
    </S.Container>
  );
};

export default PermissionList;
