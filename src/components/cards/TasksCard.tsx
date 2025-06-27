import React, { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Checkbox,
  useTheme,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DeleteIcon from "@mui/icons-material/Delete";
import CardBase from "./CardBase";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksCard() {
  const theme = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Enviar relatório semanal", completed: false },
    { id: 2, title: "Revisar propostas de orçamento", completed: true },
    { id: 3, title: "Agendar reunião com o cliente", completed: false },
  ]);

  const handleToggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <CardBase title="Tarefas" avatar={<ChecklistIcon color="primary" />}>
      <Stack spacing={2}>
        <Button
          variant="text"
          color="primary"
          onClick={() =>
            alert("Abrir modal ou redirecionar para criação de nova tarefa")
          }
          sx={{ alignSelf: "flex-start" }}
        >
          + Criar uma nova tarefa
        </Button>

        {tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Ops! Ainda não existe nenhuma tarefa cadastrada.
          </Typography>
        ) : (
          tasks.map((task) => (
            <Box
              key={task.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                backgroundColor: task.completed
                  ? theme.palette.action.selected
                  : theme.palette.background.paper,
                "&:hover": {
                  backgroundColor: task.completed
                    ? theme.palette.action.hover
                    : theme.palette.action.hover,
                },
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.disabled" : "text.primary",
                  }}
                >
                  {task.title}
                </Typography>
              </Box>

              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(task.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))
        )}
      </Stack>
    </CardBase>
  );
}
