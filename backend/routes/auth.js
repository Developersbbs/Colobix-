const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { createUser, findUserByEmail } = require("../models/UserModel");
const router = express.Router();

// ── EasyDCIM helper ───────────────────────────────────────────────────────
async function loginViaEasyDCIM(email, password) {
  try {
    const response = await axios.post(
      `${process.env.EASYDCIM_URL}/login`,
      {
        email,
        password,
        device_name: "colobix-dashboard",
        token_ttl: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return {
      success: true,
      easydcimToken: response.data.data.token,
      easydcimUserId: response.data.data.id,
    };
  } catch (error) {
    if (error.response?.status === 403) {
      // Account exists but inactive/banned in EasyDCIM
      throw { code: "ACCOUNT_INACTIVE", message: "Access denied. Your account is not active. Contact admin." };
    }
    if (error.response?.status === 422) {
      // Wrong email or password — not recognized by EasyDCIM
      throw { code: "NOT_REGISTERED", message: "Access denied. You are not a registered client." };
    }
    throw { code: "EASYDCIM_UNREACHABLE", message: "Auth service unavailable. Try again later." };
  }
}

// ── Signup ────────────────────────────────────────────────────────────────
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    const { password: _, ...userData } = newUser;
    return res.status(201).json({
      message: "Account created successfully.",
      user: userData,
    });

  } catch (error) {
    console.log("Signup error:", error);
    return res.status(500).json({ message: "Signup failed." });
  }
});

// ── Login ─────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Step 1: EasyDCIM gate — must be a registered AND active client
    let easydcimResult;
    try {
      easydcimResult = await loginViaEasyDCIM(email, password);
    } catch (err) {
      // Both inactive and unregistered users are blocked here
      return res.status(403).json({ message: err.message });
    }

    // Step 2: Must also exist in Colobix DB
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(403).json({
        message: "Access denied. Your account has not been set up in Colobix. Contact admin.",
      });
    }

    // Step 3: Verify password against Colobix DB
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Step 4: All checks passed — issue Colobix JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        easydcimToken: easydcimResult.easydcimToken,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: "Login failed." });
  }
});

module.exports = router;