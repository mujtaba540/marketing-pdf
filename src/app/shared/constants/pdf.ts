import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function replacePage8(
  originalPdfBytes: Uint8Array,
  elementRef: HTMLElement
) {
  // 1. Capture HTML as image
  const canvas = await html2canvas(elementRef);
  const imgData = canvas.toDataURL('image/png');

  // 2. Convert image to PDF (1 page)
  const tempPdf = new jsPDF();
  tempPdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4
  const newPageBytes = tempPdf.output('arraybuffer');

  // 3. Load original and replacement PDFs
  const originalPdf = await PDFDocument.load(originalPdfBytes);
  const replacementPdf = await PDFDocument.load(newPageBytes);

  const replacementPage = await originalPdf.copyPages(replacementPdf, [0]);

  // 4. Replace page 8 (index 7)
  originalPdf.removePage(7);
  originalPdf.insertPage(7, replacementPage[0]);

  const updatedPdfBytes = await originalPdf.save();

  // 5. Download
  const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url);
}
