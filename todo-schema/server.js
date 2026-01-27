require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Todo Application API',
    version: '1.0.0',
    endpoints: {
      user: {
        'POST /signup': 'User signup'
      },
      todos: {
        'POST /add-todo': 'Create a new todo',
        'GET /get-my-todo/:userId': 'Get all todos for a user',
        'PUT /update-todo/:todoId': 'Update a todo',
        'DELETE /delete-todo/:todoId': 'Delete a todo'
      }
    }
  });
});

app.use('/', userRoutes);
app.use('/', todoRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Base URL: http://localhost:${PORT}`);
});

module.exports = app;
