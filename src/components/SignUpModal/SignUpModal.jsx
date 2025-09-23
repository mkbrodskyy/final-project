import { useState } from "react";
import "../Modal/Modal.css";
import closeIcon from "../../assets/close.png";

import { useEffect } from "react";

const SignUpModal = ({ isOpen, onClose, onSignIn, onSignUpSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setEmail("");
      setPassword("");
      setEmailTouched(false);
    }
  }, [isOpen]);

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign up logic here
    onSignUpSuccess({ username, email });
  };

  const handleSecondButtonClick = () => {
    onClose();
    onSignIn();
  };

  if (!isOpen) return null;

  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Sign up</h2>
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
              autoComplete="email"
              name="email"
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
              autoComplete="new-password"
              name="new-password"
            />
          </label>
          <label className="modal__label modal__label_type_profile">
            Username
            <input
              type="text"
              className="modal__input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              name="username"
            />
          </label>
          <button
            className={`modal__submit-button${
              username && email && password && isValidEmail(email)
                ? " modal__submit-button--active"
                : ""
            }`}
            type="submit"
            disabled={!(username && email && password && isValidEmail(email))}
          >
            <span className="modal__submit-button-text">Sign up</span>
          </button>
          <div className="modal__secondary-action-row">
            <span className="modal__or-span">or </span>
            <button
              className="modal__link-btn"
              type="button"
              onClick={handleSecondButtonClick}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
