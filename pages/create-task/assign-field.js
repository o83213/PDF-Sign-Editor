import React from "react";
import Container from "../../components/sign/Container";
const AssignField = (props) => {
  const { fileName } = props;
  return <Container PDFfileName={fileName} draggable={true} />;
};
export const getServerSideProps = (context) => {
  const { fileName } = context.query;
  return {
    props: {
      fileName,
    },
  };
};
export default AssignField;
