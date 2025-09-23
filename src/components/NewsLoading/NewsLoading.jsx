import React from "react";
import loadingImg from "../../assets/loading.png";
import "./NewsLoading.css";

function NewsLoading() {
  return (
    <div className="news-loading-wrapper">
      <img src={loadingImg} alt="Loading" className="news-loading__img" />
      <div className="news-loading__text">Searching for news...</div>
    </div>
  );
}

export default NewsLoading;
