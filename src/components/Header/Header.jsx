import "./Header.css";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";

function Header({
  isLoggedIn,
  username,
  onSignOut,
  onSignIn,
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
            {/* Desktop navigation */}
            <nav className="header__nav-desktop" aria-label="Main navigation">
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
            </nav>
            {/* Mobile navigation */}
            <nav className="header__nav-mobile" aria-label="Mobile navigation">
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
            </nav>
          </div>
        </div>
        {/* ...existing code... */}
      </div>
    </header>
  );
}

export default Header;
