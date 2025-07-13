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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Make a Reservation
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label htmlFor="name" style={{ fontWeight: "500", color: "#555" }}>
          Name:
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label htmlFor="email" style={{ fontWeight: "500", color: "#555" }}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label htmlFor="phone" style={{ fontWeight: "500", color: "#555" }}>
          Phone:
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "0.8rem",
          borderRadius: "4px",
          border: "none",
          background: "#0070f3",
          color: "#fff",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Book Seat
      </button>
      {message && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: message.startsWith("Error") ? "#d32f2f" : "#388e3c",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ReservationForm;
