import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeBtn from "../../assets/closebtn.svg";
import "./ItemModal.css";
import useModalClose from "../../hooks/useModalClose";

const ItemModal = ({ isOpen, onClose, card, onDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-container">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                className="modal__delete-button"
                onClick={() => onDeleteClick(card._id)}
                type="button"
                aria-label="Delete card"
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
