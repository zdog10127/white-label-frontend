import * as XLSX from "xlsx";
import { Patient } from "../services/patientService";
import dayjs from "dayjs";

export const exportPatientsToExcel = (patients: Patient[], filename: string = "pacientes.xlsx") => {
  const data = patients.map((p) => ({
    Nome: p.name || "",
    CPF: formatCPF(p.cpf) || "",
    RG: p.rg || "",
    "Data Nascimento": p.birthDate ? dayjs(p.birthDate).format("DD/MM/YYYY") : "",
    Idade: p.birthDate ? dayjs().diff(dayjs(p.birthDate), "year") : "",
    Gênero: p.gender || "",
    "Estado Civil": p.maritalStatus || "",
    Telefone: p.phone || "",
    "Tel. Secundário": p.secondaryPhone || "",
    Email: p.email || "",
    Bairro: p.address?.neighborhood || "",
    Cidade: p.address?.city || "",
    Estado: p.address?.state || "",
    "Tipo de Câncer": p.cancer?.type || "",
    Estágio: p.cancer?.stage || "",
    "Ano Tratamento": p.treatmentYear || "",
    "Completou 5 anos": p.fiveYears ? "Sim" : "Não",
    "Autoriza Imagem": p.authorizeImage ? "Sim" : "Não",
    "Cartão SUS": p.susCard || "",
    "Cartão Hospital": p.hospitalCard || "",
    "Docs Entregues": countDeliveredDocs(p),
    Status: translateStatus(p.status),
    Ativo: p.active ? "Sim" : "Não",
    "Data Cadastro": p.registrationDate ? dayjs(p.registrationDate).format("DD/MM/YYYY") : "",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pacientes");

  const colWidths = [
    { wch: 30 }, 
    { wch: 15 }, 
    { wch: 12 }, 
    { wch: 15 }, 
    { wch: 8 },  
    { wch: 10 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 25 },
    { wch: 20 }, 
    { wch: 15 }, 
    { wch: 8 },  
    { wch: 20 }, 
    { wch: 10 }, 
    { wch: 12 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 18 }, 
    { wch: 18 }, 
    { wch: 12 }, 
    { wch: 12 }, 
    { wch: 8 },  
    { wch: 15 }, 
  ];
  ws["!cols"] = colWidths;

  XLSX.writeFile(wb, filename);
};

export const exportPendingDocsReport = (patients: Patient[], filename: string = "documentacao_pendente.xlsx") => {
  const patientsWithPendingDocs = patients.filter((p) => {
    const docsCount = countDeliveredDocs(p);
    return docsCount < 10;
  });

  const data = patientsWithPendingDocs.map((p) => {
    const docs = p.documents || {};
    return {
      Nome: p.name || "",
      CPF: formatCPF(p.cpf) || "",
      Telefone: p.phone || "",
      "Docs Entregues": `${countDeliveredDocs(p)}/10`,
      "RG": docs.identity ? "✓" : "✗",
      "CPF (doc)": docs.cpfDoc ? "✓" : "✗",
      "Certidão Casamento": docs.marriageCertificate ? "✓" : "✗",
      "Laudo Médico": docs.medicalReport ? "✓" : "✗",
      "Exames Recentes": docs.recentExams ? "✓" : "✗",
      "Comprov. Residência": docs.addressProof ? "✓" : "✗",
      "Comprov. Renda": docs.incomeProof ? "✓" : "✗",
      "Cartão Hospital": docs.hospitalCardDoc ? "✓" : "✗",
      "Cartão SUS": docs.susCardDoc ? "✓" : "✗",
      "Biópsia": docs.biopsyResultDoc ? "✓" : "✗",
    };
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Documentação Pendente");

  const colWidths = [
    { wch: 30 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 12 },
    { wch: 8 }, 
    { wch: 10 }, 
    { wch: 18 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 18 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 12 }, 
    { wch: 10 }, 
  ];
  ws["!cols"] = colWidths;

  XLSX.writeFile(wb, filename);
};

export const exportFiveYearsReport = (patients: Patient[], filename: string = "pacientes_5_anos.xlsx") => {
  const fiveYearsPatients = patients.filter((p) => p.fiveYears);

  const data = fiveYearsPatients.map((p) => ({
    Nome: p.name || "",
    CPF: formatCPF(p.cpf) || "",
    Telefone: p.phone || "",
    "Tipo de Câncer": p.cancer?.type || "",
    "Ano Tratamento": p.treatmentYear || "",
    "Início Tratamento": p.cancer?.treatmentStartDate ? dayjs(p.cancer.treatmentStartDate).format("DD/MM/YYYY") : "",
    "Data Cadastro": p.registrationDate ? dayjs(p.registrationDate).format("DD/MM/YYYY") : "",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pacientes 5 Anos");

  const colWidths = [
    { wch: 30 }, 
    { wch: 15 }, 
    { wch: 15 }, 
    { wch: 20 }, 
    { wch: 12 }, 
    { wch: 15 }, 
    { wch: 15 }, 
  ];
  ws["!cols"] = colWidths;

  XLSX.writeFile(wb, filename);
};

export const exportStatisticsReport = (patients: Patient[], filename: string = "estatisticas.xlsx") => {
  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.active).length;
  const fiveYearsCompleted = patients.filter((p) => p.fiveYears).length;
  const authorizeImage = patients.filter((p) => p.authorizeImage).length;

  const patientsByYear: { [key: string]: number } = {};
  patients.forEach((p) => {
    if (p.treatmentYear) {
      const year = p.treatmentYear.toString();
      patientsByYear[year] = (patientsByYear[year] || 0) + 1;
    }
  });

  const cancerTypes: { [key: string]: number } = {};
  patients.forEach((p) => {
    if (p.cancer?.type) {
      cancerTypes[p.cancer.type] = (cancerTypes[p.cancer.type] || 0) + 1;
    }
  });

  const wb = XLSX.utils.book_new();

  const summaryData = [
    { Métrica: "Total de Pacientes", Valor: totalPatients },
    { Métrica: "Pacientes Ativos", Valor: activePatients },
    { Métrica: "Pacientes Inativos", Valor: totalPatients - activePatients },
    { Métrica: "Completaram 5 Anos", Valor: fiveYearsCompleted },
    { Métrica: "Autorizam Imagem", Valor: authorizeImage },
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, "Resumo Geral");

  const yearData = Object.entries(patientsByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map(([year, count]) => ({
      Ano: year,
      "Quantidade": count,
      "Percentual": `${((count / totalPatients) * 100).toFixed(1)}%`,
    }));
  const wsYear = XLSX.utils.json_to_sheet(yearData);
  XLSX.utils.book_append_sheet(wb, wsYear, "Por Ano");

  const cancerData = Object.entries(cancerTypes)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({
      "Tipo de Câncer": type,
      "Quantidade": count,
      "Percentual": `${((count / totalPatients) * 100).toFixed(1)}%`,
    }));
  const wsCancer = XLSX.utils.json_to_sheet(cancerData);
  XLSX.utils.book_append_sheet(wb, wsCancer, "Por Tipo de Câncer");

  XLSX.writeFile(wb, filename);
};

const formatCPF = (cpf: string): string => {
  if (!cpf) return "";
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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

const translateStatus = (status?: string): string => {
  switch (status) {
    case "Active":
      return "Ativo";
    case "Under Review":
      return "Em Análise";
    case "Inactive":
      return "Inativo";
    case "Completed":
      return "Concluído";
    default:
      return status || "";
  }
};