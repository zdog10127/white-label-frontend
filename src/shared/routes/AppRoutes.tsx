import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../contexts/DrawerContext";
import { Dashboard } from "../../pages/dashboard/DashBoard";
import { useEffect } from "react";
import {
  Apartment,
  Article,
  CalendarMonth,
  Campaign,
  Group,
  Groups2,
  Paid,
  Palette,
  PersonalVideo,
  Settings,
} from "@mui/icons-material";
import styled from "styled-components";
import { colors } from "@mui/material";
import ProtectedRoute from "./PrivateRoute";
import Login from "../../pages/Login";
import Home from "../../pages/dashboard/Home";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Painel",
        path: "/pagina-inicial",
        icon: <PersonalVideo fontSize="large" />,
        flexDirection: "column",
      },
      {
        label: "Clientes",
        path: "/clientes",
        icon: <Groups2 fontSize="large" />,
      },
      {
        label: "Agenda",
        path: "/agenda",
        icon: <CalendarMonth fontSize="large" />,
      },
      {
        label: "Financeiro",
        path: "/financeiro",
        icon: <Paid fontSize="large" />,
      },

      {
        label: "Relatorios",
        path: "/relatorios",
        icon: <Article fontSize="large" />,
      },

      {
        label: "Marketing",
        path: "/marketing",
        icon: <Campaign fontSize="large" />,
      },

      {
        label: "Configuração",
        path: "/configuracao",
        icon: <Settings fontSize="large" />,
      },

      {
        label: "Minha Clinica",
        path: "/minhaclinica",
        icon: <Apartment fontSize="large" />,
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/pagina-inicial" element={<Home />} />
      </Route>

      <Route path="/" element={<Navigate to="/pagina-inicial" replace />} />
      {/* outras rotas */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
