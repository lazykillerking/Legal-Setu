import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

const MAX_CHARS = 40_000;

/** Extracts plain text from a PDF File so it can be sent to the chat agent. */
export async function extractPdfText(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

  let text = '';
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(' ') + '\n';
    if (text.length >= MAX_CHARS) break;
  }

  text = text.trim();
  if (!text) return '';
  return text.length > MAX_CHARS ? `${text.slice(0, MAX_CHARS)}\n[document truncated]` : text;
}
