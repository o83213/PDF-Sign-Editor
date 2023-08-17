import React, { useContext } from "react";
import Container from "../../components/sign/Container";
import { pdfContext } from "../../context/pdfContext";
const AssignField = () => {
  const { pdfFile } = useContext(pdfContext);
  if (!pdfFile) {
    return <div>No pdf file!</div>;
  }
  return <Container mode={"edit"} draggable={true} />;
};

export default AssignField;
