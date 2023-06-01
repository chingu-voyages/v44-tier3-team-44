import React, { useState, useEffect } from "react";
import { Box, Text, Link, Image } from "@chakra-ui/react";

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
    <Box>
      {news &&
        news.map((article) => (
          <Box key={article.url} borderWidth="1px" borderRadius="md" p={4} my={2}>
            {article.urlToImage && (
              <Box mb={4}>
                <Image src={article.urlToImage} alt={article.title} />
              </Box>
            )}
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <Text fontSize="xl" fontWeight="bold">
                {article.title}
              </Text>
            </Link>
          </Box>
        ))}
    </Box>
  );
};

export default ArticleFeed;
