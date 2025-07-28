import React from "react";
import MealsList from "../MealList/MealList";
import Link from "next/link";
import styles from "./HomePage.module.css";

const HomePage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, {
    cache: "no-store", // always gets fresh data
  });

  const allMeals = await res.json();
  const topThreeMeals = allMeals.slice(0, 3);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to Meal Sharing!</h1>
        <p>Discover and book delicious homemade meals near you.</p>
      </header>

      <MealsList meals={topThreeMeals} />

      <div className={styles.seeAllMeals}>
        <Link href="/meals">
          <button className={styles.seeAllMealsButton}>See All Meals</button>
        </Link>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="mailto:info@mealsharing.com">Email</a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="tel:+1234567890">Telephone</a>
          <p>&copy; {new Date().getFullYear()} Meal Sharing App</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
