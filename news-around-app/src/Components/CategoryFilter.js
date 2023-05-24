import { React, useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'


function CategoryFilter () { 
  
  // the code below is toe retrieve the source endpoint from NewsApi for the category filter

  const [categoryArticles, setCategoryArticles] = useState([]); // set categoryArticles as an empty array by default

  const getCategoryNews = async (category) => {
    try {
      //const category = props.categoryName
      const response = await fetch(`http://localhost:8000/category?category=${category}`);
      // save all data from from backend server retrieved from News API
      const categoryData = await response.json();
      // save all the article objects into articleData
      const categoryArticleData = categoryData.sources;
      // use the setAllArticle function to save each article object in allArticles
      setCategoryArticles(Object.values(categoryArticleData));
    } catch (error) {
      console.error(error);
    }
  };


  console.log({categoryArticles})
  return (
    <Menu >
      <MenuButton as={Button} color='#0050C8'>
        Category Search
      </MenuButton>
      <MenuList>
        <MenuItem as={Button} onClick={() => getCategoryNews('business')}>Business</MenuItem>
        <MenuItem as={Button} onClick={() => getCategoryNews('entertainment')}>Entertainment</MenuItem>
        <MenuItem as={Button}>General</MenuItem>
        <MenuItem as={Button}>Health</MenuItem>
        <MenuItem as={Button}>Science</MenuItem>
        <MenuItem as={Button}>Sports</MenuItem>
        <MenuItem as={Button}>Technology</MenuItem>
      </MenuList>
    </Menu>
  );

};

export default CategoryFilter;