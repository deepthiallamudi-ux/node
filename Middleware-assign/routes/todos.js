// Import required modules
import express from 'express';
import fs from 'fs'; // File system module to read/write files
import rateLimiter from '../middleware/rateLimit.js';
import validateTodo from '../middleware/validateTodo.js';

// Create a router instance to define routes
const router = express.Router();
// Path to our database file
const dbPath = './db.json';

// Helper function to read data from db.json
const readDB = () => {
  // Read the file synchronously and parse JSON data
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write data to db.json
const writeDB = (data) => {
  // Convert data to JSON string with 2-space indentation and write to file
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET /todos - Get all todos
// Uses rate limiter middleware (15 requests per minute)
router.get('/', rateLimiter, (req, res) => {
  // Read all todos from database
  const db = readDB();
  // Send todos array as response
  res.json(db.todos);
});

// GET /todos/:todoId - Get a single todo by ID
router.get('/:todoId', (req, res) => {
  // Read all todos from database
  const db = readDB();
  // Find the todo with matching ID (convert string to number)
  const todo = db.todos.find(t => t.id === parseInt(req.params.todoId));
  
  // If todo not found, send 404 error
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Send the found todo
  res.json(todo);
});

// POST /todos/add - Create a new todo
// Uses validation middleware to ensure only 'title' field is sent
router.post('/add', validateTodo, (req, res) => {
  // Read current todos from database
  const db = readDB();
  
  // Create new todo object
  const newTodo = {
    id: db.todos.length + 1, // Generate new ID (length + 1)
    title: req.body.title, // Get title from request body
    completed: false // New todos are not completed by default
  };
  
  // Add new todo to the todos array
  db.todos.push(newTodo);
  // Save updated data back to db.json
  writeDB(db);
  
  // Send the created todo with 201 (Created) status
  res.status(201).json(newTodo);
});

// PUT /todos/update/:todoId - Update an existing todo
router.put('/update/:todoId', (req, res) => {
  // Read all todos from database
  const db = readDB();
  // Find the index of todo with matching ID
  const todoIndex = db.todos.findIndex(t => t.id === parseInt(req.params.todoId));
  
  // If todo not found, send 404 error
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Update the todo: keep existing data and override with new data from request
  db.todos[todoIndex] = {
    ...db.todos[todoIndex], // Spread existing todo data
    ...req.body, // Spread new data from request body
    id: db.todos[todoIndex].id // Ensure ID is not changed
  };
  
  // Save updated data back to db.json
  writeDB(db);
  // Send the updated todo
  res.json(db.todos[todoIndex]);
});

// DELETE /todos/delete/:todoId - Delete a todo
router.delete('/delete/:todoId', (req, res) => {
  // Read all todos from database
  const db = readDB();
  // Find the index of todo with matching ID
  const todoIndex = db.todos.findIndex(t => t.id === parseInt(req.params.todoId));
  
  // If todo not found, send 404 error
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Remove the todo from array and get the deleted todo
  const deletedTodo = db.todos.splice(todoIndex, 1)[0];
  // Save updated data back to db.json
  writeDB(db);
  
  // Send success message with deleted todo info
  res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
});

// Export the router to use in main server file
export default router;
