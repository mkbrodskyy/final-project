import closeBtn from "../../assets/closebtn.svg";
import "./DeleteConfirmationModal.css";
import useModalClose from "../../hooks/useModalClose";

const DeleteConfirmationModal = ({ onClose, onConfirm, isOpen }) => {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirmation">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <div className="modal__body">
          <p className="modal__text">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
        </div>

        <button
          className="modal__confirm-button"
          type="button"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
