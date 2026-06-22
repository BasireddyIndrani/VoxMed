import { jsPDF } from 'jspdf';

export const downloadConsultationPDF = (data) => {
  if (!data) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Set colors
  const primaryColor = [37, 99, 235]; // #2563EB
  const darkTextColor = [30, 41, 59]; // #1E293B
  const lightTextColor = [100, 116, 139]; // #64748B
  const urgencyColor = data.triage?.urgency === 'High' ? [239, 68, 68] : data.triage?.urgency === 'Moderate' ? [245, 158, 11] : [16, 185, 129];

  // Helper for adding lines and adjusting cursor
  let currentY = 25;

  // Header Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('VoxMed', margin, currentY);

  // Header Subtitle
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text('Rural Clinical Documentation Portal', margin + 30, currentY - 1);

  // Horizontal Rule
  currentY += 5;
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  // Report Info block
  currentY += 10;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.text('CLINICAL RECORD SUMMARY', margin, currentY);

  // Date and Record Details
  const dateStr = new Date(data.created_at || Date.now()).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  currentY += 8;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  
  // Left Column
  doc.setFont('Helvetica', 'bold');
  doc.text('Patient ID:', margin, currentY);
  doc.setFont('Helvetica', 'normal');
  doc.text(data.patient_id || 'N/A', margin + 25, currentY);

  doc.setFont('Helvetica', 'bold');
  doc.text('Language:', margin, currentY + 6);
  doc.setFont('Helvetica', 'normal');
  doc.text(data.language || 'N/A', margin + 25, currentY + 6);

  // Right Column
  doc.setFont('Helvetica', 'bold');
  doc.text('Date/Time:', margin + 90, currentY);
  doc.setFont('Helvetica', 'normal');
  doc.text(dateStr, margin + 115, currentY);

  doc.setFont('Helvetica', 'bold');
  doc.text('Triage Level:', margin + 90, currentY + 6);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(urgencyColor[0], urgencyColor[1], urgencyColor[2]);
  doc.text(`${data.triage?.urgency || 'Low'} Urgency`, margin + 115, currentY + 6);

  // Reset text color
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  // Suspected Condition
  currentY += 15;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(margin, currentY, contentWidth, 12, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, currentY, contentWidth, 12, 'S');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Primary Suspected Condition:', margin + 4, currentY + 8);
  doc.setFont('Helvetica', 'normal');
  doc.text(data.triage?.condition || 'General Symptoms', margin + 60, currentY + 8);

  // Divider
  currentY += 20;
  doc.setDrawColor(241, 245, 249); // slate-100
  doc.line(margin, currentY, pageWidth - margin, currentY);

  // Transcripts section
  currentY += 8;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('AUDIO TRANSCRIPT & TRANSLATION', margin, currentY);

  currentY += 6;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text(`Original Transcript (${data.language}):`, margin, currentY);
  
  currentY += 5;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  const splitTranscript = doc.splitTextToSize(data.transcript || 'No transcript available', contentWidth);
  doc.text(splitTranscript, margin, currentY);
  
  currentY += (splitTranscript.length * 5) + 3;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text('English Translation:', margin, currentY);
  
  currentY += 5;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  const splitTranslation = doc.splitTextToSize(data.translation || 'No translation available', contentWidth);
  doc.text(splitTranslation, margin, currentY);

  // Divider
  currentY += (splitTranslation.length * 5) + 8;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  // SOAP Note Section
  currentY += 8;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLINICAL SOAP NOTE', margin, currentY);

  const soapSections = [
    { label: 'SUBJECTIVE (S)', text: data.soap_note?.subjective || 'No subjective report available.' },
    { label: 'OBJECTIVE (O)', text: data.soap_note?.objective || 'No objective findings available.' },
    { label: 'ASSESSMENT (A)', text: data.soap_note?.assessment || 'No clinical assessment available.' },
    { label: 'PLAN (P)', text: data.soap_note?.plan || 'No plan details available.' }
  ];

  soapSections.forEach((section) => {
    currentY += 8;
    // Section header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(section.label, margin, currentY);

    // Section content
    currentY += 5;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85); // slate-700
    const splitText = doc.splitTextToSize(section.text, contentWidth);
    
    // Check page height limit to prevent overflow
    if (currentY + (splitText.length * 5) > pageHeight - 35) {
      doc.addPage();
      currentY = 25;
      // Add small page header
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
      doc.text(`Patient Record Summary - ID: ${data.patient_id}`, margin, 15);
      doc.line(margin, 17, pageWidth - margin, 17);
      
      // Reprint section title
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
      doc.text(`${section.label} (Continued)`, margin, currentY);
      currentY += 5;
    }
    
    doc.text(splitText, margin, currentY);
    currentY += (splitText.length * 5);
  });

  // Footer / Sign-off Block
  currentY += 15;
  if (currentY + 25 > pageHeight) {
    doc.addPage();
    currentY = 25;
  }

  // Draw separator line for signature
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.line(margin, currentY, margin + 60, currentY);
  doc.line(pageWidth - margin - 60, currentY, pageWidth - margin, currentY);

  currentY += 5;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text('Authorized Clinician Signature', margin, currentY);
  doc.text('Facility Lead / Reviewer Signature', pageWidth - margin - 60, currentY);

  currentY += 12;
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.text('This document was automatically generated by VoxMed Rural Health AI Portal.', margin, currentY);
  doc.text(`Ref ID: ${data._id || 'N/A'}`, pageWidth - margin - 50, currentY);

  // Save the PDF
  doc.save(`VoxMed_Report_${data.patient_id || 'Report'}.pdf`);
};
