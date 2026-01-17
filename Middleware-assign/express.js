// Import the express library to create our server
import express from 'express';
// Import the todo router that handles all todo-related routes
import todoRouter from './routes/todos.js';
// Import the logging middleware to track all requests
import loggerMiddleware from './middleware/logger.js';

// Create an Express application instance
const app = express();
// Define the port number where our server will run
const PORT = 3000;

// Middleware to parse incoming JSON data in request body
app.use(express.json());
// Apply logging middleware to all routes (app-level middleware)
app.use(loggerMiddleware);

// Use the todo router for all routes starting with /todos
app.use('/todos', todoRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});