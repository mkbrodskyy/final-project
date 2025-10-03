import NewsCard from "../NewsCard/NewsCard";
import SavedArticlesHeader from "../SavedArticlesHeader/SavedArticlesHeader";
import "./SavedNews.css";

function SavedNews({ savedArticles, isLoggedIn, onSaveToggle }) {
  // For demo, get username from localStorage (since not passed as prop)
  const username = localStorage.getItem("username") || "User";
  const count = savedArticles ? savedArticles.length : 0;
  // Collect keywords from saved articles (assuming each article has a 'keyword' property)
  const keywordArr =
    savedArticles && savedArticles.length > 0
      ? Array.from(new Set(savedArticles.map((a) => a.keyword).filter(Boolean)))
      : [];
  let keywordsDisplay = "";
  if (keywordArr.length === 1) {
    keywordsDisplay = keywordArr[0];
  } else if (keywordArr.length === 2) {
    keywordsDisplay = keywordArr[0] + ", " + keywordArr[1];
  } else if (keywordArr.length > 2) {
    keywordsDisplay = `${keywordArr[0]}, ${keywordArr[1]}, and ${
      keywordArr.length - 2
    } other`;
  }
  const savedArticlesHeader = {
    username,
    count,
    keywordsDisplay,
  };
  return (
    <main className="saved-news__section">
      <SavedArticlesHeader savedArticlesHeader={savedArticlesHeader} />
      {savedArticles && savedArticles.length > 0 ? (
        <div className="saved-articles__news-list-wrapper">
          <ul className="news-results__list">
            {savedArticles.map((article, i) => (
              <li key={article.url || i} className="news-results__item">
                <NewsCard
                  article={article}
                  isLoggedIn={isLoggedIn}
                  isSaved={true}
                  onSaveToggle={() => onSaveToggle(article)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="saved-articles__empty">
          Your saved articles will appear here.
        </p>
      )}
    </main>
  );
}

export default SavedNews;
