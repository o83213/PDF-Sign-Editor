import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import { getPosition } from "../../../util/getPosition";
import classes from "./PdfViewer.module.css";
import DragableWraper from "./DragableWraper";
import DragableWraperText from "./DragableWraperText";
import { pdfContext } from "../../../context/pdfContext";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
//
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
//
const PdfViewer = (props) => {
  const { pdfFile: rawFile, modifiedFile } = useContext(pdfContext);
  const pdfFile = useMemo(() => {
    return props.mode === "edit" ? rawFile : modifiedFile;
  }, [props.mode, rawFile, modifiedFile]);
  const canvasRef = useRef();

  const [pdfRef, setPdfRef] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); //TODO: adding page change function
  const viewerId = "pdfViewCanvas";

  useEffect(() => {
    renderPage(currentPage, pdfRef);
    function renderPage(pageNum, pdfLibFile) {
      if (!pdfLibFile) return;
      pdfLibFile.getPage(pageNum).then(function (page) {
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
    }
  }, [currentPage, pdfRef]);

  useEffect(() => {
    const localPdfUrl =
      props.mode === "edit" ? URL.createObjectURL(pdfFile) : pdfFile;
    pdfjsLib.getDocument(localPdfUrl).promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
      },
      function (err) {
        console.log(err);
      }
    );
  }, [pdfFile, props.mode]);

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
          deleteSignHandler={props.deleteSignHandler.bind(null, ObjData.id)}
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
      <canvas className={classes.canvas} ref={canvasRef} id={viewerId} />
    </div>
  );
};
export default PdfViewer;
