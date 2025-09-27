import { Router } from 'express';
const router = Router();
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
