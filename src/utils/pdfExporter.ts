import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PatientReportResponse } from '../types/report';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const exportPatientReportToPDF = async (report: PatientReportResponse) => {
  const doc = new jsPDF();
  
  let yPos = 20;

  // Função auxiliar para adicionar nova página se necessário
  const checkPageBreak = (neededSpace: number) => {
    if (yPos + neededSpace > 280) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Cabeçalho
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('RELATÓRIO DO PACIENTE', 105, yPos, { align: 'center' });
  yPos += 15;

  // Informações do Paciente
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Dados do Paciente', 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nome: ${report.patient.name}`, 14, yPos);
  yPos += 6;
  doc.text(`CPF: ${report.patient.cpf}`, 14, yPos);
  yPos += 6;
  doc.text(`Idade: ${report.patient.age} anos`, 14, yPos);
  yPos += 6;
  doc.text(`Gênero: ${report.patient.gender}`, 14, yPos);
  yPos += 6;
  doc.text(`Telefone: ${report.patient.phone}`, 14, yPos);
  yPos += 10;

  // Período do Relatório
  doc.setFont('helvetica', 'bold');
  doc.text('Período do Relatório', 14, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(
    `De ${format(new Date(report.period.startDate!), 'dd/MM/yyyy', { locale: ptBR })} até ${format(new Date(report.period.endDate!), 'dd/MM/yyyy', { locale: ptBR })}`,
    14,
    yPos
  );
  yPos += 10;

  // Estatísticas
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Resumo do Tratamento', 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const stats = [
    ['Total de Consultas', report.statistics.totalEvolutions.toString()],
    ['Dias em Tratamento', report.statistics.daysInTreatment.toString()],
    ['Variação de Peso', report.statistics.weightChange ? `${report.statistics.weightChange > 0 ? '+' : ''}${report.statistics.weightChange.toFixed(1)} kg` : 'N/A'],
    ['Variação de IMC', report.statistics.bmiChange ? `${report.statistics.bmiChange > 0 ? '+' : ''}${report.statistics.bmiChange.toFixed(1)}` : 'N/A'],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Indicador', 'Valor']],
    body: stats,
    theme: 'grid',
    headStyles: { fillColor: [25, 118, 210] },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // Histórico Médico
  if (report.medicalHistory) {
    checkPageBreak(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Histórico Médico', 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    if (report.medicalHistory.mainComplaint) {
      doc.text('Diagnóstico Principal:', 14, yPos);
      yPos += 6;
      doc.text(report.medicalHistory.mainComplaint, 20, yPos);
      yPos += 8;
    }

    if (report.medicalHistory.chronicDiseases.length > 0) {
      doc.text('Doenças Crônicas:', 14, yPos);
      yPos += 6;
      report.medicalHistory.chronicDiseases.forEach((disease) => {
        doc.text(`• ${disease}`, 20, yPos);
        yPos += 5;
      });
      yPos += 3;
    }

    if (report.medicalHistory.medications.length > 0) {
      doc.text('Medicações em Uso:', 14, yPos);
      yPos += 6;
      report.medicalHistory.medications.forEach((med) => {
        doc.text(`• ${med}`, 20, yPos);
        yPos += 5;
      });
      yPos += 3;
    }

    if (report.medicalHistory.allergies.length > 0) {
      doc.text('Alergias:', 14, yPos);
      yPos += 6;
      report.medicalHistory.allergies.forEach((allergy) => {
        doc.text(`• ${allergy}`, 20, yPos);
        yPos += 5;
      });
      yPos += 3;
    }

    yPos += 5;
  }

  // Dados Antropométricos
  if (report.anthropometricData.length > 0) {
    checkPageBreak(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Evolução Antropométrica', 14, yPos);
    yPos += 8;

    const anthropometricTable = report.anthropometricData.map((data) => [
      format(new Date(data.date), 'dd/MM/yyyy', { locale: ptBR }),
      data.weight ? `${data.weight.toFixed(1)} kg` : 'N/A',
      data.height ? `${data.height.toFixed(2)} m` : 'N/A',
      data.bmi ? data.bmi.toFixed(1) : 'N/A',
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Data', 'Peso', 'Altura', 'IMC']],
      body: anthropometricTable,
      theme: 'grid',
      headStyles: { fillColor: [25, 118, 210] },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // Observações do Profissional
  if (report.comments) {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Observações do Profissional', 14, yPos);
    yPos += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const splitComments = doc.splitTextToSize(report.comments, 180);
    doc.text(splitComments, 14, yPos);
    yPos += splitComments.length * 5 + 10;
  }

  // Evoluções
  if (report.evolutions.length > 0) {
    doc.addPage();
    yPos = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Evoluções Clínicas', 14, yPos);
    yPos += 10;

    report.evolutions.forEach((evolution, index) => {
      checkPageBreak(50);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(
        `${index + 1}. ${format(new Date(evolution.date), 'dd/MM/yyyy', { locale: ptBR })} - ${evolution.professionalName}`,
        14,
        yPos
      );
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Tipo: ${evolution.professionalRole}`, 20, yPos);
      yPos += 6;

      if (evolution.subjectiveData) {
        doc.text('Queixa:', 20, yPos);
        yPos += 5;
        const splitText = doc.splitTextToSize(evolution.subjectiveData, 170);
        doc.text(splitText, 20, yPos);
        yPos += splitText.length * 5 + 2;
      }

      if (evolution.assessment) {
        doc.text('Avaliação:', 20, yPos);
        yPos += 5;
        const splitText = doc.splitTextToSize(evolution.assessment, 170);
        doc.text(splitText, 20, yPos);
        yPos += splitText.length * 5 + 2;
      }

      if (evolution.plan) {
        doc.text('Conduta:', 20, yPos);
        yPos += 5;
        const splitText = doc.splitTextToSize(evolution.plan, 170);
        doc.text(splitText, 20, yPos);
        yPos += splitText.length * 5 + 2;
      }

      yPos += 5;
    });
  }

  // Rodapé
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Página ${i} de ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
    doc.text(
      `Gerado em ${format(new Date(report.generatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      105,
      295,
      { align: 'center' }
    );
  }

  // Salvar PDF
  doc.save(`Relatorio_${report.patient.name.replace(/\s/g, '_')}_${format(new Date(), 'ddMMyyyy')}.pdf`);
};