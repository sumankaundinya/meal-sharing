import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knexLib from "knex";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const knex = knexLib({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
});

// Routes
app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
    res.json(meals[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
    res.json(meals[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id");
    res.json(meals[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (meals[0].length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals[0][0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/last-meal", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meals[0].length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }
    res.json(meals[0][0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Starting the server with a message
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
