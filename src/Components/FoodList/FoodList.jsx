import React, { useState } from "react";
import { foods } from "../Data/Dishes";
import FoodCard from "../FoodCard/FoodCard";
import "./FoodList.css";

export default function FoodList({ category, searchTerm }) {
  const [viewList, setviewList] = useState(6);

  // If category is "All", show all items.
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      category === "All" ||
      food.category.toLowerCase().includes(category.toLowerCase());
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Slice the foods array to show only the visible items
  const visibleFoods = filteredFoods.slice(0, viewList);

  return (
    <div className="foodList-container">
      <h2>Explore Our Dishes {category !== "All" ? `- ${category}` : ""}</h2>

      <div className="foods">
        {visibleFoods.map((food) => (
          <FoodCard
            key={food.id}
            item={food}
            onAddToCart={(item) => console.log("Add to cart:", item)}
          />
        ))}
      </div>
      {viewList < filteredFoods.length && (
        <div className="view-full-menu">
          <button onClick={() => setviewList(filteredFoods.length)}>
            View Full Menu
          </button>
        </div>
      )}
    </div>
  );
}
