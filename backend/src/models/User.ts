import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  refreshTokenHash: String
}, { timestamps: true });

export const User = model('User', userSchema);
