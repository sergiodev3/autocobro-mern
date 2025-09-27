import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

export const createTransaction = async (req, res) => {
  try {
    const { user, products, total, cashbackApplied } = req.body;
    const transaction = new Transaction({ user, products, total, cashbackApplied });
    await transaction.save();
    // Actualiza el cashback del usuario
    if (cashbackApplied) {
      await User.findByIdAndUpdate(user, { $inc: { cashback: cashbackApplied } });
    }
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user').populate('products');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('user').populate('products');
    if (!transaction) return res.status(404).json({ error: 'Transacción no encontrada' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
