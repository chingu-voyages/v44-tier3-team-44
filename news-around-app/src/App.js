import './App.css';
import './index.css'
import {Box, Image, VStack, HStack, Heading} from '@chakra-ui/react'
import * as React from 'react'
import { useState, useEffect } from 'react'
import CountryFilter from './Components/CountryFilter';
import CategoryFilter from './Components/CategoryFilter';
import NewsArticle from './Components/NewsArticle';
import Footer from './Components/Footer';

function App() {

  // Save user's preferred browser language in usrlang
  let usrlang = navigator.languages[0];
  if (usrlang.includes("-")) {
    usrlang = usrlang.split("-")[0]
  }
  // check user's language
  // console.log(usrlang); 

  // this part is for the newsHeadline api endoint 
  const [allArticles, setAllArticles] = useState([]) // by defaault set allArticles to be retrieved from newsHeadline as an empty array
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countryArticles, setArticles] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const getCategoryHeadlines = async (category) => {
    try {
      const response = await fetch(`http://localhost:8000/headlines?category=${category}`);
      setCategoryArticles(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/category');
        setCategories(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    console.log( 'Category Articles:', categoryArticles ); // to write code to display the articles to the user after button is pressed
  }, [categoryArticles]);

  useEffect(() => {
    const getHeadlines = async () => {
      try {
        const language = usrlang;
        const response = await fetch(`http://localhost:8000/headlines?language=${language}`);
        setAllArticles(await response.json());
      } catch (error) {
        console.error(error);
      }
    };
  
    getHeadlines();
  }, [usrlang]);

  // check returned data from backend
  // console.log({allArticles});
  
  const getCountryOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/country");
      setCountryOptions(await response.json());
    } catch (error) {
      console.error(error);
    }
  } 

  const getCountryHeadlines = async (country) => {
    try {
      const response = await fetch(`http://localhost:8000/headlines?country=${country}`);
      setArticles(await response.json());
    } catch (error) {
      console.error(error);
    }
  } 
  
  useEffect(() => {
    console.log( 'Country Articles:', countryArticles ); // to write code to display the articles to the user after button is pressed
  }, [countryArticles]);

  useEffect(() => {
    getCountryOptions()
  }, []); // call the Country Options automically when the App renders


  return (
    <>
      <VStack ml={{ base: 0, md: '250px' }} spacing={{ base: 4, md: 4 }} 
       >
        <Box  width="20%" height="auto" maxHeight="400px" >
          <Image src="https://media.discordapp.net/attachments/1101934137029435533/1113442514104483840/What_Happens_logo.png?width=936&height=936"
           boxSize={{ base: '150px', md: '150px' }}
           marginLeft={-16}
            objectFit="contain"
            alt="News Logo"
          
          >
          </Image>
        </Box>
        <Box top="100px" transform="translate(-15%, -50%)" zIndex={9999}>
            <HStack spacing={2}>
              <CategoryFilter getCategoryHeadlines={getCategoryHeadlines} />
              <CountryFilter />
            </HStack>
        </Box>
        <Box width="100%" textAlign="left">
          <Heading color="#0050C8" fontWeight="bold" marginBottom={10}> 
            Breaking News
          </Heading>
        </Box>
      </VStack>
      <NewsArticle allArticles={allArticles} categoryArticles={categoryArticles} getCategoryHeadlines={getCategoryHeadlines} getCountryHeadlines={getCountryHeadlines} />
      <Footer/>

        

</>
  );
}

//title={allArticles.title} author={allArticles.author} source={allArticles.source}/>
// <Heading color='#0050C8' fontWeight='bold' paddingLeft={paddingLeft} marginBottom={10}>Breaking News</Heading>
//<NewsArticle allArticles={allArticles}/>

export default App;

/**
 *  <Image src="https://i.gifer.com/69QH.gif"
          boxSize='200px'
          >
          </Image>
            </Box>
            <Heading color='#0050C8' fontWeight='bold'>What Happens</Heading>
 */
