#!/usr/bin/env node

const fs = require("fs");
const pdfLib = require("pdf-lib");

const pdfPath = process.argv[2];
const outPath = process.argv[3] || "output.pdf";

run({ pdfPath, outPath }).catch(error => console.error("Error!", error));

async function run({ pdfPath, outPath }) {
  const pdfDocument = fs.readFileSync(pdfPath);
  const doc = await pdfLib.PDFDocument.load(pdfDocument);
  const amountOfPages = doc.getPages().length;
  const lastPageIndex = amountOfPages - 1;
  for (i = 0; i < amountOfPages / 2; i++) {
    const pages = doc.getPages();
    const lastPage = pages[lastPageIndex];
    doc.removePage(lastPageIndex);
    const pageIndex = i * 2 + 1;
    if (pageIndex > lastPageIndex) {
      doc.addPage(lastPage);
    } else {
      doc.insertPage(pageIndex, lastPage);
    }
  }
  const bytes = await doc.save();
  fs.writeFileSync(outPath, bytes);
}
