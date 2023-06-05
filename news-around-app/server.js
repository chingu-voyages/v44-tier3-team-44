// set localhost port 8000 to run backend server
const PORT = 8000;

// import modules
const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache')

// import dotenv module to retrieve API_KEY from .env file
require('dotenv').config()

const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache TTL set to 3600 seconds (60 minutes)
// pass json to the frontend 
app.use(express.json());
app.use(cors());

// retrieve API_KEY from .env file
const API_KEY = process.env.API_KEY

// use NodeJS Client Library to set up News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(API_KEY);

// Set route to /headlines to use topHeadlines endpoint 
app.get('/headlines', async (req, res) => {
  const cacheKey = "headlines:" + JSON.stringify(req.query); // Generate cache key base on request parameters
  console.log({cacheKey}) // check cacheKey
  // check if data exists in cache
  const cacheData = cache.get(cacheKey);
  if (cacheData) {
    return res.json(cacheData)
  }
  try {
    const language = req.query.language // retrieve from the body.language value set in the frontend
    // const category = req.query.userCategory || "" // retrieve from userCategory from the frontend
    const response = await newsapi.v2.topHeadlines ({
      language: language,
      // country: 'gb',
      // category: category
  });
  if (response) {
    // retrieve the articles key from the response and store in allArticles
  const allArticles = response.articles;

  // use a for loop to do data processing
  // checked description, urlToImage and content properties, does not retrieve anything

  // // store each article's data in an array where each article is stored in a dictionary
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
  // cache allArticleData with it's cacheKey
  cache.set(cacheKey, allArticleData)
  console.log({cacheKey});
  // send data processed article data to the frontend
  res.json(allArticleData);
  } else {
    res.status(404).json({ error: "Articles not found" })
  }

// catch any errors 
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// use the source endpoint to extract options for category filter on the frontend

app.get('/category', async (req, res) => {
  try {
  const response = await newsapi.v2.sources ({});
  const sources = response.sources;
  const categories = []
  // use a for loop to grap the category out of every source and add to an array called categories
  for (let i = 0; i < sources.length; i++) {
    let newCategory = sources[i].category
    categories.push(newCategory)
  }
  const uniqueCategories = [...new Set(categories)] // remove all the duplicates and save to a new array uniqueCategories
  // console.log(uniqueCategories)
  // Send the articles in the response
  res.json(uniqueCategories);
// catch any errors 
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));