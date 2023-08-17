import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const modifyPdf = async (pdfFile, signatureArray, textArray) => {
  // open PDF file to DOC
  const pdfArrayBuffer = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  signatureArray.forEach(async (signature) => {
    await createSignature(pdfDoc, firstPage, signature);
  });
  textArray.forEach(async (text) => {
    await createText(firstPage, text);
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
// createSignature
async function createSignature(pdfDoc, page, signature) {
  const scaleRatio = 1.5;
  const { dataUrl, position } = signature;
  const deltaX = position.x / scaleRatio;
  const deltaY = position.y / scaleRatio;

  const pngImageBytes = dataUrl.replace(/^data:image\/png;base64,/, "");
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  // adjust the png file width and heigh to the same on the browser
  const pngDims = pngImage.scale(1 / (2 * scaleRatio));
  page.drawImage(pngImage, {
    x: deltaX,
    y: page.getHeight() - pngDims.height - deltaY,
    // the y positon is count from the bottom, so use page getHeight to back to the top
    width: pngDims.width,
    height: pngDims.height,
  });
}
// createText
async function createText(page, text) {
  // this is the browser px to pdf ratio (browser-px/pdf-scale)
  const scaleRatio = 1.5;
  const { content, position } = text;
  const fontsize = 12;
  const deltaX = position.x / scaleRatio;
  const deltaY = position.y / scaleRatio;
  page.drawText(content, {
    x: deltaX,
    y: page.getHeight() - fontsize + 3 - deltaY,
    size: fontsize,
    color: rgb(0, 0, 0),
  });
}
export { modifyPdf };
