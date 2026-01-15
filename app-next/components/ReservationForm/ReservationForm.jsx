"use client";
import React, { useState } from "react";
import "./ReservationForm.css";

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
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h3 className="reservation-title">Make a Reservation</h3>

      <div className="reservation-field">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="reservation-field">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="reservation-field">
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button type="submit" className="reservation-button">
        Book Seat
      </button>

      {message && (
        <p
          className={`reservation-message ${
            message.startsWith("Error") ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ReservationForm;
