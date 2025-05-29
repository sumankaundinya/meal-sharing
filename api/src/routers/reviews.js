import express from "express";
import knex from "../database_client.js";
import { validate } from "../middleware/validate.js";
import {
  reviewSchema,
  reviewUpdateSchema,
} from "../validators/reviewValidation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await knex("review").select("*");
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.get("/meals/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("review").where({ meal_id });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by meal_id:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.post("/", validate(reviewSchema), async (req, res) => {
  try {
    const [id] = await knex("review").insert(req.validatedBody);
    res.status(201).json({ message: "Review added", id });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("review").where({ id }).first();
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Failed to fetch review" });
  }
});

router.put("/:id", validate(reviewUpdateSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await knex("review")
      .where({ id })
      .update(req.validatedBody);
    if (updated === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review updated" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("review").where({ id }).del();
    if (deleted === 0)
      return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});
export default router;
