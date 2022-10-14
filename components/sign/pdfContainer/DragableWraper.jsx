import React, { useState } from "react";
import Image from "next/image";
import Draggable from "react-draggable";
import classes from "./DragableWraper.module.css";
const DragableWraper = (props) => {
  const [deltaPosition, setDeltaPosition] = useState({
    x: props.position.x,
    y: props.position.y,
  });
  const handleDrag = (e, ui) => {
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
    props.updatedCanvasPosition(props.id, deltaPosition);
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
          props.changeEditingModeHandler("editSignature");
        }}
      >
        <Image src={props.dataUrl} alt={props.id} width={150} height={50} />
        {/* <div>id: {props.id}</div>
        <div>
          x: {deltaPosition.x}, y: {deltaPosition.y}
        </div> */}
      </div>
    </Draggable>
  );
};
export default DragableWraper;
