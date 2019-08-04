#!/usr/bin/env node

const fs = require("fs");
const pdfLib = require("pdf-lib");

const pdfPath = process.argv[2];
const outPath = process.argv[3] || "output.pdf";

run({ pdfPath, outPath });

async function run({ pdfPath, outPath }) {
  const pdfDocument = fs.readFileSync(pdfPath);
  const doc = await pdfLib.PDFDocument.load(pdfDocument);
  const amountOfPages = doc.getPages().length;
  const lastPageIndex = amountOfPages - 1;
  for (i = 0; i < amountOfPages / 2; i++) {
    const pages = doc.getPages();
    const lastPage = pages[lastPageIndex];
    doc.removePage(lastPageIndex);
    doc.insertPage(i * 2 + 1, lastPage);
  }
  const bytes = await doc.save();
  fs.writeFileSync(outPath, bytes);
}
