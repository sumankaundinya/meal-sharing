"use client";
import { useState } from "react";
import MealList from "@/components/MealList/MealList"; // Ensure the path is correct
import styles from "./AIRecommendations.module.css";

export default function AIRecommendations({ meals, userPreferences }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to check if a meal matches user preferences
  const filterMealsLocally = (allMeals, preferences) => {
    // Convert preferences to lowercase for case-insensitive matching
    const preferredDietary = preferences.dietary?.toLowerCase() || "";
    const preferredCuisine = preferences.favoriteCuisine?.toLowerCase() || "";

    // Create lowercase sets/arrays for easy checking
    const include =
      preferences.includeIngredients?.map((i) => i.toLowerCase()) || [];
    const avoid =
      preferences.avoidIngredients?.map((i) => i.toLowerCase()) || [];

    return allMeals.filter((meal) => {
      // Use a combined searchable string from title and description
      const searchableText = `${meal.title} ${meal.description}`.toLowerCase();

      // --- 1. Check Dietary/Cuisine Match ---
      // Match if the meal text contains the dietary or cuisine preference (if they exist)
      const matchesDietaryOrCuisine =
        preferredDietary || preferredCuisine
          ? searchableText.includes(preferredDietary) ||
            searchableText.includes(preferredCuisine)
          : true; // If no preference is set, this condition is always true

      // --- 2. Check Required Ingredients ---
      // Must include ALL ingredients in the 'include' list (if the list is not empty)
      const includesRequired =
        include.length > 0
          ? include.every((ing) => searchableText.includes(ing))
          : true;

      // --- 3. Check Forbidden Ingredients ---
      // Must NOT include ANY ingredient in the 'avoid' list
      const avoidsForbidden =
        avoid.length > 0
          ? !avoid.some((ing) => searchableText.includes(ing))
          : true;

      // The meal must satisfy all conditions
      return matchesDietaryOrCuisine && includesRequired && avoidsForbidden;
    });
  };

  const fetchRecommendations = async () => {
    setLoading(true);

    try {
      // --- 1. Attempt to call AI API ---
      const res = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meals, userPreferences }),
      });

      const data = await res.json();

      // Match meals based on AI response (assuming the AI returns an array of meal titles)
      let aiMeals = meals.filter((meal) =>
        data.recommendations?.some((rec) => rec.title === meal.title)
      );

      // --- 2. Fallback Logic Improvement ---
      if (!aiMeals.length) {
        console.log(
          "AI failed or returned no matches. Falling back to local filtering."
        );
        aiMeals = filterMealsLocally(meals, userPreferences);
      }

      // --- 3. Final Fallback ---
      // Only show top 3 if local filtering ALSO fails to find anything.
      setRecommendations(
        aiMeals.length > 0 ? aiMeals.slice(0, 3) : meals.slice(0, 3)
      );
    } catch (err) {
      console.error("AI recommendations failed:", err);
      // If API call fails entirely, immediately run local filter instead of defaulting to slice(0, 3)
      const locallyFiltered = filterMealsLocally(meals, userPreferences);
      setRecommendations(
        locallyFiltered.length > 0
          ? locallyFiltered.slice(0, 3)
          : meals.slice(0, 3)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* ... (rest of the component remains the same) ... */}
      <button
        className={styles.button}
        onClick={fetchRecommendations}
        disabled={loading}
      >
        {loading ? "Generating..." : "Get AI Recommendations"}
      </button>

      {recommendations.length > 0 && (
        <div>
          <h3 className={styles.heading}>Recommended for you:</h3>
          <MealList meals={recommendations} />
        </div>
      )}
    </div>
  );
}
