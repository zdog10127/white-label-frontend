import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { Task } from "../../types/taskCard";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (title: string, id?: number) => void;
    initialData?: Task | null;
};

export default function CreateTaskModal({ open, onClose, onSave, initialData }: Props) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
        } else {
            setTitle("");
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (title.trim() === "") return;
        onSave(title, initialData?.id);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{initialData ? "Editar Tarefa" : "Criar Tarefa"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Título da tarefa"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {initialData ? "Salvar" : "Criar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
