const jwt = require("jsonwebtoken");
const { secretkey } = require("../configuration/jwtConfig");

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretkey, { expiresIn: "1h" });
}

function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretkey, { expiresIn: "7h" });
}

function verifyToken(token) {
  return jwt.verify(token, secretkey);
}

module.exports = { generateToken, generateRefreshToken, verifyToken };
