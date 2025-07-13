"use client";
import { useEffect, useState } from "react";

const ReviewList = ({ mealId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?meal_id=${mealId}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [mealId]);

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Reviews</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {reviews.map((review, idx) => (
          <li
            key={review.id}
            style={{
              display: "flex",
              flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
              alignItems: "flex-start",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                background: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                padding: "1rem",
                minWidth: "220px",
                maxWidth: "350px",
                border: "1px solid #eee",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", color: "#ff9800" }}>
                {review.rating} stars
              </p>
              <p style={{ margin: "0.5rem 0 0 0", color: "#333" }}>
                {review.comment}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
