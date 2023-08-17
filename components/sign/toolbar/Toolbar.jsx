import React, { useContext } from "react";
import { IconContext } from "react-icons";
import {
  BsFillPenFill,
  BsTextareaT,
  BsUpload,
  BsDownload,
} from "react-icons/bs";
import classes from "./Toolbar.module.css";
import { pdfContext } from "../../../context/pdfContext";
import { useRouter } from "next/router";
import { modifyPdf } from "../../../util/modifyPdf";
const Toolbar = (props) => {
  const { pdfFile, setModifiedFile, modifiedFile } = useContext(pdfContext);

  const router = useRouter();
  const textClassname =
    props.editingMode === "createText"
      ? `${classes.btn} ${classes.active}`
      : `${classes.btn}`;
  const signatureClassname =
    props.editingMode === "createSignature"
      ? `${classes.btn} ${classes.active}`
      : `${classes.btn}`;

  const createSignatureHandler = () => {
    const newEditingMode =
      props.editingMode === "createSignature" ? "" : "createSignature";
    props.changeEditingModeHandler(newEditingMode);
  };

  const createTextHandler = () => {
    props.changeEditingModeHandler((prev) => {
      if (prev === "createText") return "";
      return "createText";
    });
  };

  const modifyFileHandler = async () => {
    const newPdf = await modifyPdf(
      pdfFile,
      props.signatureArray,
      props.textArray
    );

    setModifiedFile(newPdf);
    router.push("/viewtask");
  };
  const downloadTaskHandler = () => {
    const newfile = new Blob([modifiedFile], {
      type: "application/pdf",
    });
    const modifiedFileUrl = URL.createObjectURL(newfile);
    window.open(modifiedFileUrl);
  };
  return (
    <IconContext.Provider
      value={{ className: classes["react-icons"], size: "20px" }}
    >
      <section className={classes["toolbar-container"]}>
        <h3>Tool Field</h3>
        <div className={`${!props.draggable && classes.hidden}`}>
          <button
            className={signatureClassname}
            onClick={createSignatureHandler}
          >
            <span>
              <BsFillPenFill />
              &nbsp;:&nbsp; Signature
            </span>
          </button>
        </div>
        <div className={`${!props.draggable && classes.hidden}`}>
          <button className={textClassname} onClick={createTextHandler}>
            <span>
              <BsTextareaT />
              &nbsp;:&nbsp;Text
            </span>
          </button>
        </div>
        <div className={`${!props.draggable && classes.hidden}`}>
          <button className={classes.btn} onClick={modifyFileHandler}>
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
