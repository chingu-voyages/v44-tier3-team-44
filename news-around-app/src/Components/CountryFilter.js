import { React, useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

const CountryFilter = () => { 

  const [countryArticles, setArticles] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);

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
    <Menu>
      <MenuButton as={Button} color='black' fontWeight='light' _hover={{ backgroundColor: '#0050C8', color: "white" }}>
        Select Country
      </MenuButton>
      <MenuList>
      {Object.entries(countryOptions).map(([key, value]) => (
        <MenuItem key={key} as={Button} _hover={{ backgroundColor: '#0050C8', color: "white" }} onClick={() => getCountryHeadlines(value)}>
          {key}
        </MenuItem>
      ))}
      </MenuList>
    </Menu>
  );

};

export default CountryFilter;