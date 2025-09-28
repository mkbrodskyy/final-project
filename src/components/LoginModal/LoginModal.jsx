import { useState, useEffect } from "react";
import "../Modal/Modal.css";
import closeIcon from "../../assets/close.svg";

const LoginModal = ({ isOpen, onClose, onLogin, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  // Simple email validation regex
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleSecondButtonClick = () => {
    onClose();
    onSignUp();
  };

  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={isOpen ? "modal modal_opened" : "modal"}
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Sign in</h2>
          <label className="modal__label modal__label_type_profile">
            Email
            <input
              type="email"
              className="modal__input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              required
            />
          </label>
          {emailTouched && email && !isValidEmail(email) && (
            <div className="modal__input-error">Invalid email address</div>
          )}
          <label className="modal__label modal__label_type_profile">
            Password
            <input
              type="password"
              className="modal__input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            className={`modal__submit-button${
              email && password ? " modal__submit-button--active" : ""
            }`}
            type="submit"
            disabled={!(email && password)}
          >
            <span className="modal__submit-button-text">Sign in</span>
          </button>
          <div className="modal__secondary-action-row">
            <span className="modal__or-span">or </span>
            <button
              className="modal__link-btn"
              type="button"
              onClick={handleSecondButtonClick}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
