import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import classes from "./DragableWraperText.module.css";
const DragableWraperText = (props) => {
  const [deltaPosition, setDeltaPosition] = useState({
    x: props.position.x,
    y: props.position.y,
  });
  const spanRef = useRef();
  const handleDrag = (e, ui) => {
    e.preventDefault();
    setDeltaPosition((prev) => ({
      x: prev.x + ui.deltaX,
      y: prev.y + ui.deltaY,
    }));
  };

  const onStart = () => {
    if (!props.draggable) {
      return false;
    }
  };

  const onStop = () => {
    props.updatedTextPosition(props.id, deltaPosition);
  };
  const dragHandlers = { onStart, onStop };
  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: props.position.x, y: props.position.y }}
      onDrag={handleDrag}
      {...dragHandlers}
    >
      <div
        className={classes["box"]}
        onDoubleClick={() => {
          props.showModalHandler();
          props.setSelectedBlockId(props.id);
          props.changeEditingModeHandler("editText");
        }}
      >
        <span ref={spanRef}>{props.content}</span>
        {/* <div>id: {props.id}</div>
        <div>
          x: {deltaPosition.x}, y: {deltaPosition.y}
        </div> */}
      </div>
    </Draggable>
  );
};
export default DragableWraperText;
