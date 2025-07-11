"use client";
import { useState } from "react";

const ReviewForm = ({ mealId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(1);
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
            title,
            description,
            stars: parseInt(stars),
            meal_id: mealId,
          }),
        }
      );

      if (response.ok) {
        setStatus("Review submitted!");
        setTitle("");
        setDescription("");
        setStars(1);
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
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>Leave a Review</h3>
      <div>
        <label>Title:</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Stars (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          required
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </div>
      <button type="submit">Submit Review</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ReviewForm;
