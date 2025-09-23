import "../Modal/Modal.css";
import closeIcon from "../../assets/close.png";

const SuccessModal = ({ isOpen, onClose, onSignIn }) => {
  if (!isOpen) return null;
  return (
    <div className="modal modal_opened">
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
