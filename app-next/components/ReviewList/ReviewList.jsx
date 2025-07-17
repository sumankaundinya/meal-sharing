"use client";
import { useEffect, useState } from "react";
import "./ReviewList.css";

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
    <div className="review-list-container">
      <h3 className="review-list-title">Reviews</h3>
      <ul className="review-list">
        {reviews.map((review, idx) => (
          <li
            key={review.id}
            className={`review-item ${
              idx % 2 === 0 ? "row-normal" : "row-reverse"
            }`}
          >
            <div className="review-card">
              <p className="review-rating">{review.rating} stars</p>
              <p className="review-comment">{review.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
