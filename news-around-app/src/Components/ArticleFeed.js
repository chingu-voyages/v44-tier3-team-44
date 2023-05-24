import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const ArticleFeed = ({ selectedCategory }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();

    return () => {
      setNews([]);
    };
  }, [selectedCategory]);

  return (
    <ul>
      {news &&
        news.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default ArticleFeed;
