import React, { useState } from "react";
import * as S from "./styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

interface Permission {
  name: string;
  description: string;
  level: "high" | "medium" | "low";
  category: "administrativa" | "operacional" | "técnica" | "financeira";
  tags: string[];
  userCount?: number;
}

const permissions: Permission[] = [
  {
    name: "Administrador do Sistema",
    description: "Total acesso ao sistema e pode cadastrar usuários",
    level: "high",
    category: "administrativa",
    tags: ["admin", "usuários", "sistema"],
    userCount: 3,
  },
  {
    name: "Gestor de eventos",
    description:
      "Pode criar eventos, adicionar usuários existentes ao sistema mas não pode criar usuários ou definir permissões",
    level: "medium",
    category: "operacional",
    tags: ["eventos", "gestão", "usuários"],
    userCount: 8,
  },
  {
    name: "Usuário de campo",
    description: "Possui apenas permissão no aplicativo",
    level: "low",
    category: "operacional",
    tags: ["campo", "aplicativo", "básico"],
    userCount: 45,
  },
  {
    name: "Moderador de conteúdo",
    description:
      "Pode revisar, aprovar e remover conteúdo gerado pelos usuários",
    level: "medium",
    category: "administrativa",
    tags: ["conteúdo", "moderação", "aprovação"],
    userCount: 12,
  },
  {
    name: "Analista financeiro",
    description:
      "Acesso a relatórios financeiros e pode gerar análises de custos",
    level: "medium",
    category: "financeira",
    tags: ["finanças", "relatórios", "análise"],
    userCount: 6,
  },
  {
    name: "Supervisor de equipe",
    description: "Gerencia equipes específicas e pode atribuir tarefas",
    level: "medium",
    category: "operacional",
    tags: ["equipe", "supervisão", "tarefas"],
    userCount: 15,
  },
  {
    name: "Operador de sistema",
    description: "Pode executar operações básicas do sistema e monitoramento",
    level: "low",
    category: "técnica",
    tags: ["sistema", "operações", "monitoramento"],
    userCount: 22,
  },
  {
    name: "Auditor interno",
    description: "Acesso somente leitura a logs e relatórios para auditoria",
    level: "low",
    category: "administrativa",
    tags: ["auditoria", "logs", "compliance"],
    userCount: 4,
  },
  {
    name: "Gerente de projeto",
    description:
      "Pode criar e gerenciar projetos, alocar recursos e definir cronogramas",
    level: "high",
    category: "operacional",
    tags: ["projetos", "recursos", "cronograma"],
    userCount: 7,
  },
  {
    name: "Suporte técnico",
    description: "Pode acessar dados de usuários para resolução de problemas",
    level: "medium",
    category: "técnica",
    tags: ["suporte", "usuários", "troubleshooting"],
    userCount: 18,
  },
  {
    name: "Controller financeiro",
    description:
      "Controle total sobre orçamentos, aprovações financeiras e planejamento",
    level: "high",
    category: "financeira",
    tags: ["controller", "orçamento", "aprovações"],
    userCount: 2,
  },
  {
    name: "Desenvolvedor",
    description: "Acesso ao ambiente de desenvolvimento e deploy de aplicações",
    level: "high",
    category: "técnica",
    tags: ["desenvolvimento", "deploy", "código"],
    userCount: 9,
  },
];

