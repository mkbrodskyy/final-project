function SavedArticlesHeader({ savedArticlesHeader }) {
  if (typeof savedArticlesHeader !== "object") return null;
  return (
    <div className="saved-articles__header-block">
      <h2 className="saved-articles__title">Saved articles</h2>
      <div className="saved-articles__user-info">
        {savedArticlesHeader.username}, you have {savedArticlesHeader.count}{" "}
        saved article{savedArticlesHeader.count === 1 ? "" : "s"}
      </div>
      {savedArticlesHeader.count > 0 && (
        <div className="saved-articles__keywords">
          By keywords:{" "}
          <span className="saved-articles__keywords-list">
            {savedArticlesHeader.keywordsDisplay}
          </span>
        </div>
      )}
    </div>
  );
}

export default SavedArticlesHeader;
