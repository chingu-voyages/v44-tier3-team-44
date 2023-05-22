import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'


function CountryFilter () {            
  return (
    <Menu>
      <MenuButton as={Button} color='#0050C8'>
        Country Search
      </MenuButton>
      <MenuList>
        <MenuItem>United Arab Emirates</MenuItem>
        <MenuItem>Argentina</MenuItem>
        <MenuItem>Austria</MenuItem>
        <MenuItem>Australia</MenuItem>
        <MenuItem>Belgium</MenuItem>
      </MenuList>
    </Menu>
  );

};

export default CountryFilter;