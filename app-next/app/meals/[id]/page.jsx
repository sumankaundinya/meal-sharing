"use client";
import styles from "./Page.module.css";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ReservationForm from "@/components/ReservationForm/ReservationForm";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import ReviewList from "@/components/ReviewList/ReviewList";

export const dynamic = "force-dynamic";

export default function MealDetailPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);

  const fetchMeal = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/meals/${id}`
      );
      const data = await res.json();
      const booked = data.reservations?.length || 0;
      setMeal({ ...data, booked });
      setAvailable(data.max_reservations > booked);
    } catch (err) {
      console.error("Failed to fetch meal:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMeal();
  }, [fetchMeal]);

  if (loading) return <p>Loading meal...</p>;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={styles.overlay}
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          margin: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className={styles.title} style={{ textAlign: "center" }}>
          {meal.title}
        </h1>
        <div
          className={styles.details}
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <p>{meal.description}</p>
          <p>
            <strong>Price:</strong> ${meal.price}
          </p>
          <p>
            <strong>Location:</strong> {meal.location}
          </p>
          <p>
            <strong>Date:</strong> {new Date(meal.when_date).toLocaleString()}
          </p>
          <p>
            <strong>Max guests:</strong> {meal.max_reservations}
          </p>
          <p>
            <strong>Booked:</strong> {meal.booked}
          </p>
        </div>

        {available ? (
          <ReservationForm mealId={meal.id} onSuccess={fetchMeal} />
        ) : (
          <p className={styles.noAvailable}>No available reservations</p>
        )}

        <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
          Reviews
        </h2>
        <ReviewForm
          mealId={meal.id}
          onSuccess={() => window.location.reload()}
        />
        <ReviewList mealId={meal.id} />
      </div>
    </div>
  );
}
