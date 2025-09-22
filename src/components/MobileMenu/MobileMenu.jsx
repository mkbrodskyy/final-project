import React, { useState } from "react";
import "./MobileMenu.css";
import closeIcon from "../../assets/close.png";
import { NavLink } from "react-router-dom";

function MobileMenu({ isLoggedIn, username, onSignIn, onSignOut }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      {!open ? (
        <button
          className="mobile-menu__icon"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="mobile-menu__bar"></span>
          <span className="mobile-menu__bar"></span>
        </button>
      ) : null}
      {open && (
        <>
          <div className="mobile-menu__overlay" />
          <div className="mobile-menu__dropdown">
            <div className="mobile-menu__dropdown-header">
              <span className="header__brand">NewsExplorer</span>
              <button
                className="modal__close-icon"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <img src={closeIcon} alt="Close" />
              </button>
            </div>
            {!isLoggedIn ? (
              <div>
                {" "}
                <button
                  className="mobile-menu__signin-btn"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      onSignIn();
                    }, 300);
                  }}
                >
                  Sign in
                </button>{" "}
              </div>
            ) : (
              <>
                {window.location.pathname === "/saved-news" ? (
                  <NavLink
                    to="/"
                    className="mobile-menu__item"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </NavLink>
                ) : (
                  <NavLink
                    to="/saved-news"
                    className="mobile-menu__item"
                    onClick={() => setOpen(false)}
                  >
                    Saved articles
                  </NavLink>
                )}
                <div className="mobile-menu__user-row">
                  <span className="mobile-menu__item">{username}</span>
                  <button
                    className="mobile-menu__item mobile-menu__signout-btn"
                    onClick={onSignOut}
                    aria-label="Log out"
                  >
                    <svg
                      className="header__signout-icon"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 6h8M8 6v16M8 22h8M16 14h8M24 14l-3-3M24 14l-3 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MobileMenu;
