import React from "react";
import MealsList from "../MealList/MealList";
import Link from "next/link";

const HomePage = () => {
  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "8px",
          padding: "1rem",
        }}
      >
        <h1>Welcome to Meal Sharing!</h1>
        <p>Discover and book delicious homemade meals near you.</p>
      </header>

      <MealsList limit={3} />

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link href="/meals">
          <button style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
            See All Meals
          </button>
        </Link>
      </div>

      <footer
        style={{
          marginTop: "4rem",
          textAlign: "center",
          borderTop: "1px solid #eee",
          paddingTop: "1rem",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "8px",
        }}
      >
        <p>&copy; {new Date().getFullYear()} Meal Sharing App</p>
      </footer>
    </div>
  );
};

export default HomePage;
