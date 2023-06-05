import { React, useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'


function CategoryFilter () { 

  // fetch the category article data
  // const [data, setData] = useState([]) // by defaault set the data to be retrieved from newsHeadline as an empty array
  // // const [category, setCategory] = useState("") // by default set category as nothing

  // const getCategoryHeadlines = async (category) => {
  //   try {
  //     const userCategory = category;
  //     const response = await fetch(`http://localhost:8000/headlines?category=${userCategory}`);
  //     setData(await response.json());
  //     console.log({data})
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // check returned data from backend
  // console.log({data})

  // const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/category'); 
  //       setCategories(await response.json());
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   getCategories();
  // }, []);

  // console.log({categories}) // prints all the unique categories 
  
  return (
    <Menu >
      <MenuButton as={Button} color='#0050C8'>
        Category Search
      </MenuButton>
      <MenuList>
        {/* {categories.map((category, index) => (
          <MenuItem key={index} as={Button} onClick={() => getCategoryHeadlines({category})}>{category.charAt(0).toUpperCase() + category.slice(1)}</MenuItem>
        ))} */}
      </MenuList>
    </Menu>
  );

};

export default CategoryFilter;