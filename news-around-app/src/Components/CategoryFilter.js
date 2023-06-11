import { React, useState, useEffect } from "react";
import 
{ Button, 
  ButtonGroup,
  Flex
  } from '@chakra-ui/react'
  

const CategoryFilter = (getCategoryHeadlines) => {
  const [categories, setCategories] = useState([]);

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