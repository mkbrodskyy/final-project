import { useEffect } from "react";
import "../Modal/Modal.css";
import closeIcon from "../../assets/close.svg";

const SuccessModal = ({ isOpen, onClose, onSignIn }) => {
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className="modal modal_opened"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal__content modal__content--success">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <div className="modal__success-message">
          Registration successfully completed!
        </div>
        <button
          className="modal__success-signin-btn"
          type="button"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
