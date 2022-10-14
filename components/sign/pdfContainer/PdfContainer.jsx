import React, { useState, useEffect } from "react";
import PdfViewer from "./PdfViewer";
import DragableWraper from "./DragableWraper";
//
import classes from "./PdfContainer.module.css";
const PdfContainer = (props) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  // allowed files
  const allowedFiles = ["application/pdf"]; // minetype of pdf file
  //
  const changeFileHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && allowedFiles.includes(selectedFile.type)) {
      props.uploadPdfFile(selectedFile);
      setPdfUrl(URL.createObjectURL(selectedFile));
      setPdfError(null);
    } else {
      const error = new Error("Not a valid pdf file!");
      setPdfError(error);
    }
  };
  useEffect(() => {
    setPdfUrl(props.pdfUrl);
  }, [props.pdfUrl]);
  return (
    <div>
      {/* <form>
        <label htmlFor="">Upload PDF File: </label>
        <input type="file" onChange={changeFileHandler} />
      </form> */}
      <h3>View PDF</h3>
      <div className={classes["container"]}>
        {!pdfUrl && !pdfError && (
          <h4 className={classes.message}>No file is selected...</h4>
        )}
        {pdfUrl && !pdfError && (
          <PdfViewer
            url={pdfUrl}
            signatureArray={props.signatureArray}
            textArray={props.textArray}
            updatedCanvasPosition={props.updatedCanvasPosition}
            updatedTextPosition={props.updatedTextPosition}
            // updatedTextContent={props.updatedTextContent}
            createTextHandler={props.createTextHandler}
            createSignHandler={props.createSignHandler}
            editingMode={props.editingMode}
            showModalHandler={props.showModalHandler}
            setSelectedBlockId={props.setSelectedBlockId}
            changeEditingModeHandler={props.changeEditingModeHandler}
            draggable={props.draggable}
          />
        )}
        {pdfError && (
          <h4 className={`${classes.message} ${classes.error}`}>
            {pdfError.message}
          </h4>
        )}
      </div>
    </div>
  );
};

export default PdfContainer;
