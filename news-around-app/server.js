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
  const response = await newsapi.v2.topHeadlines ({
    // setting language to english for now - can let user choose later
    // probably use an dictionary method to retrieve the right value to put back into the API
    language: 'en'
  })

  // Send the articles in the response
  res.json(response);

// catch any errors 
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// To create Category filter route

//News Api node.js client library examples

// newsapi.v2.topHeadlines({
// //   sources: 'bbc-news,the-verge',
// //   q: 'bitcoin',
// //   category: 'business',
//   language: 'en',
// //   country: 'us'

// // use a call back function to get articles from topHeadlines News API
// }).then(response => {
//   // const articles = response.articles;
//   console.log(response);
// });


// const articles = response[articles]
// console.log(articles)

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


app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));