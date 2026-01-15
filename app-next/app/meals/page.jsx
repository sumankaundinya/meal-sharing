"use client";
import { useEffect, useState, useMemo } from "react";
import MealList from "@/components/MealList/MealList";
import AIRecommendations from "@/components/AIRecommendations/AIRecommendations";
import styles from "./page.module.css";
import Link from "next/link";

export default function AllMealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);
  // Example user preferences
  const userPreferences = {
    dietary: "Indian",
    favoriteCuisine: "Indian",
    includeIngredients: ["paneer", "chicken", "naan"],
    avoidIngredients: ["pasta", "cheese", "beef"],
  };

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

  // Filter and sort meals based on search and sort controls
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

  // Generate recommendations
  const recommendedMeals = useMemo(() => {
    if (!meals || meals.length === 0) return [];

    return meals.filter((meal) => {
      const title = meal.title.toLowerCase();
      const description = meal.description.toLowerCase();

      const dietaryMatch =
        userPreferences.dietary &&
        (title.includes(userPreferences.dietary.toLowerCase()) ||
          description.includes(userPreferences.dietary.toLowerCase()));

      const cuisineMatch =
        userPreferences.favoriteCuisine &&
        (title.includes(userPreferences.favoriteCuisine.toLowerCase()) ||
          description.includes(userPreferences.favoriteCuisine.toLowerCase()));

      const includeMatch = userPreferences.includeIngredients
        ? userPreferences.includeIngredients.some((ing) =>
            description.includes(ing.toLowerCase())
          )
        : true;

      const avoidMatch = userPreferences.avoidIngredients
        ? !userPreferences.avoidIngredients.some((ing) =>
            description.includes(ing.toLowerCase())
          )
        : true;

      return (dietaryMatch || cuisineMatch) && includeMatch && avoidMatch;
    });
  }, [meals, userPreferences]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Meals</h1>

      {/* AI Recommendations - only show after meals are loaded */}
      {!loading && recommendedMeals.length > 0 && (
        <div className={styles.aiContainer}>
          <AIRecommendations
            meals={recommendedMeals}
            userPreferences={userPreferences}
          />
        </div>
      )}

      <div className={styles.controls}>
        {userRole === "host" && (
          <Link href="/add-meal" className="button">
            Add a Meal
          </Link>
        )}

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
