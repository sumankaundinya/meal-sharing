"use client";
import React from "react";
import Link from "next/link";
import "./Meal.css";

const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
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
        <strong>When:</strong> {new Date(meal.when).toLocaleString()}
      </p>
      <p>
        <strong>Max guests:</strong> {meal.max_reservations}
      </p>
    </div>
  );
};

export default Meal;
