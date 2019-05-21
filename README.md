# pdf-document-feeder

Sorting PDF pages after scanning through a document feeder.

## The problem

When scanning with a document feeder that doesn't support scanning both sides at the same time, you end up with two
scans: All front side and all back side pages. If you combine all pages like me, you need to rearrange the pages
afterwards.

## Scanning workflow

Let's assume you have 4 papers to scan which have been printed on both sides.

1. Put all pages as one batch into the document feeder (first page on top, getting drawn into the document feeder
   first).
2. Scan all pages (frontside only) into a PDF. You will now have a PDF with pages 1, 3, 5, 7. The other / backside pages
   are not scanned yet.
3. Now take the bulk from the document feeder and turn the complete bulk around (do **not** turn the pages
   individually), back into the document feeder. Make sure, that you have the last page on top and the first page at the
   bottom.
4. Scan all pages (backside this time) into the same PDF as before. The order of the pages should now be something like
   1, 3, 5, 7, 8, 6, 4, 2.
5. Run the script with the filename as argument and optionally a second filename as output file. Assuming the filename
   is `Scan.pdf` and sits in your `$USER` directory, try this: `npm start "$USER/Scan.pdf" "$USER/Scan-sorted.pdf"`
