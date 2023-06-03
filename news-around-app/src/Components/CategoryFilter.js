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

  // const [categoryArticles, setCategoryArticles] = useState([]); // set categoryArticles as an empty array by default

  // const getCategoryNews = async (language, category) => {
  //   try {
  //     //changed to headlines endpoint setting english as default language as the returned data from sources endpoint is not as useful
  //     // const language = 'en' 
  //     const response = await fetch(`http://localhost:8000/headlines?language=${language}&category=${category}`); 
  //     // save all data from from backend server retrieved from News API
  //     const categoryData = await response.json();
  //     // save all the article objects into articleData
  //     const categoryArticleData = categoryData.articles;
  //     // use the setAllArticle function to save each article object in allArticles
  //     setCategoryArticles(Object.values(categoryArticleData));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // check original article data
  // console.log({categoryArticles})

  // clean up date received from the news api get request
  // const allCategoryData = []

  //   for (let i = 0; i < categoryArticles.length; i++) {
  //     let hyphenAmount = categoryArticles[i].title.split("-").length -1
  //     let articleTitle = categoryArticles[i].title.split("-")[0]
  //     let sourceCheck = ""
  //     let author = categoryArticles[i].author
  //     let newsSource = categoryArticles[i].source["Name"]
  //     let url = categoryArticles[i].url
  //     // clean publishDate property
  //     let publishDate = categoryArticles[i].publishedAt.split("T")[0]      
  //     // check title property for more than one hyphens
  //     if (hyphenAmount > 1) {
  //       // console.log("theres more than 1 hyphen")
  //       sourceCheck = categoryArticles[i].title.split("-")[hyphenAmount]
  //       articleTitle = categoryArticles[i].title.replace(sourceCheck, '')
  //       // get the lastIndex of "-"
  //       let lastHyphenIndex = articleTitle.lastIndexOf("-")
  //       // use subString method to only save only up to the lastHyphen without the hyphen itself
  //       articleTitle = articleTitle.substring(0, lastHyphenIndex)
  //     }
  //     // some article titles include | News Source or News Type, code below to get rid of it
  //     if (articleTitle.includes("|")) {
  //       articleTitle = articleTitle.split("|")[0]
  //     }
  //     // check author property
  //     // clean up author when it is null or an empty string 
  //     if (author === null || author === "") {
  //       author = "N/A"
  //     }
  //     let categoryData = {
  //       title: articleTitle,
  //       author: author,
  //       source: newsSource, 
  //       url: url, 
  //       date: publishDate // 2023-05-16
  //     };

  //     allCategoryData.push(categoryData);
  // }

  // // check category article data after data clean up
  // console.log({allCategoryData})

  // const [uniqueCategories, setUniqueCategories] = useState([])

  // const getCategories = async () => {

  //   try {
  //     const response = await fetch('http://localhost:8000/category'); 
  //     const categories = await response.data.uniqueCategories
  //     setUniqueCategories(categories)
  //   } catch (error) {
  //     console.error(error);
  //   }y

  // };

  // getCategories()
  // console.log({uniqueCategories})
  
  return (
    <Menu >
      <MenuButton as={Button} color='#0050C8'>
        Category Search
      </MenuButton>
      <MenuList>
        {/* {getCategories().map((category, index) => (
          <MenuItem key={index} as={Button} onClick={() => getCategoryNews('en', {category})}>{category.charAt(0).touUpperCase() + category.slice(1)}</MenuItem>
        ))} */}
        {/* <MenuItem as={Button} onClick={() => getCategoryNews('en', 'business')}>Business</MenuItem>
        <MenuItem as={Button} onClick={() => getCategoryNews('en', 'entertainment')}>Entertainment</MenuItem> */}
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