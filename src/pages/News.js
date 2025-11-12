import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../index.css";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // When backend or API is ready, fetch articles here
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Medical Dementia News</h1>
        <p>Latest research and updates for healthcare professionals.</p>

        {articles.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <div className="news-container">
            {articles.map((article, index) => (
              <div key={index} className="news-card">
                <h2>{article.title}</h2>
                <p>
                  <strong>{article.source}</strong> – {article.date}
                </p>
                <p>{article.summary}</p>
                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    className="news-link"
                  >
                    Read Full Article →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default News;
