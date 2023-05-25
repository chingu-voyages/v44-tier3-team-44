import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem
// } from '@chakra-ui/react'

const API_KEY = process.env.REACT_APP_API_KEY;


  const CountryFilter = ({selectedCountry, setSelectedCountry}) => {
    const handleCountryChange = (e) => {
      setSelectedCountry(e.target.value)
    }
    const [country, setCountry] = useState([]);
    // const handleCountryChange = (e) => {
    //   // setSelectedCountry(e.target.value);
    // };
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`
          );
          const data = await response.json();
          // setNews(data.articles);
          let countryList = []
          data.sources.forEach(element => {
            if (!countryList.includes(element.country)){
              countryList.push(element.country)
            }
          })
          console.log(countryList)
          setCountry(countryList)
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };
    
      fetchCountries(); 
  })          
  return (
    <select value={selectedCountry} onChange={handleCountryChange}>
      {country.map((country) => {
        <option>{country}</option>
      })}
    </select>
  );

};

export default CountryFilter;