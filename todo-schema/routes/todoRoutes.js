const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { 
  validateCreateTodo, 
  validateUpdateTodo, 
  validateUserId,
  validateTodoId 
} = require('../middleware/validation');

router.post('/add-todo', validateCreateTodo, todoController.createTodo);
router.get('/get-my-todo/:userId', validateUserId, todoController.getUserTodos);
router.put('/update-todo/:todoId', validateTodoId, validateUpdateTodo, todoController.updateTodo);
router.delete('/delete-todo/:todoId', validateTodoId, todoController.deleteTodo);

module.exports = router;
