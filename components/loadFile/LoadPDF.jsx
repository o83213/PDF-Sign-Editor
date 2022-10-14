import React, { useRef } from "react";
import { useRouter } from "next/router";
import classes from "./LoadPDF.module.css";
const LoadPDF = () => {
  const router = useRouter();
  const inputRef = useRef();
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
    // send the pdf file to the backend
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    fetch("http://localhost:8080/save-pdf", {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        const { fileName } = data;
        router.push({
          pathname: "/create-task/assign-field",
          query: {
            fileName,
          },
        });
      })
      .catch((err) => console.log(err));
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
