import React from "react";
import MealsList from "../MealList/MealList";
import Link from "next/link";

const HomePage = () => {
  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundImage: `url("https://images.unsplash.com/photo-1606787366850-de6330128bfc")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowY: "auto",
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
        <div style={{ marginTop: "1rem" }}>
          <a href="mailto:info@mealsharing.com" style={{ margin: "0 1rem" }}>
            Email
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 1rem" }}
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 1rem" }}
          >
            LinkedIn
          </a>
          <a href="tel:+1234567890" style={{ margin: "0 1rem" }}>
            Telephone
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
