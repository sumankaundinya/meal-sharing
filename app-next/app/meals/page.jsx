"use client";
import { useEffect, useState, useMemo } from "react";
import MealList from "@/components/MealList/MealList";
import styles from "./page.module.css";

export default function AllMealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`);
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        setError("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredAndSortedMeals = useMemo(() => {
    let filtered = meals.filter((meal) =>
      meal.title.toLowerCase().includes(searchText.toLowerCase())
    );

    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "title_asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [meals, searchText, sortBy]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Meals</h1>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search meals by title..."
          />
        </div>

        <div className={styles.sortBox}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
      ) : (
        <MealList meals={filteredAndSortedMeals} />
      )}
    </div>
  );
}
