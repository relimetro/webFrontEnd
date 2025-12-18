import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../index.css";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "http://dementica.danigoes.online/v1/get_news",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Type: "Doctor" }),
          }
        );

        const data = await response.json();

        // The API returns one long string → split into articles
        const parsedArticles = parseContent(data.Content);
        setArticles(parsedArticles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Medical Dementia News</h1>
        <p>Latest research and updates for healthcare professionals.</p>

        {loading ? (
          <p>Loading news...</p>
        ) : articles.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <div className="news-container">
            {articles.map((article, index) => (
              <div key={index} className="news-card">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p className="news-explanation">
                  <strong>Explanation:</strong> {article.explanation}
                </p>
                <p className="news-impact">
                  <strong>Impact:</strong> {article.impact}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Converts the API's single Content string into structured articles
 */
function parseContent(content) {
  if (!content) return [];

  // Split on "1. **Article", "2. **Article", etc.
  const rawArticles = content.split(/\d+\.\s\*\*Article/).slice(1);

  return rawArticles.map((block) => {
    const titleMatch = block.match(/-\s(.+?)\*\*/);
    const descriptionMatch = block.match(/Description:\s(.+?)Explanation:/s);
    const explanationMatch = block.match(/Explanation:\s(.+?)How it may affect/s);
    const impactMatch = block.match(/How it may affect a person living with dementia:\s(.+)/s);

    return {
      title: titleMatch ? titleMatch[1].trim() : "Untitled Article",
      description: descriptionMatch ? descriptionMatch[1].trim() : "",
      explanation: explanationMatch ? explanationMatch[1].trim() : "",
      impact: impactMatch ? impactMatch[1].trim() : "",
    };
  });
}

export default News;

