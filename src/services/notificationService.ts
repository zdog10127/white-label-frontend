import { Patient } from "./patientService";
import dayjs from "dayjs";

export interface Notification {
  id: string;
  type: "warning" | "info" | "error";
  title: string;
  message: string;
  patientId?: string;
  patientName?: string;
  date: string;
  priority: "high" | "medium" | "low";
}

export const generateNotifications = (patients: Patient[]): Notification[] => {
  const notifications: Notification[] = [];

  patients.forEach((patient) => {
    if (!patient.active && patient.lastReviewDate) {
      const daysSinceReview = dayjs().diff(dayjs(patient.lastReviewDate), "day");
      if (daysSinceReview > 90) {
        notifications.push({
          id: `inactive-${patient.id}`,
          type: "info",
          title: "Paciente Inativo",
          message: `${patient.name} está inativo há ${daysSinceReview} dias`,
          patientId: patient.id,
          patientName: patient.name,
          date: new Date().toISOString(),
          priority: daysSinceReview > 180 ? "high" : "low",
        });
      }
    }

    if (!patient.cancer?.type) {
      notifications.push({
        id: `cancer-${patient.id}`,
        type: "error",
        title: "Dados Incompletos",
        message: `${patient.name} não possui tipo de câncer definido`,
        patientId: patient.id,
        patientName: patient.name,
        date: new Date().toISOString(),
        priority: "high",
      });
    }

    if (!patient.phone && patient.active) {
      notifications.push({
        id: `phone-${patient.id}`,
        type: "warning",
        title: "Contato Principal Faltando",
        message: `${patient.name} não possui telefone principal cadastrado`,
        patientId: patient.id,
        patientName: patient.name,
        date: new Date().toISOString(),
        priority: "high",
      });
    }

    if (!patient.address?.neighborhood && patient.active) {
      notifications.push({
        id: `address-${patient.id}`,
        type: "warning",
        title: "Endereço Incompleto",
        message: `${patient.name} não possui bairro cadastrado`,
        patientId: patient.id,
        patientName: patient.name,
        date: new Date().toISOString(),
        priority: "medium",
      });
    }

    if (!patient.treatmentYear && patient.active) {
      notifications.push({
        id: `treatment-${patient.id}`,
        type: "info",
        title: "Ano de Tratamento",
        message: `${patient.name} não possui ano de tratamento cadastrado`,
        patientId: patient.id,
        patientName: patient.name,
        date: new Date().toISOString(),
        priority: "low",
      });
    }
  });

  return notifications.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const filterNotificationsByType = (
  notifications: Notification[],
  type: "warning" | "info" | "error" | "all"
): Notification[] => {
  if (type === "all") return notifications;
  return notifications.filter((n) => n.type === type);
};

export const filterNotificationsByPriority = (
  notifications: Notification[],
  priority: "high" | "medium" | "low" | "all"
): Notification[] => {
  if (priority === "all") return notifications;
  return notifications.filter((n) => n.priority === priority);
};

export const getNotificationStats = (notifications: Notification[]) => {
  return {
    total: notifications.length,
    high: notifications.filter((n) => n.priority === "high").length,
    medium: notifications.filter((n) => n.priority === "medium").length,
    low: notifications.filter((n) => n.priority === "low").length,
    warnings: notifications.filter((n) => n.type === "warning").length,
    errors: notifications.filter((n) => n.type === "error").length,
    info: notifications.filter((n) => n.type === "info").length,
  };
};

const countDeliveredDocs = (patient: Patient): number => {
  if (!patient.documents) return 0;
  const docs = patient.documents;
  return [
    docs.identity,
    docs.cpfDoc,
    docs.marriageCertificate,
    docs.medicalReport,
    docs.recentExams,
    docs.addressProof,
    docs.incomeProof,
    docs.hospitalCardDoc,
    docs.susCardDoc,
    docs.biopsyResultDoc,
  ].filter(Boolean).length;
};