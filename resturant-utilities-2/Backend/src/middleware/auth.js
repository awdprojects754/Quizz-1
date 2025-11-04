// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {   

  let token = req.cookies?.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Access denied." });
  }

  try {
    // ✅ 3. Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ 4. Fetch user from DB (optional but safer)
    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid token user not found." });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
});

export default authenticate;
