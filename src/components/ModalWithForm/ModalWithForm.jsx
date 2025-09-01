import "./ModalWithForm.css";
import closeBtn from "../../assets/closebtn.svg";
import useModalClose from "../../hooks/useModalClose";

const ModalWithForm = ({
  children,
  buttonText,
  secondButtonText,
  onSecondButtonClick,
  title,
  isOpen,
  onClose,
  onSubmit,
}) => {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit-wrapper">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondButtonText && (
              <button
                type="button"
                className="modal__submit-button"
                onClick={onSecondButtonClick}
              >
                {secondButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
