// Accept savedArticles prop for /saved-news
import "./Header.css";
import SavedArticlesHeader from "../SavedArticlesHeader/SavedArticlesHeader";
import exitIcon from "../../assets/exit.png";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";

function Header({
  isLoggedIn,
  username,
  onSignOut,
  onSignIn,
  savedArticlesHeader,
  isLoginModalOpen,
  onCloseLoginModal,
}) {
  // Use dark header style on /saved-news
  const isDark = window.location.pathname === "/saved-news";
  return (
    <header className={`header${isDark ? " header--dark" : ""}`}>
      <div className="header-main-wrapper">
        <div className="header__row">
          <span className="header__brand">NewsExplorer</span>
          <div className="header__actions">
            {/* Desktop buttons */}
            <div className="header__actions-desktop">
              <Link
                to="/"
                className="header__btn header__btn-home header__btn--active"
                style={{ position: "relative", textDecoration: "none" }}
              >
                Home
                {window.location.pathname === "/" && (
                  <div
                    className="header__btn-indicator"
                    style={{ width: 68 }}
                  ></div>
                )}
              </Link>
              {isLoggedIn && (
                <div className="header__btn-wrapper">
                  <Link
                    to="/saved-news"
                    className="header__btn header__btn-saved"
                    style={{ textDecoration: "none" }}
                  >
                    Saved articles
                  </Link>
                  {window.location.pathname === "/saved-news" && (
                    <div className="header__btn-indicator header__btn-indicator--saved"></div>
                  )}
                </div>
              )}
              {isLoggedIn ? (
                <div className="header__btn-username">
                  <span className="header__username-text">{username}</span>
                  <button
                    className="header__signout-wrapper"
                    type="button"
                    aria-label="Sign out"
                    onClick={onSignOut}
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
              ) : (
                <button
                  className="header__btn header__btn-signin"
                  onClick={onSignIn}
                >
                  Sign in
                </button>
              )}
            </div>
            {/* Hamburger menu for mobile */}
            {/* this is the content we need to render on the top - so user will see the modal content */}
            <div className="header__actions-mobile">
              <MobileMenu
                isLoggedIn={isLoggedIn}
                username={username}
                onSignIn={onSignIn}
                onSignOut={onSignOut}
                isLoginModalOpen={isLoginModalOpen}
                onCloseLoginModal={onCloseLoginModal}
              />
            </div>
          </div>
        </div>
        {/* ...existing code... */}
      </div>
    </header>
  );
}

export default Header;
