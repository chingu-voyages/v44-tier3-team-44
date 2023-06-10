import { React, useState, useEffect } from "react";
import 
{ Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem } from '@chakra-ui/react'

const CategoryFilter = () => {
  const [allArticles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategoryHeadlines = async (category) => {
    try {
      const response = await fetch(`https://what-happens.onrender.com/headlines?category=${category}`);
      setArticles(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('https://what-happens.onrender.com/category');
        setCategories(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    console.log( 'Category Articles:', allArticles ); // to write code to display the articles to the user after button is pressed
  }, [allArticles]);

  return (
    <Menu>
      <MenuButton as={Button} color='#0050C8'>
        Category Search
      </MenuButton>
      <MenuList>
        {categories.map((category, index) => (
          <MenuItem key={index} as={Button} onClick={() => getCategoryHeadlines(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategoryFilter;
