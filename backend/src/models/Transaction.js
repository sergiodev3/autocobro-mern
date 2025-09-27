import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  total: { type: Number, required: true },
  cashbackApplied: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
