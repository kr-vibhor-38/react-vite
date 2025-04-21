// PdfPopupButton.tsx
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PdfComponent from "./download";
import "./styles.css";

const ReactSwal = withReactContent(Swal);

const PdfPopupButton: React.FC = () => {
  const openPopup = () => {
    ReactSwal.fire({
      title: "Feedback Report",
      html: "<div id='pdf-container'></div>", // placeholder for React content
      showConfirmButton: false,
      showCloseButton:true,
      width: "50%", // adjust width as needed
      didOpen: () => {
        const container = document.getElementById("pdf-container");
        if (container) {
          // render React component inside SweetAlert
          const root = ReactSwal.getPopup()?.querySelector("#pdf-container");
          if (root) {
            // React 18+ render
            import("react-dom/client").then((ReactDOM) => {
              const r = ReactDOM.createRoot(root);
              r.render(<PdfComponent />);
            });
          }
        }
      },
    });
  };

  return (
    <button onClick={openPopup} className="print-btn">
      <span style={{fontSize:"18px"}}>&#128438;</span> Print as PDF
    </button>
  );
};

export default PdfPopupButton;
