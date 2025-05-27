import express from "express";
import knex from "../database_client.js";
import { validate } from "../middleware/validate.js";

import { mealSchema, mealUpdateSchema } from "../validators/mealValidation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const meals = await knex("meal").select("*");
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

router.post("/", validate(mealSchema), async (req, res) => {
  try {
    const [id] = await knex("meal").insert(req.validatedBody);
    res.status(201).json({ message: "Meal created", id });
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(500).json({ error: "Failed to create meal" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await knex("meal").where({ id }).first();

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Failed to fetch meal" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = mealUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;
    const updated = await knex("meal").where({ id }).update(req.body);

    if (updated === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).json({ error: "Failed to update meal" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await knex("meal").where({ id }).del();

    if (deleted === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Failed to delete meal" });
  }
});

export default router;
