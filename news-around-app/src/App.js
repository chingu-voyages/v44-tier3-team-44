import './App.css';
import {Box, Image, HStack, Heading} from '@chakra-ui/react'
import * as React from 'react'
import CountryFilter from './Components/CountryFilter';
import CategoryFilter from './Components/CategoryFilter';
import NewsArticle from './Components/NewsArticle';

function App() {

  return (<>
      <HStack ml='250px' spacing='24px'>
        <Box >
          <Image src="https://i.gifer.com/69QH.gif"
          boxSize='200px'
          >
          </Image>
            </Box>
            <Heading color='#0050C8' fontWeight='bold'>What Happens</Heading>
        <CategoryFilter />
        <CountryFilter />
        </HStack>
        <NewsArticle/>

</>
  )
}

export default App;
