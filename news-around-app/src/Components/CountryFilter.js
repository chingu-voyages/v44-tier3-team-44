import { React, useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons';

const CountryFilter = ({getCountryHeadlines}) => {

  const [countryOptions, setCountryOptions] = useState([]);

  const getCountryOptions = async () => {
    try {
      const response = await fetch("https://what-happens.onrender.com/country");
      setCountryOptions(await response.json());
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <Menu>
      <MenuButton as={Button} color='black' fontWeight='light' _hover={{ backgroundColor: '#0050C8', color: "white" }} rightIcon={<ChevronDownIcon />}>
        Select Country
      </MenuButton>
      <MenuList maxHeight='400px' overflow='scroll'>
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