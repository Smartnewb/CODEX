import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface AssessmentData {
  title: string;
  date: string;
  user: {
    name: string;
  };
  scores: {
    overall: number;
    codeStyle: number;
    problemSolving: number;
    collaboration: number;
    devOps: number;
  };
  previousScores?: {
    overall: number;
    codeStyle: number;
    problemSolving: number;
    collaboration: number;
    devOps: number;
  };
  aiFeedback: {
    strengths: string[];
    improvements: string[];
  };
  organizationFit: {
    overallFit: number;
    techStackMatch: number;
    codingStyleMatch: number;
    collaborationMatch: number;
    problemSolvingMatch: number;
    analysis: string;
  };
}

export function generatePDF(assessmentData: AssessmentData): void {
  // Create a new PDF document
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 255);
  doc.text("CodeAssess AI 평가 결과", 105, 15, { align: "center" });

  // Add assessment info
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`${assessmentData.title}`, 105, 25, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `평가일: ${assessmentData.date} | 응시자: ${assessmentData.user.name}`,
    105,
    32,
    { align: "center" },
  );

  // Add overall score
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(70, 40, 70, 30, 3, 3, "F");

  doc.setFontSize(24);
  doc.setTextColor(0, 102, 255);
  doc.text(`${assessmentData.scores.overall}`, 105, 55, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("종합 점수", 105, 65, { align: "center" });

  // Add detailed scores
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("역량별 점수", 20, 85);

  // Create score table
  const scoreData = [
    ["역량", "점수", "이전 점수", "변화"],
    [
      "코드 스타일",
      `${assessmentData.scores.codeStyle}`,
      assessmentData.previousScores
        ? `${assessmentData.previousScores.codeStyle}`
        : "-",
      assessmentData.previousScores
        ? `${assessmentData.scores.codeStyle - assessmentData.previousScores.codeStyle}`
        : "-",
    ],
    [
      "문제 해결력",
      `${assessmentData.scores.problemSolving}`,
      assessmentData.previousScores
        ? `${assessmentData.previousScores.problemSolving}`
        : "-",
      assessmentData.previousScores
        ? `${assessmentData.scores.problemSolving - assessmentData.previousScores.problemSolving}`
        : "-",
    ],
    [
      "협업 능력",
      `${assessmentData.scores.collaboration}`,
      assessmentData.previousScores
        ? `${assessmentData.previousScores.collaboration}`
        : "-",
      assessmentData.previousScores
        ? `${assessmentData.scores.collaboration - assessmentData.previousScores.collaboration}`
        : "-",
    ],
    [
      "DevOps",
      `${assessmentData.scores.devOps}`,
      assessmentData.previousScores
        ? `${assessmentData.previousScores.devOps}`
        : "-",
      assessmentData.previousScores
        ? `${assessmentData.scores.devOps - assessmentData.previousScores.devOps}`
        : "-",
    ],
  ];

  (doc as any).autoTable({
    startY: 90,
    head: [scoreData[0]],
    body: scoreData.slice(1),
    theme: "grid",
    headStyles: { fillColor: [0, 102, 255] },
    styles: { halign: "center" },
  });

  // Add strengths and improvements
  const finalY = (doc as any).lastAutoTable.finalY || 130;

  doc.setFontSize(12);
  doc.text("강점", 20, finalY + 10);

  let yPos = finalY + 15;
  assessmentData.aiFeedback.strengths.forEach((strength, index) => {
    doc.setFontSize(10);
    doc.text(`• ${strength}`, 25, yPos + index * 7);
  });

  yPos = finalY + 15 + assessmentData.aiFeedback.strengths.length * 7 + 10;

  doc.setFontSize(12);
  doc.text("개선점", 20, yPos);

  yPos += 5;
  assessmentData.aiFeedback.improvements.forEach((improvement, index) => {
    doc.setFontSize(10);
    doc.text(`• ${improvement}`, 25, yPos + index * 7);
  });

  // Add organization fit
  yPos = yPos + assessmentData.aiFeedback.improvements.length * 7 + 15;

  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(12);
  doc.text("조직 적합도 분석", 20, yPos);

  // Create organization fit table
  const fitData = [
    ["항목", "적합도"],
    ["종합 적합도", `${assessmentData.organizationFit.overallFit}%`],
    ["기술 스택 일치도", `${assessmentData.organizationFit.techStackMatch}%`],
    [
      "코딩 스타일 일치도",
      `${assessmentData.organizationFit.codingStyleMatch}%`,
    ],
    [
      "협업 방식 적합도",
      `${assessmentData.organizationFit.collaborationMatch}%`,
    ],
    [
      "문제 해결 접근법",
      `${assessmentData.organizationFit.problemSolvingMatch}%`,
    ],
  ];

  (doc as any).autoTable({
    startY: yPos + 5,
    head: [fitData[0]],
    body: fitData.slice(1),
    theme: "grid",
    headStyles: { fillColor: [0, 102, 255] },
    styles: { halign: "center" },
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `CodeAssess AI - ${assessmentData.title} - ${assessmentData.date}`,
      105,
      285,
      { align: "center" },
    );
    doc.text(`${i} / ${pageCount}`, 195, 285);
  }

  // Save the PDF
  doc.save(`${assessmentData.title}_평가결과_${assessmentData.date}.pdf`);
}
