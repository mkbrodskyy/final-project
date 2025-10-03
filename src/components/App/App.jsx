import Header from "../Header/Header";
import "../Page/Page.css";
import "../NewsResults/NewsResults.css";
import "../Main/Main.css";
import SavedNews from "../SavedNews/SavedNews";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { useState, useEffect } from "react";
import { fetchNews } from "../../utils/newsApi";
import NewsCard from "../NewsCard/NewsCard";
import notFoundImg from "../../assets/not-found.svg";
import NewsLoading from "../NewsLoading/NewsLoading";

// Show 3 cards at a time with Show more button
function NewsResults({ articles, isLoggedIn, savedArticles, onSaveToggle }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const handleShowMore = () => setVisibleCount((c) => c + 3);
  const visibleArticles = articles.slice(0, visibleCount);
  const showMoreNeeded = visibleCount < articles.length;
  return (
    <>
      <ul className="news-results__list">
        {visibleArticles.map((article, i) => (
          <li key={article.url || i} className="news-results__item">
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={!!savedArticles.find((a) => a.url === article.url)}
              onSaveToggle={() => onSaveToggle(article)}
            />
          </li>
        ))}
      </ul>
      {showMoreNeeded && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button className="news-results__show-more" onClick={handleShowMore}>
            <span className="news-results__show-more-text">Show more</span>
          </button>
        </div>
      )}
    </>
  );
}

