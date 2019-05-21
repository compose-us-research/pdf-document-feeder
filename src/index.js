const fs = require("fs");
const pdfLib = require("pdf-lib");

const pdfPath = process.argv[2];
const outPath = process.argv[3] || "output.pdf";

run({ pdfPath, outPath });

async function run({ pdfPath, outPath }) {
  const pdfDocument = fs.readFileSync(pdfPath);
  const doc = pdfLib.PDFDocumentFactory.load(pdfDocument);
  const amountOfPages = doc.getPages().length;
  const lastPageIndex = amountOfPages - 1;
  for (i = 0; i < amountOfPages / 2; i++) {
    const pages = doc.getPages();
    const lastPage = pages[lastPageIndex];
    doc.removePage(lastPageIndex);
    doc.insertPage(i * 2 + 1, lastPage);
  }
  const bytes = pdfLib.PDFDocumentWriter.saveToBytes(doc);
  fs.writeFileSync(outPath, bytes);
}
