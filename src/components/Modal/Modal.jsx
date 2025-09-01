import { useEffect } from "react";
import "./Modal.css";
import closeBtn from "../../assets/closebtn.svg";

export const Modal = ({ name, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__container">
        {children}
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeBtn} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
