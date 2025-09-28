import React from "react";
import loadingImg from "../../assets/loading.svg";
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
