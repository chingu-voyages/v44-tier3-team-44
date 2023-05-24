
import { Box, Image, HStack, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import CountryFilter from './Components/CountryFilter';
import CategoryFilter from './Components/CategoryFilter';
// import NewsArticle from "./Components/NewsArticle";
import ArticleFeed from './Components/ArticleFeed';
import './App.css';

function App() {
  // this part is for the newsHeadline api endoint
  // still need to find a way to send language to the backend from the frontend
  // const [ language, setLanguage ] = useState(null);

  const [allArticles, setAllArticles] = useState([]); // set allArticles as an empty array by default
  const [selectedCategory, setSelectedCategory] = useState('');

  const getHeadlines = async () => {
    try {
      const language = 'en'
      const response = await fetch(`http://localhost:8000/headlines?language=${language}`);
      
      // save all data from from backend server retrieved from News API
      const data = await response.json();
      console.log(data); // handle the response from the backend
      // save all the article objects into articleData
      const articleData = data.articles;
      // use the setAllArticle function to save each article object in allArticles
      setAllArticles(Object.values(articleData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHeadlines();
  },[]); // use the useEffect hook to call the getHeadlines function when App renders


  // use a for loop to print out each articles title/source/author etc
  // checked description, urlToImage and content properties, does not retrieve anything

  // store each article's data in an array where each article is stored in a dictionary
  const allArticleData = []

    for (let i = 0; i < allArticles.length; i++) {
      let hyphenAmount = allArticles[i].title.split("-").length -1
      let articleTitle = allArticles[i].title.split("-")[0]
      let sourceCheck = ""
      let author = allArticles[i].author
      let newsSource = allArticles[i].source["Name"]
      let url = allArticles[i].url
      // clean publishDate property
      let publishDate = allArticles[i].publishedAt.split("T")[0]      
      // check title property for more than one hyphens
      if (hyphenAmount > 1) {
        // console.log("theres more than 1 hyphen")
        sourceCheck = allArticles[i].title.split("-")[hyphenAmount]
        articleTitle = allArticles[i].title.replace(sourceCheck, '')
        // get the lastIndex of "-"
        let lastHyphenIndex = articleTitle.lastIndexOf("-")
        // use subString method to only save only up to the lastHyphen without the hyphen itself
        articleTitle = articleTitle.substring(0, lastHyphenIndex)
      }
      // some article titles include | News Source or News Type, code below to get rid of it
      if (articleTitle.includes("|")) {
        articleTitle = articleTitle.split("|")[0]
      }
      // check author property
      // clean up author when it is null or an empty string 
      if (author === null || author === "") {
        author = "N/A"
      }
      let articleData = {
        title: articleTitle,
        author: author,
        source: newsSource,
        url: url,
        date: publishDate // 2023-05-16
      };

      allArticleData.push(articleData);
  }

  // check article data retrieved from headlines endpoint
  console.log(allArticles)
  // check article data after data clean up on headlines endpoint
  console.log(allArticleData)

  // the code below is toe retrieve the source endpoint from NewsApi for the category filter

  const [categoryArticles, setCategoryArticles] = useState([]); // set categoryArticles as an empty array by default

  const getCategoryNews = async () => {
    try {
      const response = await fetch('http://localhost:8000/category');
      // save all data from from backend server retrieved from News API
      const categoryData = await response.json();
      // save all the article objects into articleData
      const categoryArticleData = categoryData.sources;
      // use the setAllArticle function to save each article object in allArticles
      setCategoryArticles(Object.values(categoryArticleData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoryNews();
  },[]); // use the useEffect hook to call the getCategoryNews function when App renders

  console.log(categoryArticles)

  return (
    <>
      <HStack ml="250px" spacing="24px">
        <Box>
          <Image src="https://i.gifer.com/69QH.gif" boxSize="200px"></Image>
        </Box>
        <Heading color="#0050C8" fontWeight="bold">
          What Happens
        </Heading>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <CountryFilter />
      </HStack>
      <ArticleFeed selectedCategory={selectedCategory} />
    </>
  );
}

export default App;
