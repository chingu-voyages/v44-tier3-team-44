import { React, useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'


const CountryFilter = () => { 

  const [allArticles, setArticles] = useState([]);

  const [countryDict, setCountryInfo] = useState([]);

  const getCountryInfo = async () => {
    try {
      const response = await fetch("http://localhost:8000/country");
      setCountryInfo(await response.json());
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
    console.log( 'Country Articles:', allArticles ); // to write code to display the articles to the user after button is pressed
  }, [allArticles]);

  useEffect(() => {
    getCountryInfo()
  }, []);

  return (
    <Menu>
      <MenuButton as={Button} color='#0050C8'>
        Country Search
      </MenuButton>
      <MenuList>
      {Object.entries(countryDict).map(([key, value]) => (
        <MenuItem key={key} as={Button} onClick={() => getCountryHeadlines(value)}>
          {key}
        </MenuItem>
      ))}
      </MenuList>
    </Menu>
  );

};

export default CountryFilter;