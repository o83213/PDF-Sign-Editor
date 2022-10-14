import React from "react";
import { IconContext } from "react-icons";
import {
  BsFillPenFill,
  BsTextareaT,
  BsUpload,
  BsDownload,
} from "react-icons/bs";
import classes from "./Toolbar.module.css";
import { useRouter } from "next/router";
const Toolbar = (props) => {
  // these two class name for signature and text button active state
  const router = useRouter();
  const textClassname =
    props.editingMode === "createText"
      ? `${classes.btn} ${classes.active}`
      : `${classes.btn}`;
  const signatureClassname =
    props.editingMode === "createSignature"
      ? `${classes.btn} ${classes.active}`
      : `${classes.btn}`;
  // toggle createSignature on the editing mode
  const createSignatureHandler = () => {
    props.changeEditingModeHandler((prev) => {
      if (prev === "createSignature") return "";
      return "createSignature";
    });
  };

  // toggle createSignature on the editing mode
  const createTextHandler = () => {
    props.changeEditingModeHandler((prev) => {
      if (prev === "createText") return "";
      return "createText";
    });
  };
  // collect the data and send to the API
  const sendToServerHandler = () => {
    // use form data to append mutiple type data to req
    const formData = new FormData();
    formData.append("signatureArray", JSON.stringify(props.signatureArray));
    formData.append("textArray", JSON.stringify(props.textArray));
    formData.append("pdfFileName", props.pdfFileName);
    // send the post request to the API
    fetch("http://localhost:8080/save-task", {
      method: "post",
      body: formData,
    })
      .then((result) => {
        // get the response json data and parse to object
        return result.json();
      })
      .then((data) => {
        router.push("/loadtasks");
      });
  };
  const downloadTaskHandler = () => {
    const formData = new FormData();
    formData.append("signatureArray", JSON.stringify(props.signatureArray));
    formData.append("textArray", JSON.stringify(props.textArray));
    formData.append("pdfFileName", props.pdfFileName);
    // send the post request to the API
    // fetch("http://localhost:8080/download", {
    fetch("http://localhost:8080/download", {
      method: "post",
      body: formData,
    })
      .then((result) => {
        // get the response json data and parse to object
        return result.json();
      })
      .then((data) => {
        // use html anchor element to download file
        const downloadAnchor = document.createElement("a");
        downloadAnchor.target = "_blank";
        downloadAnchor.download = "modified-file.pdf";
        downloadAnchor.href = "http://localhost:8080/" + data.filePath;
        downloadAnchor.click();
      });
  };
  return (
    <IconContext.Provider
      value={{ className: classes["react-icons"], size: "20px" }}
    >
      <section className={classes["toolbar-container"]}>
        <h3>Tool Field</h3>
        <div className={`${!props.draggable && classes.hidden}`}>
          <button className={classes.btn} onClick={createSignatureHandler}>
            <span>
              <BsFillPenFill />
              &nbsp;:&nbsp; Signature
            </span>
          </button>
        </div>
        <div className={`${!props.draggable && classes.hidden}`}>
          <button className={classes.btn} onClick={createTextHandler}>
            <span>
              <BsTextareaT />
              &nbsp;:&nbsp;Text
            </span>
          </button>
        </div>
        <div className={`${!props.draggable && classes.hidden}`}>
          <button className={classes.btn} onClick={sendToServerHandler}>
            <span>
              <BsUpload />
              &nbsp;:&nbsp;Create Task
            </span>
          </button>
        </div>
        <div className={`${props.draggable && classes.hidden}`}>
          <button className={classes.btn} onClick={downloadTaskHandler}>
            <span>
              <BsDownload />
              &nbsp;:&nbsp;Download task
            </span>
          </button>
        </div>
      </section>
    </IconContext.Provider>
  );
};
export default Toolbar;
