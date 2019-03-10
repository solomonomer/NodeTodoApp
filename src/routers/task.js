const express = require('express');
const router = express.Router();
const tasksCrud = require('../services/task');

// /api/tasks
router
    .route('/')
    .get(tasksCrud.getTasks)
    .post(tasksCrud.createTask)

// /api/task/:id
router
    .route('/:id')
    //.get(getTaskById)
    .put(tasksCrud.updateTask)
    .delete(tasksCrud.deleteTask)

module.exports = router;
