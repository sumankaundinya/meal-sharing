"use client";
import React, { useEffect, useState, useMemo } from "react";
import Meal from "./Meal";
import "./MealList.css";

const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

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

  const sortedMeals = useMemo(() => {
    if (!meals) return [];

    let sorted = [...meals];

    switch (sortBy) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "title_asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return sorted;
  }, [meals, sortBy]);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        padding: "2rem",
        borderRadius: "12px",
      }}
    >
      <h2>Meals</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search meals by title..."
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
            SEARCH
          </button>
        </div>
        <div>
          <button
            htmlFor="sort"
            style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
          >
            SORT BY
          </button>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "0.5rem" }}
          >
            <option value="">-- Select --</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Title: A to Z</option>
            <option value="title_desc">Title: Z to A</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading meals...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : sortedMeals.length === 0 ? (
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
          {sortedMeals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;
