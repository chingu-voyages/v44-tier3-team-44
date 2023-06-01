// set localhost port 8000 to run backend server
const PORT = 8000;

// import express
const express = require('express');
const cors = require('cors');

// import dotenv module to retrieve API_KEY from .env file
require('dotenv').config()

const app = express();
// pass json to the frontend 
app.use(express.json());
app.use(cors());

// retrieve API_KEY from .env file
const API_KEY = process.env.API_KEY

// use NodeJS Client Library to set up News API
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(API_KEY);

// Set route to /headlines to use topHeadlines endpoint 
// Language filter
app.get('/headlines', async (req, res) => {
  try {
    const language = req.query.language || 'fr' // retrieve from the body.language value set in the frontend , otherwise default to french
    const response = await newsapi.v2.topHeadlines ({
      // setting language to english for now - can let user choose later
      language: language
  });

  // Send the articles in the response
  res.json(response);

// catch any errors 
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Category filter
app.get('/category', async (req, res) => {
  try {
  const response = await newsapi.v2.sources ({
    category: 'technology',
  })
  // Send the articles in the response
  res.json(response);

// catch any errors 
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// To query sources
// All options are optional
// newsapi.v2.sources({
//   category: 'technology',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });


//To query /v2/everything
//You must include at least one q, source, or domain
// newsapi.v2.everything({
//   q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2023-05-01',
//   to: '2023-05-115',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });


app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));

// `source:${category}`
//{

//   "source:technology": {
//       "timestamp": "...",
//      "value": {....}
// },
//   "source:travel": {...}
//}