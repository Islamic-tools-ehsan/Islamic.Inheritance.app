import jsPDF from "jspdf";

export function exportToPDF(results: any[], estate: number) {
  const doc = new jsPDF();
  doc.text("Islamic Inheritance Distribution", 10, 10);
  doc.text(`Estate: ${estate}`, 10, 20);

  let y = 30;
  results.forEach(r => {
    doc.text(`${r.heir}: ${r.amount.toFixed(2)}`, 10, y);
    y += 8;
  });

  doc.save("inheritance.pdf");
}
