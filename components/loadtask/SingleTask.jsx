import React from "react";
import Container from "../sign/Container";
const SingleTask = (props) => {
  const { fileName, signatureDatas, textDatas } = props.task;
  return (
    <Container
      PDFfileName={fileName}
      signatureDatas={signatureDatas}
      textDatas={textDatas}
      draggable={false}
    />
  );
};
export default SingleTask;
