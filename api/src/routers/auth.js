import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import knex from "../database_client.js";

const router = express.Router();

/**
 * SIGNUP ROUTE
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userRole =
      role && ["host", "seeker"].includes(role) ? role : "seeker";

    const [existingUser] = await knex.raw(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await knex.raw(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole]
    );

    res
      .status(201)
      .json({ message: `User created successfully as ${userRole}` });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * LOGIN ROUTE
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [userRows] = await knex.raw("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PROTECTED USER INFO ROUTE
 */
router.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await knex.raw(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [decoded.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ user: rows[0] });
  } catch (error) {
    console.error("User fetch error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});
// PUT /api/auth/update-role/:id
router.put("/update-role/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["host", "seeker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    await knex("users").where({ id }).update({ role });

    res.json({ message: `User role updated to ${role}.` });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Server error." });
  }
});
// PUT /api/auth/update-role/:id
router.put("/update-role/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["host", "seeker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    await knex("users").where({ id }).update({ role });

    res.json({ message: `User role updated to ${role}.` });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
