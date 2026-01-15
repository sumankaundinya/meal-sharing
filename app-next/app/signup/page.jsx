"use client";
import { useState } from "react";
import styles from "./Signup.module.css";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker", // default role
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    setMessage(data.message || "Something went wrong");

    if (res.ok) {
      // redirect to login page after successful signup
      setTimeout(() => router.push("/login"), 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
            className={styles.input}
          />

          <select
            name="role" // Role Selector
            value={formData.role}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="seeker">Meal Seeker</option>
            <option value="host">Meal Host</option>
          </select>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
