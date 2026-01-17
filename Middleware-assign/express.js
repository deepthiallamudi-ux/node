
import express from 'express';
import todoRouter from './routes/todos.js';
import loggerMiddleware from './middleware/logger.js';


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(loggerMiddleware);

app.use('/todos', todoRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// POST http://localhost:3000/todos/add
// Body: { "title": "Learn Express" }

// # Get all todos (limited to 15 per minute)
// GET http://localhost:3000/todos

// # Get single todo
// GET http://localhost:3000/todos/1

// # Update a todo
// PUT http://localhost:3000/todos/update/1
// Body: { "title": "Updated title", "completed": true }

// # Delete a todo
// DELETE http://localhost:3000/todos/delete/1