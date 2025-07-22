import { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import CardBase from "./CardBase";
import { Task } from "../../types/taskCard";
import CreateTaskModal from "../../components/mod/taskCard-Modal/taskCardModal";

export default function TasksCard() {
  const theme = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Enviar relatório semanal", completed: false },
    { id: 2, title: "Revisar propostas de orçamento", completed: true },
    { id: 3, title: "Agendar reunião com o cliente", completed: false },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [taskEditing, setTaskEditing] = useState<Task | null>(null);

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

  const handleOpenCreateModal = () => {
    setTaskEditing(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setTaskEditing(task);
    setOpenModal(true);
  };

  const handleSaveTask = (title: string, id?: number) => {
    if (id) {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, title } : task))
      );
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setOpenModal(false);
    setTaskEditing(null);
  };

  return (
    <CardBase title="Tarefas" avatar={<ChecklistIcon color="primary" />}>
      <Stack spacing={2}>
        <Button
          variant="text"
          color="primary"
          onClick={handleOpenCreateModal}
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

              <Box>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleOpenEditModal(task)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(task.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </Stack>

      <CreateTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveTask}
        initialData={taskEditing}
      />
    </CardBase>
  );
}
