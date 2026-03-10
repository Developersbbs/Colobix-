const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const { loginViaEasyDCIM } = require("../services/easydcim.service");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  // Step 1 — verify with EasyDCIM (active check happens here)
  let easydcimResult;
  try {
    easydcimResult = await loginViaEasyDCIM(email, password);
  } catch (err) {
    if (err.code === "ACCOUNT_INACTIVE") {
      return res.status(403).json({ success: false, message: err.message });
    }
    if (err.code === "INVALID_CREDENTIALS") {
      return res.status(401).json({ success: false, message: err.message });
    }
    return res.status(503).json({ success: false, message: err.message });
  }

  // Step 2 — find or create user in your PostgreSQL
  let user;
  try {
    const existing = await pool.query(
      "SELECT id, username, email FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      user = existing.rows[0];
    } else {
      // First login — auto-provision from EasyDCIM confirmed identity
      const inserted = await pool.query(
        `INSERT INTO users (username, email, easydcim_id, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING id, username, email`,
        [
          email.split("@")[0],
          email,
          easydcimResult.easydcimUserId,
        ]
      );
      user = inserted.rows[0];
    }
  } catch (dbErr) {
    console.error("DB error during login:", dbErr);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }

  // Step 3 — issue Colobix JWT (EasyDCIM never mentioned to client)
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      easydcimToken: easydcimResult.easydcimToken, // stored server-side for later API calls
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
  });
}

module.exports = { login };