import "dotenv/config";
import express from "express";
import cors from "cors";
import mealsRouter from "./routers/meals.js";
import uploadRouter from "./routers/upload.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";
import authRouter from "./routers/auth.js";
import knex from "./database_client.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mealsharing-app-next.onrender.com",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/reviews", reviewsRouter);

// Simple root route
app.get("/", (req, res) => {
  res.send("Meal Sharing API is running!");
});

// Utility routes for testing meals (optional)
app.get("/future-meals", async (req, res) => {
  try {
    const [meals] = await knex.raw(
      "SELECT * FROM Meal WHERE `when_date` > NOW()"
    );
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No future meals found." });
    }
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/past-meals", async (req, res) => {
  try {
    const [meals] = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/all-meals", async (req, res) => {
  try {
    const [meals] = await knex.raw("SELECT * FROM Meal ORDER BY id");
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const [meals] = await knex.raw(
      "SELECT * FROM Meal ORDER BY id ASC LIMIT 1"
    );
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const [meals] = await knex.raw(
      "SELECT * FROM Meal ORDER BY id DESC LIMIT 1"
    );
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is listening on http://localhost:${port}`);
});
