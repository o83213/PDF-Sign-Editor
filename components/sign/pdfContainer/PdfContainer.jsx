import React, { useContext } from "react";
import PdfViewer from "./PdfViewer";
//
import classes from "./PdfContainer.module.css";
import { pdfContext } from "../../../context/pdfContext";
const PdfContainer = (props) => {
  const { pdfFile: rawFile, modifiedFile } = useContext(pdfContext);

  const pdfFile = props.mode === "edit" ? rawFile : modifiedFile;

  return (
    <div>
      <h3>View PDF</h3>
      <div className={classes["container"]}>
        {!pdfFile && (
          <h4 className={classes.message}>No file is selected...</h4>
        )}
        {pdfFile && (
          <PdfViewer
            mode={props.mode}
            signatureArray={props.signatureArray}
            textArray={props.textArray}
            updatedCanvasPosition={props.updatedCanvasPosition}
            updatedTextPosition={props.updatedTextPosition}
            createTextHandler={props.createTextHandler}
            createSignHandler={props.createSignHandler}
            deleteSignHandler={props.deleteSignHandler}
            deleteTextHandler={props.deleteTextHandler}
            editingMode={props.editingMode}
            showModalHandler={props.showModalHandler}
            setSelectedBlockId={props.setSelectedBlockId}
            changeEditingModeHandler={props.changeEditingModeHandler}
            draggable={props.draggable}
          />
        )}
      </div>
    </div>
  );
};

export default PdfContainer;
