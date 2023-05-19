import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'


function CategoryFilter () {            
  return (
    <Menu >
      <MenuButton as={Button} color='#4961FF'>
        Category Search
      </MenuButton>
      <MenuList>
        <MenuItem>Business</MenuItem>
        <MenuItem>Entertainment</MenuItem>
        <MenuItem>General</MenuItem>
        <MenuItem>Health</MenuItem>
        <MenuItem>Science</MenuItem>
        <MenuItem>Sports</MenuItem>
        <MenuItem>Technology</MenuItem>
      </MenuList>
    </Menu>
  );

};

export default CategoryFilter;