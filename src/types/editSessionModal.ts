export type SessaoType = {
    Data: string;
    Horario: string;
    Status: string;
    Frequencia: string;
};

export type Props = {
    open: boolean;
    onClose: () => void;
    session: SessaoType | null | undefined;
    onSave: (updatedSession: SessaoType) => void;
};
