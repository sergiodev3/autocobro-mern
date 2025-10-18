import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'client'], 
    default: 'client' 
  },
  points: { type: Number, default: 0 },
  cashback: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  lastPurchase: { type: Date },
  totalPurchases: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
