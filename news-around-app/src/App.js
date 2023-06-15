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
  const [articles, setArticles] = useState([]) // by defaault set allArticles to be retrieved from newsHeadline as an empty array

  // 0. Initially you were using multiple states to keep track of data from different sources
  // 1. on initial render the data would come from getHeadlines, and go into allArticles
  // 2. when the user clicked a category you would would fetch new data with getCategoryHeadlines, and it would go into categoryArticles
  // 3. Your NewsArticle component needed to decide on which data to show. This isn't a responsibility that this component should have
  // 4. The update gets rid of different states for the articles data, and consolidates the state into one called "articles".
  // 5. articles is set to different values depending on how the user interacts with the app. The NewsArticle component is then made simpler
  // and only focuses on rendering articles without caring or even knowing where they come from.

  const getCategoryHeadlines = async (category) => {
    try {
      const response = await fetch(`http://localhost:8000/headlines?category=${category}`);
      setArticles(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getHeadlines = async () => {

      console.log("called get headlines")

      try {
        const language = usrlang;
        const response = await fetch(`http://localhost:8000/headlines?language=${language}`);
        setArticles(await response.json());
      } catch (error) {
        console.error(error);
      }
    };

    getHeadlines();
  }, [usrlang]);

  const getCountryHeadlines = async (country) => {
    try {
      const response = await fetch(`http://localhost:8000/headlines?country=${country}`);
      setArticles(await response.json());
    } catch (error) {
      console.error(error);
    }
  } 


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
              <CountryFilter getCountryHeadlines={getCountryHeadlines} />
            </HStack>
        </Box>
        <Box width="100%" textAlign="left">
          <Heading color="#0050C8" fontWeight="bold" marginBottom={10}> 
            Breaking News
          </Heading>
        </Box>
      </VStack>
      <NewsArticle articles={articles} />
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