const PermissionList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleNavigate = (permissionName: string) => {
    navigate(`/permissions/${encodeURIComponent(permissionName)}`);
  };

  const filteredPermissions = permissions.filter((perm) => {
    const matchesSearch =
      perm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perm.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perm.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || perm.category === selectedCategory;

    return matchesSearch && matchesCategory;
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "administrativa":
        return <AdminPanelSettingsIcon />;
      case "operacional":
        return <WorkIcon />;
      case "técnica":
        return <BuildIcon />;
      case "financeira":
        return <AttachMoneyIcon />;
      default:
        return <SecurityIcon />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "administrativa":
        return "#9c27b0";
      case "operacional":
        return "#2196f3";
      case "técnica":
        return "#607d8b";
      case "financeira":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const categories = [
    { value: "all", label: "Todas as categorias", count: permissions.length },
    {
      value: "administrativa",
      label: "Administrativa",
      count: permissions.filter((p) => p.category === "administrativa").length,
    },
    {
      value: "operacional",
      label: "Operacional",
      count: permissions.filter((p) => p.category === "operacional").length,
    },
    {
      value: "técnica",
      label: "Técnica",
      count: permissions.filter((p) => p.category === "técnica").length,
    },
    {
      value: "financeira",
      label: "Financeira",
      count: permissions.filter((p) => p.category === "financeira").length,
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <SecurityIcon style={{ marginRight: "12px", fontSize: "32px" }} />
          Sistema de Permissões
        </S.Title>
        <S.Subtitle>
          Gerencie permissões por categoria e visualize os usuários associados a
          cada nível de acesso
        </S.Subtitle>
      </S.Header>

      <S.FilterSection>
        <S.SearchContainer>
          <SearchIcon />
          <S.SearchInput
            type="text"
            placeholder="Buscar por nome, descrição ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchContainer>

        <S.CategoryFilter>
          <FilterListIcon style={{ marginRight: "8px", fontSize: "20px" }} />
          <S.CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label} ({cat.count})
              </option>
            ))}
          </S.CategorySelect>
        </S.CategoryFilter>
      </S.FilterSection>

      <S.ResultsInfo>
        <span>{filteredPermissions.length} permissão(ões) encontrada(s)</span>
        {selectedCategory !== "all" && (
          <S.CategoryBadge
            style={{
              backgroundColor: getCategoryColor(selectedCategory) + "20",
              color: getCategoryColor(selectedCategory),
            }}
          >
            {getCategoryIcon(selectedCategory)}
            {categories.find((c) => c.value === selectedCategory)?.label}
          </S.CategoryBadge>
        )}
      </S.ResultsInfo>

      {filteredPermissions.length === 0 ? (
        <S.EmptyState>
          <SearchIcon className="icon" />
          <h3>Nenhuma permissão encontrada</h3>
          <p>
            Tente ajustar os filtros ou termos de busca para encontrar as
            permissões desejadas.
          </p>
        </S.EmptyState>
      ) : (
        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <S.TableHead>Permissão</S.TableHead>
                <S.TableHead>Categoria</S.TableHead>
                <S.TableHead>Definição</S.TableHead>
                <S.TableHead>Nível</S.TableHead>
                <S.TableHead>Tags</S.TableHead>
                <S.TableHead>Usuários</S.TableHead>
                <S.TableHead>Ações</S.TableHead>
              </tr>
            </thead>
            <tbody>
              {filteredPermissions.map((perm, index) => (
                <S.TableRow key={index}>
                  <S.TableCell>
                    <S.PermissionName>{perm.name}</S.PermissionName>
                  </S.TableCell>
                  <S.TableCell>
                    <S.CategoryBadge
                      style={{
                        backgroundColor: getCategoryColor(perm.category) + "20",
                        color: getCategoryColor(perm.category),
                      }}
                    >
                      {getCategoryIcon(perm.category)}
                      {perm.category}
                    </S.CategoryBadge>
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
                    <S.TagsContainer>
                      {perm.tags.slice(0, 2).map((tag, tagIndex) => (
                        <S.Tag key={tagIndex}>{tag}</S.Tag>
                      ))}
                      {perm.tags.length > 2 && (
                        <S.MoreTags>+{perm.tags.length - 2}</S.MoreTags>
                      )}
                    </S.TagsContainer>
                  </S.TableCell>
                  <S.TableCell>
                    <S.UserCount>
                      <S.UserCountBadge>{perm.userCount || 0}</S.UserCountBadge>
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
              ))}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      )}
    </S.Container>
  );
};

export default PermissionList;
