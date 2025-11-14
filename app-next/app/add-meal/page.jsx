"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function AddMealPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    when_date: "",
    max_reservations: "",
    price: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingAIImage, setLoadingAIImage] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // AI Description
  const handleGenerateDescription = async () => {
    if (!form.title) return alert("Please enter a meal title first!");

    setLoadingAI(true);
    setMessage("✨ Generating AI description...");
    setIsError(false);

    try {
      const res = await fetch("/api/ai-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title }),
      });

      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, description: data.description }));
        setMessage("✅ AI description generated!");
      } else {
        setMessage("❌ Failed to generate AI description");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ AI description request failed");
      setIsError(true);
    } finally {
      setLoadingAI(false);
    }
  };

  // AI Image
  const handleGenerateAIImage = async () => {
    if (!form.title) return alert("Please enter a meal title first!");

    setLoadingAIImage(true);
    setMessage("✨ Generating AI image...");
    setIsError(false);

    try {
      const res = await fetch("/api/ai-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title }),
      });

      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image_url: data.url }));
        setMessage("✅ AI image generated!");
      } else {
        setMessage("❌ Failed to generate AI image");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ AI image request failed");
      setIsError(true);
    } finally {
      setLoadingAIImage(false);
    }
  };

  // Manual Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("Uploading image...");
    setIsError(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image_url: data.url }));
        setMessage("✅ Image uploaded successfully!");
      } else {
        setMessage(`❌ Image upload failed: ${data.error || "Unknown error"}`);
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload error");
      setIsError(true);
    } finally {
      setUploading(false);
    }
  };

  // Submit Meal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Adding meal...");
    setIsError(false);

    const host_id = localStorage.getItem("userId"); // get host id from login
    if (!host_id) {
      setMessage("❌ You must be logged in to add a meal");
      setIsError(true);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, host_id }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Meal added successfully (ID: ${data.id})`);
        // reset form
        setForm({
          title: "",
          description: "",
          location: "",
          when_date: "",
          max_reservations: "",
          price: "",
          image_url: "",
        });

        // Redirect to host dashboard
        setTimeout(() => {
          window.location.href = "/host-dashboard";
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.error}`);
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to connect to the server");
      setIsError(true);
    }
  };

  return (
    <div className={styles.addMealContainer}>
      <h2>Add a New Meal</h2>
      <form onSubmit={handleSubmit} className={styles.addMealForm}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <div className={styles.aiDescriptionContainer}>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleGenerateDescription}
            disabled={loadingAI}
          >
            {loadingAI ? "Generating..." : "✨ Generate Description"}
          </button>
        </div>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="when_date"
          type="datetime-local"
          value={form.when_date}
          onChange={handleChange}
          required
        />
        <input
          name="max_reservations"
          type="number"
          placeholder="Max Reservations"
          value={form.max_reservations}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <div className={styles.aiImageContainer}>
          <button
            type="button"
            onClick={handleGenerateAIImage}
            disabled={loadingAIImage}
          >
            {loadingAIImage ? "Generating Image..." : "✨ Generate AI Image"}
          </button>
        </div>

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.image_url && (
          <img
            src={form.image_url}
            alt="Meal preview"
            width="200"
            style={{ marginTop: 10, borderRadius: 8 }}
          />
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Meal"}
        </button>
      </form>

      {message && (
        <p
          className={`${styles.addMealMessage} ${
            isError
              ? styles.error
              : message.startsWith("✅")
              ? styles.success
              : ""
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
