import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import WarningIcon from "@mui/icons-material/Warning";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CardBase from "./CardBase";
import clientData from "../data/clients.json";
import dayjs from "dayjs";
import { TabPanelProps } from "../../types/tabsCard";

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function TabsCard() {
  const [value, setValue] = useState(0);
  const [birthdays, setBirthdays] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const now = dayjs();
    const month = now.month() + 1;

    const aniversariantes = clientData.filter((client: any) => {
      const birthMonth = dayjs(client.DataNascimento).month() + 1;
      return birthMonth === month;
    });

    setBirthdays(aniversariantes);

    const pendencias = clientData.filter(
      (client: any) => client.Pendencias && client.Pendencias.length > 0
    );
    setPending(pendencias);

    const atividades = clientData.filter(
      (client: any) => client.Atividades && client.Atividades.length > 0
    );
    setActivities(atividades);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderClientSection = (
    list: any[],
    getContent: (client: any) => React.ReactNode
  ) =>
    list.map((client, i) => (
      <Paper
        key={i}
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {client.NomeCompleto[0]}
          </Avatar>
          <Typography fontWeight="bold">{client.NomeCompleto}</Typography>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        {getContent(client)}
      </Paper>
    ));

  return (
    <CardBase
      title="Informações"
      actions={
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="standard"
        >
          <Tab label="Aniversariantes do mês" />
          <Tab label="Pendências" />
          <Tab label="Atividades dos clientes" />
        </Tabs>
      }
    >
      <TabPanel value={value} index={0}>
        {birthdays.length > 0 ? (
          renderClientSection(birthdays, (client) => (
            <Stack direction="row" spacing={1} alignItems="center">
              <CakeIcon color="secondary" />
              <Typography variant="body2">
                Nascimento: {dayjs(client.DataNascimento).format("DD/MM/YYYY")}
              </Typography>
            </Stack>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhum aniversariante neste mês.
          </Typography>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {pending.length > 0 ? (
          renderClientSection(pending, (client) => (
            <List dense>
              {client.Pendencias.map((p: string, idx: number) => (
                <ListItem key={idx} disablePadding>
                  <WarningIcon
                    fontSize="small"
                    color="warning"
                    sx={{ mr: 1 }}
                  />
                  <ListItemText primary={p} />
                </ListItem>
              ))}
            </List>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma pendência registrada.
          </Typography>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {activities.length > 0 ? (
          renderClientSection(activities, (client) => (
            <List dense>
              {client.Atividades.map((a: string, idx: number) => (
                <ListItem key={idx} disablePadding>
                  <HistoryEduIcon
                    fontSize="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <ListItemText primary={a} />
                </ListItem>
              ))}
            </List>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma atividade registrada.
          </Typography>
        )}
      </TabPanel>
    </CardBase>
  );
}
