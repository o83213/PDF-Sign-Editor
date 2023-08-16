import { createContext, useState } from "react";

const defaultStore = {
  pdfFile: null,
  setPdfFile: (file) => {
    console.log(file);
  },
};
const pdfContext = createContext(defaultStore);

function PdfProvider(props) {
  const [pdfFile, setPdfFile] = useState(null);
  const value = { pdfFile, setPdfFile };
  return (
    <pdfContext.Provider value={value}>{props.children}</pdfContext.Provider>
  );
}

export { pdfContext, PdfProvider };
