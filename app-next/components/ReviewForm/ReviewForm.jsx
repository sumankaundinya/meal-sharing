"use client";
import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "2rem",
        maxWidth: "400px",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#333" }}>
        Leave a Review
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="comment" style={{ fontWeight: 500, color: "#444" }}>
          Comment:
        </label>
        <textarea
          id="comment"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            resize: "vertical",
            minHeight: "60px",
            padding: "0.7rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="rating" style={{ fontWeight: 500, color: "#444" }}>
          Stars (1-5):
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            width: "80px",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "0.8rem",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Submit Review
      </button>
      {status && (
        <p
          style={{
            margin: 0,
            color:
              status.startsWith("Error") || status.startsWith("Network")
                ? "#d32f2f"
                : "#388e3c",
            fontWeight: 500,
          }}
        >
          {status}
        </p>
      )}
    </form>
  );
};

export default ReviewForm;
