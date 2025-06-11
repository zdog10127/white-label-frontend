import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CardBase from "./CardBase";

export default function TasksCard() {
  return (
    <CardBase title="Tarefas" avatar={<ChecklistIcon color="primary" />}>
      <Stack spacing={2}>
        <Button variant="text" color="primary">
          + Criar uma nova tarefa
        </Button>

        <Typography variant="body2" color="text.secondary">
          Ops! Ainda não existe nenhuma tarefa cadastrada.
        </Typography>
      </Stack>
    </CardBase>
  );
}
