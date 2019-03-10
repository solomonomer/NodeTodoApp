import { Router } from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from './services/task';

const router = Router();

// /api/task
router
    .route('/')
    .get(getTasks)
    .post(createTask)

// /api/task/:id
router
    .route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask)

export default router;
