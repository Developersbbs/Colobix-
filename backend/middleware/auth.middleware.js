const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired session." });
  }
}

// role 1 = admin
function requireAdmin(req, res, next) {
  if (req.user?.role !== 1)
    return res.status(403).json({ success: false, message: "Admin access only." });
  next();
}

// role 2 = client
function requireClient(req, res, next) {
  if (req.user?.role !== 2)
    return res.status(403).json({ success: false, message: "Client access only." });
  next();
}

module.exports = { requireAuth, requireAdmin, requireClient };