import React, { useRef, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./LoadPDF.module.css";
import { pdfContext } from "../../context/pdfContext";
const LoadPDF = () => {
  const router = useRouter();
  const inputRef = useRef();
  const { pdfFile, setPdfFile } = useContext(pdfContext);
  const checkPDFFile = () => {
    const pdfFile = inputRef.current.files[0];
    if (pdfFile && pdfFile.type !== "application/pdf") {
      alert("Not a PDF file!");
      inputRef.current.value = null;
    }
  };
  const sendPDFPath = () => {
    const pdfFile = inputRef.current.files[0];
    if (pdfFile && pdfFile.type !== "application/pdf") {
      alert("Not a PDF file!");
      return;
    }
    setPdfFile(pdfFile);
    router.push({
      pathname: "/create-task/assign-field",
    });
  };
  return (
    <div className={classes["container-out"]}>
      <div className={classes.container}>
        <h2 className={classes.header}>Prepare Doc:</h2>
        <form className={classes["container-in"]}>
          <label htmlFor="fileInput" className={classes["from-header"]}>
            Choose a PDF file:{" "}
          </label>
          <input
            className={classes.btn}
            type="file"
            onChange={checkPDFFile}
            id="fileInput"
            ref={inputRef}
          />
        </form>
        <button className={classes.btn} onClick={sendPDFPath}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoadPDF;
