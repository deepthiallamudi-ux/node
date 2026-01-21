
import express from 'express';
import rateLimiter from '../middleware/rateLimit.js';
import validateTodo from '../middleware/validateTodo.js';
import { 
    getAllTodos, 
    getTodoById, 
    createTodo, 
    updateTodo, 
    deleteTodo 
} from '../controllers/todos.controller.js';

const router = express.Router();

// Get all todos
router.get('/', rateLimiter, getAllTodos);

// Get a single todo by ID
router.get('/:todoId', getTodoById);

// Create a new todo
router.post('/add', validateTodo, createTodo);

// Update a todo
router.put('/update/:todoId', updateTodo);

// Delete a todo
router.delete('/delete/:todoId', deleteTodo);

// Export the router to use in main server file
export default router;
