// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  role: { type: String, default: 'owner' }, // optional
  refreshTokens: { type: String }, // store refresh tokens for logout/rotation
  createdAt: { type: Date, default: Date.now }
});

const userModel= mongoose.model('User', userSchema);
export default userModel;