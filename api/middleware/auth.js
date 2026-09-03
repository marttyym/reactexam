const crypto = require("crypto");

// Simple token-based authentication middleware
// Tokens are signed using HMAC to prevent tampering
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Generate a signed token for a user
function generateToken(userId) {
  const payload = JSON.stringify({
    userId: userId,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("hex");
  return Buffer.from(JSON.stringify({ payload, signature })).toString("base64");
}

// Verify and decode a token
function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    const { payload, signature } = decoded;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(payload)
      .digest("hex");
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    // Parse payload and check expiration
    const data = JSON.parse(payload);
    if (data.exp < Date.now()) {
      return null;
    }
    
    return data;
  } catch (err) {
    return null;
  }
}

// Middleware to authenticate requests
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  
  // Attach authenticated user ID to request
  req.authenticatedUserId = decoded.userId;
  next();
}

module.exports = { authenticate, generateToken, verifyToken };
