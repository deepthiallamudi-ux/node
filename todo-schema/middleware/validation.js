const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must not be empty');
  }

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Email must be a valid email format');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateCreateTodo = (req, res, next) => {
  const { title, userId } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must not be empty');
  }

  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    errors.push('userId is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

const validateUpdateTodo = (req, res, next) => {
  const { title, description, is_completed } = req.body;

  if (!title && !description && is_completed === undefined) {
    return res.status(400).json({
      success: false,
      message: 'At least one field (title, description, or is_completed) must be provided for update'
    });
  }

  next();
};

const validateUserId = (req, res, next) => {
  const { userId } = req.params;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!userId || !uuidRegex.test(userId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID format'
    });
  }

  next();
};

const validateTodoId = (req, res, next) => {
  const { todoId } = req.params;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!todoId || !uuidRegex.test(todoId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid todo ID format'
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateCreateTodo,
  validateUpdateTodo,
  validateUserId,
  validateTodoId
};
