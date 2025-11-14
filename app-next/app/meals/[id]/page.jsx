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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    when_date: "",
    max_reservations: "",
    price: "",
  });

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
      setFormData({
        title: data.title,
        description: data.description,
        location: data.location,
        when_date: data.when_date.split("T")[0], // keep only date part
        max_reservations: data.max_reservations,
        price: data.price,
      });

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
    <div className={styles.container}>
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
        {isEditing && (
          <form
            className={styles.editForm}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/meals/${meal.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  }
                );
                if (res.ok) {
                  alert("Meal updated successfully!");
                  setIsEditing(false);
                  fetchMeal(); // refresh meal details
                } else {
                  alert("Failed to update meal.");
                }
              } catch (err) {
                console.error("Error updating meal:", err);
                alert("Error updating meal.");
              }
            }}
          >
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <label>Location:</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            <label>Date:</label>
            <input
              type="date"
              value={formData.when_date}
              onChange={(e) =>
                setFormData({ ...formData, when_date: e.target.value })
              }
            />

            <label>Max Reservations:</label>
            <input
              type="number"
              value={formData.max_reservations}
              onChange={(e) =>
                setFormData({ ...formData, max_reservations: e.target.value })
              }
            />

            <label>Price:</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <button type="submit" className={styles.saveButton}>
              💾 Save Changes
            </button>
          </form>
        )}

        <div className={styles.actions}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={styles.editButton}
          >
            {isEditing ? "Cancel Edit" : "✏️ Edit Meal"}
          </button>

          <button
            onClick={async () => {
              if (confirm("Are you sure you want to delete this meal?")) {
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/meals/${meal.id}`,
                    { method: "DELETE" }
                  );
                  if (res.ok) {
                    alert("Meal deleted successfully!");
                    window.location.href = "/";
                  } else {
                    alert("Failed to delete meal.");
                  }
                } catch (error) {
                  console.error("Error deleting meal:", error);
                  alert("Error deleting meal.");
                }
              }
            }}
            className={styles.deleteButton}
          >
            🗑️ Delete Meal
          </button>
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
