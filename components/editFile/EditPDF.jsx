import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import classes from "./EditPDF.module.css";
const EditPDF = () => {
  const canvasRef = useRef(null);
  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState("");
  //
  const router = useRouter();
  //
  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext("2d"),
            viewport: viewport,
          };
          page.render(renderContext);
        });
    },
    [pdfRef]
  );
  useEffect(() => {
    setUrl("http://localhost:8080/data/rawPDF/" + router.query.fileName);
  }, [router.query.fileName]);
  useEffect(() => {
    if (!pdfRef) return;
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    if (!url) return;
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
      },
      function (reason) {
        console.error(reason);
      }
    );
  }, [url]);
  return (
    <div className={classes.container}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
export default EditPDF;
