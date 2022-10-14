import React, { useEffect, useState, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { getPosition } from "../../../util/getPosition";
import classes from "./PdfViewer.module.css";
import DragableWraper from "./DragableWraper";
import DragableWraperText from "./DragableWraperText";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const PdfViewer = (props) => {
  const { url } = props;
  const canvasRef = useRef();

  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const viewerId = "pdfViewCanvas";
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
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
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

  const nextPage = () =>
    pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  return (
    <div
      className={classes.container}
      onClick={(event) => {
        event.preventDefault();
        if (
          props.editingMode !== "createText" &&
          props.editingMode !== "createSignature"
        ) {
          return;
        }
        if (event.target.id === viewerId) {
          // get the position relative to element
          const { pageX, pageY } = event;
          const { x, y } = getPosition(event.target);
          const RelativeX = pageX - x;
          const RelativeY = pageY - y;
          if (props.editingMode === "createText") {
            props.createTextHandler("text", {
              x: RelativeX,
              y: RelativeY,
            });
          } else if (props.editingMode === "createSignature") {
            props.createSignHandler({
              x: RelativeX,
              y: RelativeY,
            });
          }
        }
      }}
    >
      {props.signatureArray.map((ObjData) => (
        <DragableWraper
          key={ObjData.id}
          id={ObjData.id}
          dataUrl={ObjData.dataUrl}
          updatedCanvasPosition={props.updatedCanvasPosition}
          position={ObjData.position}
          showModalHandler={props.showModalHandler}
          setSelectedBlockId={props.setSelectedBlockId}
          changeEditingModeHandler={props.changeEditingModeHandler}
          draggable={props.draggable}
        />
      ))}
      {props.textArray.map((ObjData) => (
        <DragableWraperText
          key={ObjData.id}
          id={ObjData.id}
          content={ObjData.content}
          updatedTextPosition={props.updatedTextPosition}
          position={ObjData.position}
          showModalHandler={props.showModalHandler}
          setSelectedBlockId={props.setSelectedBlockId}
          changeEditingModeHandler={props.changeEditingModeHandler}
          draggable={props.draggable}
        />
      ))}

      <canvas className={classes.canvas} ref={canvasRef} id={viewerId}></canvas>
    </div>
  );
};
export default PdfViewer;
