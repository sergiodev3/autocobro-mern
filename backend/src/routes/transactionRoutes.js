import { Router } from 'express';
const router = Router();
import { createTransaction, getTransactions, getTransactionById } from '../controllers/transactionController.js';

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);

export default router;
