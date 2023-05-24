import React from "react";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <select value={selectedCategory} onChange={handleCategoryChange}>
      <option value="">All Categories</option>
      <option value="business">Business</option>
      <option value="entertainment">Entertainment</option>
      <option value="health">Health</option>
      <option value="science">Science</option>
      <option value="sports">Sports</option>
      <option value="technology">Technology</option>
    </select>
  );
};

export default CategoryFilter;
