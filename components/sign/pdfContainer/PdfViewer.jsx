import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { getPosition } from "../../../util/getPosition";
import classes from "./PdfViewer.module.css";
import DragableWraper from "./DragableWraper";
import DragableWraperText from "./DragableWraperText";
import { pdfContext } from "../../../context/pdfContext";
import { PDFDocument } from "pdf-lib";
const PdfViewer = (props) => {
  // const { pdfFile } = props;
  const { pdfFile } = useContext(pdfContext);
  const canvasRef = useRef();

  const [pdfRef, setPdfRef] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("file in pdfViewer", pdfFile);
  const viewerId = "pdfViewCanvas";
  // const renderPage = useCallback(
  //   (pageNum) => {
  //     pdfFile &&
  //       pdfFile.getPage(pageNum).then(function (page) {
  //         const viewport = page.getViewport({ scale: 1.5 });
  //         const canvas = canvasRef.current;
  //         canvas.height = viewport.height;
  //         canvas.width = viewport.width;
  //         const renderContext = {
  //           canvasContext: canvas.getContext("2d"),
  //           viewport: viewport,
  //         };
  //         page.render(renderContext);
  //       });
  //   },
  //   [pdfFile]
  // );

  // useEffect(() => {
  //   renderPage(currentPage);
  // }, [pdfFile, currentPage]);

  useEffect(() => {
    // loading pdf file
    console.log(typeof pdfFile);
    PDFDocument.load(pdfFile).then(
      (loadedPdf) => {
        console.log("loadedPdf", loadedPdf);
        setPdfRef(loadedPdf);
      },
      function (reason) {
        console.error(reason);
      }
    );
  }, [pdfFile]);

  return (
    <div
      className={classes.container}
      onClick={(event) => {
        event.preventDefault();
        console.log("event", event.target);
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
      <canvas className={classes.canvas} ref={canvasRef} id={viewerId}></canvas>
    </div>
  );
};
export default PdfViewer;