function App() {
  // News search state
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // Simulated saved articles state, persisted in localStorage
  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      const stored = localStorage.getItem("savedArticles");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save/unsave handler
  const handleToggleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      const alreadySaved = prev.find((a) => a.url === article.url);
      let updated;
      if (alreadySaved) {
        updated = prev.filter((a) => a.url !== article.url);
      } else {
        // Attach the current searchQuery as the keyword
        const articleWithKeyword = { ...article, keyword: searchQuery };
        updated = [...prev, articleWithKeyword];
      }
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  };
  // News search handler
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchError("Please enter a keyword");
      setArticles([]);
      return;
    }
    setSearchError("");
    setIsLoading(true);
    setArticles([]);
    setSearchQuery(query);

    // Calculate date range (last 7 days)
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 7);
    const toStr = to.toISOString().split("T")[0];
    const fromStr = from.toISOString().split("T")[0];

    fetchNews({ query, from: fromStr, to: toStr })
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setArticles([]);
          setSearchError("Nothing Found");
        }
      })
      .catch(() =>
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later."
        )
      )
      .finally(() => setIsLoading(false));
  };
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  useEffect(() => {
    const body = document.body;
    if (isLoginModalOpen || isSignUpModalOpen || isSuccessModalOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }
    return () => {
      body.style.overflow = "visible";
    };
  }, [isLoginModalOpen, isSignUpModalOpen, isSuccessModalOpen]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
  }, [isLoggedIn, username]);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };
  const handleCloseSignUpModal = () => setIsSignUpModalOpen(false);

  const handleLogin = (formData) => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    if (formData.username) {
      setUsername(formData.username);
    } else if (formData.email) {
      // Try to get the username from localStorage mapping
      const userMap = JSON.parse(
        localStorage.getItem("userEmailToName") || "{}"
      );
      if (userMap[formData.email]) {
        setUsername(userMap[formData.email]);
      } else {
        // Fallback: use the part before @ as a display name
        setUsername(formData.email.split("@")[0]);
      }
    }
    // localStorage update handled by useEffect
  };
  const handleSignUp = (formData) => {
    setIsSignUpModalOpen(false);
    setIsSuccessModalOpen(true);
    if (formData && formData.username && formData.email) {
      setUsername(formData.username);
      // Save mapping of email to username in localStorage
      const userMap = JSON.parse(
        localStorage.getItem("userEmailToName") || "{}"
      );
      userMap[formData.email] = formData.username;
      localStorage.setItem("userEmailToName", JSON.stringify(userMap));
    } else if (formData && formData.username) {
      setUsername(formData.username);
    }
  };
  const handleSignInFromSuccess = () => {
    setIsSuccessModalOpen(false);
    setIsLoggedIn(true);
  };
  const handleSignInFromSignUp = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const location = useLocation();
  // Compute Saved articles header info
  const savedCount = savedArticles ? savedArticles.length : 0;
  const savedKeywordArr =
    savedArticles && savedArticles.length > 0
      ? Array.from(new Set(savedArticles.map((a) => a.keyword).filter(Boolean)))
      : [];
  let savedKeywordsDisplay = "";
  if (savedKeywordArr.length === 1) {
    savedKeywordsDisplay = savedKeywordArr[0];
  } else if (savedKeywordArr.length === 2) {
    savedKeywordsDisplay = savedKeywordArr[0] + ", " + savedKeywordArr[1];
  } else if (savedKeywordArr.length > 2) {
    savedKeywordsDisplay = `${savedKeywordArr[0]}, ${savedKeywordArr[1]}, and ${
      savedKeywordArr.length - 2
    } other`;
  }
  return (
    <div className="page">
      {/* Header always visible, but content varies by route */}
      <div className="header-wrapper">
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          onSignIn={handleOpenLoginModal}
          onSignOut={() => {
            setIsLoggedIn(false);
            setUsername("");
          }}
          isLoginModalOpen={isLoginModalOpen}
          onCloseLoginModal={handleCloseLoginModal}
          savedArticlesHeader={
            location.pathname === "/saved-news"
              ? {
                  username,
                  count: savedCount,
                  keywordsDisplay: savedKeywordsDisplay,
                }
              : null
          }
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="main-hero-section">
                <div className="header-bg-wrapper">
                  <div className="header-bg-image"></div>
                  <h1 className="main-title">
                    What&apos;s going on in the world?
                  </h1>
                  <p className="main-subtext">
                    Find the latest news on any topic and save them in your
                    personal account.
                  </p>
                  <SearchForm onSearch={handleSearch} error={searchError} />
                </div>
              </section>
              {/* News results block - only after a search */}
              {(isLoading ||
                articles.length > 0 ||
                (searchError && searchError !== "Please enter a keyword")) && (
                <section className="main-results-section">
                  <div className="news-results-block">
                    {/* Show heading only when there are articles and not loading or error */}
                    {!isLoading && !searchError && articles.length > 0 && (
                      <h2 className="news-results__heading">Search results</h2>
                    )}
                    {isLoading && <NewsLoading />}
                    {!isLoading && !searchError && articles.length > 0 && (
                      <NewsResults
                        articles={articles}
                        isLoggedIn={isLoggedIn}
                        savedArticles={savedArticles}
                        onSaveToggle={handleToggleSaveArticle}
                      />
                    )}
                    {!isLoading &&
                      searchError &&
                      searchError !== "Please enter a keyword" &&
                      (searchError === "Nothing Found" ? (
                        <div className="news-results-error-wrapper">
                          <img
                            src={notFoundImg}
                            alt="Not found"
                            className="news-results-error__img"
                          />
                          <div className="news-results-error">
                            <div className="news-results-error__title">
                              Nothing found
                            </div>
                            <div className="news-results__error-subtitle">
                              Sorry, but nothing matched <br />
                              your search terms.
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="news-results-error">{searchError}</div>
                      ))}
                  </div>
                </section>
              )}
              {/* About section */}
              <section className="main-about-section">
                <div className="main-body-visuals-wrapper">
                  <div className="main-body-visuals">
                    <div className="main-solid-circle"></div>
                    <div className="main-about-text">
                      <h2 className="main-about-title">About the author</h2>
                      <p className="main-about-desc">
                        Mykhaylo Brodskyy is a software engineering student at
                        TripleTen. This project, built with React, JavaScript,
                        and CSS, showcases his ability to work with third-party
                        APIs and manage application state. Mykhaylo is
                        passionate about creating intuitive, responsive user
                        experiences and is eager to apply his skills to new
                        challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
              onSaveToggle={handleToggleSaveArticle}
            />
          }
        />
      </Routes>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLogin={handleLogin}
        onSignUp={handleOpenSignUpModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
        onSignIn={handleSignInFromSignUp}
        onSignUpSuccess={(formData) => handleSignUp(formData)}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onSignIn={handleSignInFromSuccess}
      />
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

export default App;
