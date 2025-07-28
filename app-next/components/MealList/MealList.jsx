// components/MealList/MealList.jsx
"use client";
import React from "react";
import Meal from "./Meal";
import "./MealList.css";

const MealList = ({ meals }) => {
  if (!meals || meals.length === 0) {
    return <p>No meals found.</p>;
  }

  return (
    <div className="meals-grid">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealList;
