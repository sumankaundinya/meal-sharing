"use client";
import React from "react";
import Link from "next/link";
import "./Meal.css";

const getImageForMeal = (title) => {
  const map = {
    "Italian Pasta Night": "pasta.jpg",
    "Taco Fiesta": "tacos.webp",
    "Backyard BBQ Bash": "bbq.jpg",
    "Vegan Soul Feast": "vegan.webp",
    "Sushi & Sake Night": "sushi.jpg",
    "Pizza & Wine Evening": "pizza.webp",
    "Mediterranean Magic": "mediterranean.jpg",
    "Nordic Seafood Night": "seafood.jpg",
    "French Bistro Delight": "french.webp",
    "Indian Curry Feast": "indian.jpg",
  };

  return `/images/meals/${map[title] || "default.jpg"}`;
};

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <img
        src={getImageForMeal(meal.title)}
        alt={meal.title}
        className="meal-image"
        style={{
          width: "100%",
          height: "auto",
          marginBottom: "1rem",
          borderRadius: "8px",
        }}
      />
      <h3>
        <Link href={`/meals/${meal.id}`}>{meal.title}</Link>
      </h3>
      <p>{meal.description}</p>
      <p>
        <strong>Price:</strong> ${meal.price}
      </p>
      <p>
        <strong>Location:</strong> {meal.location}
      </p>
      <p>
        <strong>When:</strong> {new Date(meal.when_date).toLocaleString()}
      </p>
      <p>
        <strong>Max guests:</strong> {meal.max_reservations}
      </p>
    </div>
  );
};

export default Meal;
