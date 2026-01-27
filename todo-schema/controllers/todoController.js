const todoService = require('../services/todoService');

const createTodo = async (req, res, next) => {
  try {
    const todoData = req.body;
    const todo = await todoService.createTodo(todoData);

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    if (error.message.includes('Foreign key violation')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
};

const getUserTodos = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const todos = await todoService.getUserTodos(userId);

    res.status(200).json({
      success: true,
      message: 'Todos retrieved successfully',
      count: todos.length,
      data: todos
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const updateData = req.body;

    const todo = await todoService.updateTodo(todoId, updateData);

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    if (error.message === 'Todo not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    await todoService.deleteTodo(todoId);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    if (error.message === 'Todo not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
};

module.exports = {
  createTodo,
  getUserTodos,
  updateTodo,
  deleteTodo
};
