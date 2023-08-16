import { useRouter } from "next/router";
import React, { useContext } from "react";
import Container from "../../components/sign/Container";
import { pdfContext } from "../../context/pdfContext";
const AssignField = () => {
  const { pdfFile } = useContext(pdfContext);
  const router = useRouter();
  if (!pdfFile) {
    console.log("pdfFile is null");
    // router.push("/create-task/prepare-doc");
    return <div>No pdf file!</div>;
  }
  return <Container pdfFile={pdfFile} draggable={true} />;
};

export default AssignField;
