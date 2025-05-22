import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation").select("*");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newReservation = req.body;
    const [insertedId] = await knex("reservation").insert(newReservation);
    const insertedReservation = await knex("reservation")
      .where({ id: insertedId })
      .first();
    res.status(201).json(insertedReservation);
  } catch (err) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await knex("reservation")
      .where({ id: req.params.id })
      .first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reservation" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await knex("reservation")
      .where({ id: req.params.id })
      .update(req.body);
    if (!updated) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    const updatedReservation = await knex("reservation")
      .where({ id: req.params.id })
      .first();
    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("reservation")
      .where({ id: req.params.id })
      .del();
    if (!deleted) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});

export default router;
