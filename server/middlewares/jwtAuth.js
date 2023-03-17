const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token by decoding
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token, respecting the authorization -
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json("Authorization Failed");
    }
  }
  if (!token) {
    res.status(401).json("Not Authorized, Try logging in again!");
  }
};

module.exports = protect;
