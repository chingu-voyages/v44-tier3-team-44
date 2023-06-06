import { React, useState, useEffect } from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

function CategoryFilter() {
  const [allArticles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategoryHeadlines = async (category) => {
    try {
      const userCategory = category;
      const response = await fetch(`http://localhost:8000/headlines?category=${userCategory}`);
      setArticles(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/category');
        setCategories(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, []);

  console.log({ categories });

  useEffect(() => {
    console.log({ allArticles });
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
