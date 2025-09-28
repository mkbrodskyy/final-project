// News Explorer NewsCard component
import React from "react";
import "./NewsCard.css";
// Use inline SVG for trash icon with currentColor

function NewsCard({ article, isLoggedIn, isSaved, onSaveToggle }) {
  const { urlToImage, title, description, publishedAt, source, url } = article;
  // Format date as 'Month Day, Year'
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Tooltip state
  const [showTooltip, setShowTooltip] = React.useState(false);

  const isSavedPage = window.location.pathname === "/saved-news";
  const trashIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="news-card__trash-icon"
    >
      <path
        d="M3 6h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="5"
        y="6"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 11v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
  return (
    <div className="news-card">
      {article.keyword && (
        <div className="news-card__keyword-tag">{article.keyword}</div>
      )}
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img className="news-card__image" src={urlToImage} alt={title} />
      </a>
      {isSavedPage ? (
        <button
          className="news-card__delete-btn"
          type="button"
          aria-label="Delete article"
          onClick={onSaveToggle}
          tabIndex={0}
        >
          {trashIcon}
        </button>
      ) : (
        <>
          {!isLoggedIn && showTooltip && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          <button
            className={`news-card__save-btn${
              isSaved ? " news-card__save-btn--active" : ""
            }`}
            type="button"
            aria-label={
              isLoggedIn
                ? isSaved
                  ? "Unsave article"
                  : "Save article"
                : "Sign in to save articles"
            }
            onClick={isLoggedIn ? onSaveToggle : undefined}
            onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            tabIndex={0}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4a2 2 0 0 0-2 2v14l8-5.333L20 20V6a2 2 0 0 0-2-2H6z"
                fill={isSaved ? "#2F71E5" : "#fff"}
                stroke={isSaved ? "#2F71E5" : "#B6BCBF"}
                strokeWidth="2"
              />
            </svg>
          </button>
        </>
      )}
      <div className="news-card__content">
        <span className="news-card__date">{date}</span>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <span className="news-card__source">{source?.name}</span>
      </div>
    </div>
  );
}

export default NewsCard;
