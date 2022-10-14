import React, { useState, useEffect, useRef } from "react";
import PdfContainer from "./pdfContainer/PdfContainer";
import Toolbar from "./toolbar/Toolbar";
import classes from "./Container.module.css";
import SigningPad from "./toolbar/signingpad/SigningPad";
const Container = (props) => {
  // both signature and text array to store data
  const [signatureArray, setSignatureArray] = useState([]);
  const [textArray, setTextArray] = useState([]);
  // state to store the pdf file and render pdf error
  const [pdfError, setPdfError] = useState("");
  // state to store editing mode
  const [editingMode, setEditingMode] = useState("");
  // state to decide the modal is shown or not
  const [modalIsShown, setModalIsShow] = useState(false);
  // store the selected block id for editing the block signature or text content
  const [selectedBlockId, setSelectedBlockId] = useState("");
  // set a blank canvas to global scope and pass to signature block as initial value
  const [pdfUrl, setPdfUrl] = useState("");
  const blankRef = useRef(null);
  useEffect(() => {
    const blankContext = blankRef.current.getContext("2d");
    blankContext.font = "32px serif";
    blankContext.fillText("Sign Here", 10, 50);
  }, []);
  // upload PDF file
  useEffect(() => {
    fetch("http://localhost:8080/data/rawPDF/" + props.PDFfileName).then(
      (result) => {
        if (props.signatureDatas) {
          props.signatureDatas.forEach((signatureData) => {
            createSignHandler(
              { x: signatureData.x, y: signatureData.y },
              signatureData._id
            );
          });
        }
        if (props.textDatas) {
          props.textDatas.forEach((textData) => {
            createTextHandler(
              "text",
              { x: textData.x, y: textData.y },
              textData._id
            );
          });
        }
        setPdfUrl(result.url);
      }
    );
    return () => {
      setSignatureArray([]);
      setTextArray([]);
    };
  }, [props.pdfFileName]);
  //
  const uploadPdfError = (inputError) => {
    setPdfError(inputError);
  };
  //
  const showModalHandler = () => {
    setModalIsShow(true);
  };
  const closeModalHandler = () => {
    setModalIsShow(false);
    setSelectedBlockId("");
  };
  // change editing mode
  const changeEditingModeHandler = (newMode) => {
    setEditingMode(newMode);
  };

  const updatedCanvasPosition = (canvasId, position) => {
    const updatedSignatureArray = [...signatureArray];
    const signatureIndex = signatureArray.findIndex(
      (signature) => signature.id === canvasId
    );
    updatedSignatureArray[signatureIndex].position = position;
    setSignatureArray(updatedSignatureArray);
  };
  // create a new signatrure block
  const createSignHandler = (position, id) => {
    const newSignature = {
      id: id ? id : new Date().getTime().toString(),
      dataUrl: blankRef.current.toDataURL(),
      position: position,
    };
    setSignatureArray((prev) => [...prev, newSignature]);
  };
  // update sigmature block canvas url
  const updateSignHandler = (canvasURL) => {
    const updatedSignatureArray = [...signatureArray];
    const signatureIndex = updatedSignatureArray.findIndex((signature) => {
      return signature.id === selectedBlockId;
    });
    updatedSignatureArray[signatureIndex].dataUrl = canvasURL;
    setSignatureArray(updatedSignatureArray);
  };
  // text array handler
  const createTextHandler = (content, position, id) => {
    const newText = {
      id: id ? id : new Date().getTime().toString(),
      content: content,
      position: position,
    };
    setTextArray((prev) => [...prev, newText]);
  };

  // update text Array position
  const updatedTextPosition = (textId, position) => {
    const updatedTextArray = [...textArray];
    const textIndex = textArray.findIndex((text) => text.id === textId);
    updatedTextArray[textIndex].position = position;
    setTextArray(updatedTextArray);
  };
  // update text Array content
  const updatedTextContent = (newContent) => {
    const updatedTextArray = [...textArray];
    const textIndex = textArray.findIndex(
      (text) => text.id === selectedBlockId
    );
    updatedTextArray[textIndex].content = newContent;
    setTextArray(updatedTextArray);
  };

  return (
    <div className={classes.container}>
      <Toolbar
        onGetCanvas={createSignHandler}
        changeEditingModeHandler={changeEditingModeHandler}
        editingMode={editingMode}
        signatureArray={signatureArray}
        textArray={textArray}
        pdfFileName={props.PDFfileName}
        draggable={props.draggable}
      />
      <PdfContainer
        signatureArray={signatureArray}
        textArray={textArray}
        uploadPdfError={uploadPdfError}
        pdfUrl={pdfUrl}
        pdfError={pdfError}
        updatedCanvasPosition={updatedCanvasPosition}
        updatedTextPosition={updatedTextPosition}
        createTextHandler={createTextHandler}
        createSignHandler={createSignHandler}
        showModalHandler={showModalHandler}
        editingMode={editingMode}
        setSelectedBlockId={setSelectedBlockId}
        selectedBlockId={selectedBlockId}
        changeEditingModeHandler={changeEditingModeHandler}
        draggable={props.draggable}
      />
      <canvas className={classes.blank} ref={blankRef}></canvas>
      {modalIsShown && (
        <SigningPad
          onClose={closeModalHandler}
          onUpdateSignature={updateSignHandler}
          onUpdateText={updatedTextContent}
          mode={editingMode}
          changeEditingModeHandler={changeEditingModeHandler}
          editingMode={editingMode}
        />
      )}
    </div>
  );
};
export default Container;
