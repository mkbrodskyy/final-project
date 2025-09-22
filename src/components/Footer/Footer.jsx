import React from "react";
import "./Footer.css";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linkedin.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content-wrapper">
        <div className="footer__copyright">
          © 2025 Supersite, Powered by News API
        </div>
        <div className="footer__buttons-row">
          <div className="footer__nav-group">
            <Link
              to="/"
              className="footer__nav-btn footer__home-btn"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <a
              className="footer__nav-btn footer__tripleten-btn"
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripleTen"
            >
              TripleTen
            </a>
          </div>
          <div className="footer__icon-group">
            <a
              href="https://github.com/"
              className="footer__icon-btn footer__icon_github"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" className="footer__icon" />
            </a>
            <a
              href="https://www.linkedin.com/"
              className="footer__icon-btn footer__icon_linkedin"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
