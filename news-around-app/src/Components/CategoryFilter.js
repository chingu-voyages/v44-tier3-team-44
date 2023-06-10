import { React, useState, useEffect } from "react";
import 
{ Button, 
  ButtonGroup,
  Flex
  } from '@chakra-ui/react'
  

const CategoryFilter = () => {
  const [allArticles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategoryHeadlines = async (category) => {
    try {
      const response = await fetch(`http://localhost:8000/headlines?category=${category}`);
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

  useEffect(() => {
    console.log( 'Category Articles:', allArticles ); // to write code to display the articles to the user after button is pressed
  }, [allArticles]);

  return (
    <Flex justifyContent="center">
      <ButtonGroup
        spacing={{ base: 1, md: 4, lg: 6 }}
        wrap={{ base: 'wrap', md: 'nowrap' }}
        overflowX="auto"
        width="100%"
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            color="black"
            fontWeight="light"
            _hover={{ backgroundColor: '#0050C8', color: 'white' }}
            onClick={() => getCategoryHeadlines(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </Flex>
  );
};

export default CategoryFilter;


/**
 <Menu>
      <MenuButton as={Button} color='black' fontWeight='light'>
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
*/