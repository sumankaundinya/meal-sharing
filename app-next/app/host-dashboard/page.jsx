"use client";
import { useEffect, useState } from "react";

export default function HostDashboard() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("userName");

    if (!id || role !== "host") {
      window.location.href = "/";
      return;
    }

    setUser({ id, role, name });

    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/meals/host/${id}`
        );
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👨‍🍳 {user?.name}'s Host Dashboard</h1>
      <p>Manage your hosted meals below.</p>

      {meals.length === 0 ? (
        <p>You haven’t hosted any meals yet.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id}>
              <strong>{meal.title}</strong> — {meal.location}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => (window.location.href = "/add-meal")}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          background: "teal",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        ➕ Add New Meal
      </button>
    </div>
  );
}
