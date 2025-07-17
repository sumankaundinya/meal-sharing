"use client";
import styles from "./page.module.css";

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
  const [reviewKey, setReviewKey] = useState(0);

  const refreshReviews = () => {
    setReviewKey((prev) => prev + 1);
  };

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
      setMeal(null);
      setLoading(false);
      alert("Failed to fetch meal details. Please try again later.");
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
      }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>{meal.title}</h1>

        <div className={styles.details}>
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

        <ReviewForm mealId={meal.id} onSuccess={refreshReviews} />
        <ReviewList key={reviewKey} mealId={meal.id} />
      </div>
    </div>
  );
}
