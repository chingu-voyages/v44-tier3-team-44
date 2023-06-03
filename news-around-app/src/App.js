
import './App.css';
import {Box, Image, HStack, Heading} from '@chakra-ui/react'
import * as React from 'react'
import { useEffect } from 'react'
import CountryFilter from './Components/CountryFilter';
import CategoryFilter from './Components/CategoryFilter';
import NewsArticle from './Components/NewsArticle';

function App() {

  // Save user's preferred browser language in usrlang
  let usrlang = navigator.languages[0];
  if (usrlang.includes("-")) {
    usrlang = usrlang.split("-")[0]
  }
  console.log(usrlang); 

  // this part is for the newsHeadline api endoint 
  let data = [] // this allows data from the headlines endpoint to be stored globally

  useEffect(() => {
    const getHeadlines = async () => {
      try {
        const language = usrlang;
        const response = await fetch(`http://localhost:8000/headlines?language=${language}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getHeadlines();
  }, [usrlang]);

  console.log(data)

  return (
    <>
      <HStack ml='250px' spacing='24px'>
        <Box >
          <Image src="https://i.gifer.com/69QH.gif"
          boxSize='200px'
          >
          </Image>
            </Box>
            <Heading color='#0050C8' fontWeight='bold'>What Happens</Heading>
        <CategoryFilter/>
        <CountryFilter />
        </HStack>
        {/* <NewsArticle title={allArticleData[0]?.title} author={allArticleData[0]?.author}/> */}

</>
  );
}


export default App;
