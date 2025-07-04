"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ReservationForm from "@/components/ReservationForm/ReservationForm";

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
    <div style={{ padding: "2rem" }}>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p>
        <strong>Price:</strong> ${meal.price}
      </p>
      <p>
        <strong>Location:</strong> {meal.location}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {meal.when_date ? new Date(meal.when_date).toLocaleString() : "N/A"}
      </p>
      <p>
        <strong>Max guests:</strong> {meal.max_reservations}
      </p>
      <p>
        <strong>Booked:</strong> {meal.booked}
      </p>

      {available ? (
        <ReservationForm mealId={meal.id} onSuccess={fetchMeal} />
      ) : (
        <p style={{ color: "red" }}>No available reservations</p>
      )}
    </div>
  );
}
