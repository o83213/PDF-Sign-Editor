import React, { useState, useEffect, useRef } from "react";
import PdfContainer from "./pdfContainer/PdfContainer";
import Toolbar from "./toolbar/Toolbar";
import classes from "./Container.module.css";
import SigningPad from "./toolbar/signingpad/SigningPad";
const Container = (props) => {
  const { draggable, mode } = props;
  const [signatureArray, setSignatureArray] = useState([]);
  const [textArray, setTextArray] = useState([]);
  const [pdfError, setPdfError] = useState("");
  // toggle editing mode to create new block
  const [editingMode, setEditingMode] = useState("");
  const [modalIsShown, setModalIsShow] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState("");

  const blankRef = useRef(null);

  useEffect(() => {
    const blankContext = blankRef.current.getContext("2d");
    blankContext.font = "32px serif";
    blankContext.fillText("Sign Here", 10, 50);
  }, []);

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

  // delete signature block
  const deleteSignHandler = (id) => {
    const updatedSignatureArray = signatureArray.filter(
      (signature) => signature.id !== id
    );
    setSignatureArray(updatedSignatureArray);
  };

  // delete text block
  const deleteTextHandler = (id) => {
    const updatedTextArray = textArray.filter(
      (signature) => signature.id !== id
    );
    setTextArray(updatedTextArray);
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
        draggable={draggable}
      />
      <PdfContainer
        signatureArray={signatureArray}
        textArray={textArray}
        uploadPdfError={uploadPdfError}
        pdfError={pdfError}
        updatedCanvasPosition={updatedCanvasPosition}
        updatedTextPosition={updatedTextPosition}
        createTextHandler={createTextHandler}
        createSignHandler={createSignHandler}
        deleteSignHandler={deleteSignHandler}
        deleteTextHandler={deleteTextHandler}
        showModalHandler={showModalHandler}
        editingMode={editingMode}
        setSelectedBlockId={setSelectedBlockId}
        selectedBlockId={selectedBlockId}
        changeEditingModeHandler={changeEditingModeHandler}
        draggable={draggable}
        mode={mode}
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
