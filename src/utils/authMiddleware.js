const jwt = require("jsonwebtoken");
const { secretkey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }

  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      // console.error("Token Verification Error:", err);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
