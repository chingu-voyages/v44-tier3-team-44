// import DataProcessing function
const DataProcessing = require('./dataProcessing');

// set localhost port 8000 to run backend server
const PORT = 8000;

// import modules
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');

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
const e = require('express');
const newsapi = new NewsAPI(API_KEY);

// Set route to /headlines to use topHeadlines endpoint 
app.get('/headlines', async (req, res) => {
  const cacheKey = "headlines:" + JSON.stringify(req.query); // Generate cache key base on request parameters
  // console.log({cacheKey}) // check cacheKey
  // check if data exists in cache
  const cacheData = cache.get(cacheKey);
  if (cacheData) {
    return res.json(cacheData)
  }
  try {
    const language = req.query.language || "" // retrieve from the body.language value set in the frontend
    const category = req.query.category || "" // retrieve category from the frontend
    const country = req.query.country || ""
    const response = await newsapi.v2.topHeadlines ({
      language: language,
      country: country,
      category: category
  });
  if (response) {
    // retrieve the articles key from the response and store in allArticles
  const allArticles = response.articles;

  // use a for loop to do data processing
  const processedData = DataProcessing(allArticles);

  // cache allArticleData with it's cacheKey
  cache.set(cacheKey, processedData)
  console.log('cacheData', cacheData);
  // send data processed article data to the frontend
  res.json(processedData);
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
  const cacheKey = "categories";
  const cacheData = cache.get(cacheKey);
  console.log({cacheData})
  if (cacheData) {
    return res.json(cacheData);
  }
  try {
  const response = await newsapi.v2.sources ({});
  const sources = response.sources;
  const categories = [...new Set(sources.map(source => source.category))] // remove all the duplicates and save to the array categories
  // Send the categories in the response
  cache.set(cacheKey, categories)
  res.json(categories);

// catch any errors 
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// store all the country names and the iso codes to be used on the frontend - country filter
app.get('/country', async (req, res) => {
  const countryOptions = {
    'Argentina': 'ar',
    'Australia': 'au',
    'Austria': 'at',
    'Belgium': 'be',
    'Brazil': 'br',
    'Bulgaria': 'bg',
    'Canada': 'ca',
    'China': 'cn',
    'Colombia': 'co',
    'Cuba': 'cu',
    'Czech Republic': 'cz',
    'Egypt': 'eg',
    'France': 'fr',
    'Germany': 'de',
    'Greece': 'gr',
    'Hong Kong': 'hk',
    'Hungary': 'hu',
    'India': 'in',
    'Indonesia': 'id',
    'Ireland': 'ie',
    'Israel': 'il',
    'Italy': 'it',
    'Japan': 'jp',
    'Latvia': 'lv',
    'Lithuania': 'lt',
    'Malaysia': 'my',
    'Mexico': 'mx',
    'Morocco': 'ma',
    'Netherlands': 'nl',
    'New Zealand': 'nz',
    'Nigeria': 'ng',
    'Norway': 'no',
    'Philippines': 'ph',
    'Poland': 'pl',
    'Portugal': 'pt',
    'Romania': 'ro',
    'Russia': 'ru',
    'Saudi Arabia': 'sa',
    'Serbia': 'rs',
    'Singapore': 'sg',
    'Slovakia': 'sk',
    'Slovenia': 'si',
    'South Africa': 'za',
    'South Korea': 'kr',
    'Sweden': 'se',
    'Switzerland': 'ch',
    'Taiwan': 'tw',
    'Thailand': 'th',
    'Turkey': 'tr',
    'Ukraine': 'ua',
    'United Arab Emirates': 'ae',
    'United Kingdom': 'gb',
    'United States': 'us',
    'Venezuela': 've'
  };
  res.json(countryOptions)
})

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));