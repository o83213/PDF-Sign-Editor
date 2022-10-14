import React, { useState, useRef, useEffect } from "react";
import Modal from "../../../layout/Modal";
import classes from "./SingingPad.module.css";
const SigningPad = (props) => {
  // store the text for updating to text block on pdf viewer
  const [canvasText, setCanvasText] = useState("");
  // this writing mode is to control canvas can be draw or not
  const [writingMode, setWritingMode] = useState(false);
  // store the context on the canvas
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
  }, []);
  // build the pointer down event for signature canvas
  const pointerDownHandler = (event) => {
    setWritingMode(true);
    ctx.beginPath();
    const [positionX, positionY] = getTargetPosition(event);
    ctx.moveTo(positionX, positionY);
  };
  // build the pointer up event for signature canvas and stop writing
  const pointerUpHandler = () => {
    setWritingMode(false);
  };
  // draw the line the fill the line
  const pointerMoveHandler = (event) => {
    if (!writingMode) return;
    const [positionX, positionY] = getTargetPosition(event);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
  };
  // a helper function to get the cursor position
  const getTargetPosition = (event) => {
    let positionX = 0;
    let positionY = 0;
    positionX = event.clientX - event.target.getBoundingClientRect().x;
    positionY = event.clientY - event.target.getBoundingClientRect().y;
    return [positionX, positionY];
  };
  // save signature or text content and update the state to the container
  const saveContentHandler = (event) => {
    event.preventDefault();
    if (props.editingMode === "editSignature") {
      const imageURL = canvasRef.current.toDataURL();
      props.onUpdateSignature(imageURL);
    } else if (props.editingMode === "editText") {
      props.onUpdateText(canvasText);
      setCanvasText("");
    }
    props.onClose();
  };
  // just clear the content in the signing pad canvas
  const clearCanvasHandler = (event) => {
    event.preventDefault();
    if (props.editingMode === "editSignature") {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    } else if (props.editingMode === "editText") {
      setCanvasText("");
    }
  };
  return (
    <Modal onClose={props.onClose}>
      <form className={classes["signature-pad-form"]}>
        <header>
          <h4>
            <b>
              Please {props.mode === "editSignature" ? "sign" : "type"} here:
            </b>
          </h4>
        </header>
        <div className={classes["canvas-container"]}>
          <canvas
            height="100"
            width="300"
            ref={canvasRef}
            className={`${classes["signature-pad"]} ${
              props.mode !== "editSignature" && classes["hidden"]
            }`}
            onPointerDown={pointerDownHandler}
            onPointerUp={pointerUpHandler}
            onPointerMove={pointerMoveHandler}
          ></canvas>
          {props.mode === "editText" && (
            <textarea
              className={classes.textarea}
              rows={2}
              placeholder="Type here"
              onChange={(e) => {
                setCanvasText(e.target.value);
              }}
            />
          )}
          <button
            className={`${classes["btn"]} ${classes["clear-button"]}`}
            onClick={clearCanvasHandler}
          >
            Clear
          </button>
          <button
            className={`${classes["btn"]} ${classes["submit-button"]}`}
            onClick={saveContentHandler}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default SigningPad;
