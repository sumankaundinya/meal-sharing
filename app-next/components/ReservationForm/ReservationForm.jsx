"use client";
import React, { useState } from "react";

const ReservationForm = ({ mealId, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number_of_guests: 1,
            meal_id: mealId,
            created_date: new Date().toISOString(),
            contact_phonenumber: phone,
            contact_name: name,
            contact_email: email,
          }),
        }
      );

      if (response.ok) {
        setMessage("Reservation successful!");
        setName("");
        setEmail("");
        setPhone("");
        if (typeof onSuccess === "function") onSuccess();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to reserve."}`);
      }
    } catch (error) {
      setMessage("Network error, please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>Make a Reservation</h3>
      <div>
        <label>Name: </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Phone: </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit">Book Seat</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ReservationForm;
