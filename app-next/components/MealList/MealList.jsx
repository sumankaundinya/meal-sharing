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
    <div className="meals-container">
      <h2>Meals</h2>

      <div className="meals-header">
        <div className="search-box">
          <button onClick={handleSearch}> SEARCH </button>

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search meals by title..."
          />
        </div>

        <div className="sort-box">
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">-- Sort By --</option>
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
        <div className="meals-grid">
          {sortedMeals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;
