import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import { PatientReportResponse } from '../types/report';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const exportPatientReportToWord = async (report: PatientReportResponse) => {
  const sections: any[] = [];

  // Título
  sections.push(
    new Paragraph({
      text: 'RELATÓRIO DO PACIENTE',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // Dados do Paciente
  sections.push(
    new Paragraph({
      text: 'Dados do Paciente',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Nome: ', bold: true }),
        new TextRun(report.patient.name),
      ],
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'CPF: ', bold: true }),
        new TextRun(report.patient.cpf),
      ],
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Idade: ', bold: true }),
        new TextRun(`${report.patient.age} anos`),
      ],
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Gênero: ', bold: true }),
        new TextRun(report.patient.gender),
      ],
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Telefone: ', bold: true }),
        new TextRun(report.patient.phone),
      ],
      spacing: { after: 200 },
    })
  );

  // Período
  sections.push(
    new Paragraph({
      text: 'Período do Relatório',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
    })
  );

  sections.push(
    new Paragraph({
      text: `De ${format(new Date(report.period.startDate!), 'dd/MM/yyyy', { locale: ptBR })} até ${format(new Date(report.period.endDate!), 'dd/MM/yyyy', { locale: ptBR })}`,
      spacing: { after: 200 },
    })
  );

  // Estatísticas
  sections.push(
    new Paragraph({
      text: 'Resumo do Tratamento',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
    })
  );

  const statsTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Indicador', bold: true })] })],
            shading: { fill: '1976d2' },
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Valor', bold: true })] })],
            shading: { fill: '1976d2' },
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Total de Consultas')] }),
          new TableCell({ children: [new Paragraph(report.statistics.totalEvolutions.toString())] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Dias em Tratamento')] }),
          new TableCell({ children: [new Paragraph(report.statistics.daysInTreatment.toString())] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Variação de Peso')] }),
          new TableCell({
            children: [
              new Paragraph(
                report.statistics.weightChange
                  ? `${report.statistics.weightChange > 0 ? '+' : ''}${report.statistics.weightChange.toFixed(1)} kg`
                  : 'N/A'
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Variação de IMC')] }),
          new TableCell({
            children: [
              new Paragraph(
                report.statistics.bmiChange
                  ? `${report.statistics.bmiChange > 0 ? '+' : ''}${report.statistics.bmiChange.toFixed(1)}`
                  : 'N/A'
              ),
            ],
          }),
        ],
      }),
    ],
  });

  sections.push(statsTable);
  sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));

  // Histórico Médico
  if (report.medicalHistory) {
    sections.push(
      new Paragraph({
        text: 'Histórico Médico',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 },
      })
    );

    if (report.medicalHistory.mainComplaint) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Diagnóstico Principal: ', bold: true }),
            new TextRun(report.medicalHistory.mainComplaint),
          ],
          spacing: { after: 150 },
        })
      );
    }

    if (report.medicalHistory.chronicDiseases.length > 0) {
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: 'Doenças Crônicas:', bold: true })],
          spacing: { after: 100 },
        })
      );
      report.medicalHistory.chronicDiseases.forEach((disease) => {
        sections.push(
          new Paragraph({
            text: `• ${disease}`,
            spacing: { after: 50 },
            indent: { left: 360 },
          })
        );
      });
      sections.push(new Paragraph({ text: '', spacing: { after: 100 } }));
    }

    if (report.medicalHistory.medications.length > 0) {
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: 'Medicações em Uso:', bold: true })],
          spacing: { after: 100 },
        })
      );
      report.medicalHistory.medications.forEach((med) => {
        sections.push(
          new Paragraph({
            text: `• ${med}`,
            spacing: { after: 50 },
            indent: { left: 360 },
          })
        );
      });
      sections.push(new Paragraph({ text: '', spacing: { after: 100 } }));
    }

    if (report.medicalHistory.allergies.length > 0) {
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: 'Alergias:', bold: true })],
          spacing: { after: 100 },
        })
      );
      report.medicalHistory.allergies.forEach((allergy) => {
        sections.push(
          new Paragraph({
            text: `• ${allergy}`,
            spacing: { after: 50 },
            indent: { left: 360 },
          })
        );
      });
      sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
    }
  }

  // Dados Antropométricos
  if (report.anthropometricData.length > 0) {
    sections.push(
      new Paragraph({
        text: 'Evolução Antropométrica',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 },
      })
    );

    const anthropometricRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Data', bold: true })] })], shading: { fill: '1976d2' } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Peso', bold: true })] })], shading: { fill: '1976d2' } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Altura', bold: true })] })], shading: { fill: '1976d2' } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'IMC', bold: true })] })], shading: { fill: '1976d2' } }),
        ],
      }),
    ];

    report.anthropometricData.forEach((data) => {
      anthropometricRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(format(new Date(data.date), 'dd/MM/yyyy', { locale: ptBR }))] }),
            new TableCell({ children: [new Paragraph(data.weight ? `${data.weight.toFixed(1)} kg` : 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.height ? `${data.height.toFixed(2)} m` : 'N/A')] }),
            new TableCell({ children: [new Paragraph(data.bmi ? data.bmi.toFixed(1) : 'N/A')] }),
          ],
        })
      );
    });

    const anthropometricTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: anthropometricRows,
    });

    sections.push(anthropometricTable);
    sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
  }

  // Observações do Profissional
  if (report.comments) {
    sections.push(
      new Paragraph({
        text: 'Observações do Profissional',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 },
      })
    );

    sections.push(
      new Paragraph({
        text: report.comments,
        spacing: { after: 200 },
      })
    );
  }

  // Evoluções
  if (report.evolutions.length > 0) {
    sections.push(
      new Paragraph({
        text: 'Evoluções Clínicas',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 },
      })
    );

    report.evolutions.forEach((evolution, index) => {
      sections.push(
        new Paragraph({
          text: `${index + 1}. ${format(new Date(evolution.date), 'dd/MM/yyyy', { locale: ptBR })} - ${evolution.professionalName}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Tipo: ', bold: true }),
            new TextRun(evolution.professionalRole),
          ],
          spacing: { after: 100 },
        })
      );

      if (evolution.subjectiveData) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Queixa: ', bold: true }),
              new TextRun(evolution.subjectiveData),
            ],
            spacing: { after: 100 },
          })
        );
      }

      if (evolution.assessment) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Avaliação: ', bold: true }),
              new TextRun(evolution.assessment),
            ],
            spacing: { after: 100 },
          })
        );
      }

      if (evolution.plan) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Conduta: ', bold: true }),
              new TextRun(evolution.plan),
            ],
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // Rodapé
  sections.push(
    new Paragraph({
      text: `Relatório gerado em ${format(new Date(report.generatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
    })
  );

  // Criar documento
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  // Gerar e baixar
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Relatorio_${report.patient.name.replace(/\s/g, '_')}_${format(new Date(), 'ddMMyyyy')}.docx`);
};