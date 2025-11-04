import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

// =========================
// 🔹 Helper token functions
// =========================
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  });
};

// =========================
// 🔹 REGISTER
// =========================
 const register = asyncHandler(async (req, res) => {
  const { restaurantName, email, password, phone, address } = req.body;

  if (!restaurantName || !email || !password || !phone || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existing = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existing)
    return res
      .status(409)
      .json({ message: "Email or phone number already exists." });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  await User.create({
    restaurantName,
    email,
    password: hashed,
    phone,
    address,
  });

  res.status(201).json({
    message: "User registered successfully",
    success: true,
  });
});

// =========================
// 🔹 LOGIN
// =========================
 const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials." });

  const pwMatch = await bcrypt.compare(password, user.password);
  if (!pwMatch) return res.status(401).json({ message: "Invalid credentials." });

  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  // store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  // set cookies
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      restaurantName: user.restaurantName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
  });
});

// =========================
// 🔹 CHECK CURRENT USER
// =========================
 const checkUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// =========================
// 🔹 LOGOUT
// =========================
 const logout = asyncHandler(async (req, res) => {

  // clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });

});


export {
register,
login,
checkUser,
logout
}