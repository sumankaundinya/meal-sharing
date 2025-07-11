"use client";
import React, { useEffect, useState } from "react";
import Meal from "./Meal";
import "./MealList.css";

const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const fetchMeals = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/meals`;
      if (query) {
        url += `?title=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMeals(limit ? data.slice(0, limit) : data);
    } catch (error) {
      setError("Failed to fetch meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [query, limit]);

  const handleSearch = () => {
    setQuery(searchText.trim());
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        padding: "2rem",
        borderRadius: "12px",
      }}
    >
      <h2>Meals</h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search meals by title..."
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading meals...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div
          className="meals-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;
