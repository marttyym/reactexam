const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json("Access denied. No token provided.");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Contains { userId, username }
    next();
  } catch (err) {
    res.status(403).json("Invalid or expired token.");
  }
};

module.exports = verifyToken;
