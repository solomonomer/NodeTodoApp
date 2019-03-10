import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from './services/user';

const router = Router();

// /api/user
router
    .route('/')
    .get(getUsers)
    .post(createUser)

// /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

export default router;
