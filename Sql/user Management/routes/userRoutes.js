const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { 
  validateCreateUser, 
  validateUpdateUser, 
  validateUserId 
} = require('../middleware/validateUser');

// Create a new user
// POST /api/users
router.post('/', validateCreateUser, userController.createUser);

// Get all users
// GET /api/users
router.get('/', userController.getAllUsers);

// Get user by ID
// GET /api/users/:id
router.get('/:id', validateUserId, userController.getUserById);

// Update user
// PUT /api/users/:id
router.put('/:id', validateUserId, validateUpdateUser, userController.updateUser);

// Delete user
// DELETE /api/users/:id
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;
