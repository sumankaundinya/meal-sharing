"use client";
import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import "./MealList.css";
const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/meals`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setMeals(data);
    } catch (error) {
      setError("Failed to fetch meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return <p>Loading meals...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  if (meals.length === 0) {
    return (
      <div>
        <h2>Meals</h2>
        <p>No meals found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Meals</h2>
      <div className="meals-grid">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsList;
