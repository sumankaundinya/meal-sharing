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
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} style={{ marginBottom: "1rem" }}>
            <strong>{review.title}</strong> ({review.stars} stars)
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
