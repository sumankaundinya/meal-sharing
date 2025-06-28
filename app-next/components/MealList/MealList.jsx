"use client";
import React, { useEffect, useState } from "react";

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return <p>Loading meals...</p>;
  }

  return (
    <div>
      <h2>Meals</h2>
      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        meals.map((meal) => (
          <div key={meal.id}>
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>Price: ${meal.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MealsList;
