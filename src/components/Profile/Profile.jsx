import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.png";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfile,
  onSignOut,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button className="profile__edit-btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button onClick={onSignOut} className="header__signout-btn">
          Sign Out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={userItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
