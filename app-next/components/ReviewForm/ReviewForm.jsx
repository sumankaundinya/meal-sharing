"use client";
import { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ mealId, onSuccess }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meal_id: mealId,
            rating: parseInt(rating),
            comment,
          }),
        }
      );

      if (response.ok) {
        setStatus("Review submitted!");
        setComment("");
        setRating(1);
        if (onSuccess) onSuccess();
      } else {
        const err = await response.json();
        setStatus(`Error: ${err.message || "Could not submit review."}`);
      }
    } catch (err) {
      setStatus("Network error. Try again later.");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-title">Leave a Review</h3>

      <div className="review-field">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="review-field">
        <label htmlFor="rating">Stars (1-5):</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <button type="submit" className="review-button">
        Submit Review
      </button>

      {status && (
        <p
          className={`review-status ${
            status.startsWith("Error") || status.startsWith("Network")
              ? "error"
              : "success"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
};

export default ReviewForm;
