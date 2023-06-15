import { React, useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

const CountryFilter = ({getCountryHeadlines}) => {

  const [countryOptions, setCountryOptions] = useState([]);
  
  useEffect(() => {
    const getCountryOptions = async () => {
      try {
        const response = await fetch("http://localhost:8000/country");
        setCountryOptions(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
    getCountryOptions();
  }, []);

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