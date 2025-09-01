import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartOutline from "../../assets/heart-outline.svg";
import heartFilled from "../../assets/heart-filled.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={`item-card__like-btn${
              isLiked ? " item-card__like-btn_active" : ""
            }`}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          >
            <img
              src={isLiked ? heartFilled : heartOutline}
              alt={isLiked ? "Unlike" : "Like"}
              className="item-card__like-icon"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
