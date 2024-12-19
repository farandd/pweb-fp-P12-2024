import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { BorrowItem } from '~/types';

export const generateBorrowingsPDF = (borrowings: BorrowItem[]) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Laporan Peminjaman Barang', 14, 22);
  doc.setFontSize(12);
  doc.text(`Tanggal: ${new Date().toLocaleDateString()}`, 14, 32);

  const tableColumns = [
    'No',
    'Nama Barang',
    'Jumlah',
    'Tgl Pinjam',
    'Tgl Kembali',
    'Peminjam',
    'Petugas'
  ];

  const tableRows = borrowings.map((item, index) => [
    index + 1,
    item.item_name,
    item.amount,
    new Date(item.borrow_date).toLocaleDateString(),
    new Date(item.return_date).toLocaleDateString(),
    item.borrower_name,
    item.officer_name
  ]);

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 40,
    theme: 'grid'
  });

  doc.save('laporan-peminjaman.pdf');
};