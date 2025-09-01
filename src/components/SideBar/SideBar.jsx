import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./SideBar.css";

function SideBar() {
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">{name}</p>
    </div>
  );
}

export default SideBar;
