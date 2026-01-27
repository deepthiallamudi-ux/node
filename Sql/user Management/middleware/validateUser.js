// Validate email format using regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate user creation data
const validateCreateUser = (req, res, next) => {
  const { name, email, password, age, role } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must not be empty');
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Email must be a valid email format');
  }

  // Validate password
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Validate age (optional)
  if (age !== undefined && age !== null) {
    if (typeof age !== 'number' || isNaN(age)) {
      errors.push('Age must be a number');
    } else if (age < 18) {
      errors.push('Age must be 18 or greater');
    }
  }

  // Validate role (optional)
  if (role !== undefined && role !== null) {
    if (typeof role !== 'string' || role.trim().length === 0) {
      errors.push('Role must be a non-empty string');
    }
  }

  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validate user update data
const validateUpdateUser = (req, res, next) => {
  const { name, email, password, age, role } = req.body;
  const errors = [];

  // At least one field must be provided
  if (!name && !email && !password && age === undefined && !role) {
    return res.status(400).json({
      success: false,
      message: 'At least one field must be provided for update'
    });
  }

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Name must not be empty');
    }
  }

  // Validate email if provided
  if (email !== undefined) {
    if (typeof email !== 'string') {
      errors.push('Email must be a string');
    } else if (!isValidEmail(email)) {
      errors.push('Email must be a valid email format');
    }
  }

  // Validate password if provided
  if (password !== undefined) {
    if (typeof password !== 'string') {
      errors.push('Password must be a string');
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
  }

  // Validate age if provided
  if (age !== undefined && age !== null) {
    if (typeof age !== 'number' || isNaN(age)) {
      errors.push('Age must be a number');
    } else if (age < 18) {
      errors.push('Age must be 18 or greater');
    }
  }

  // Validate role if provided
  if (role !== undefined && role !== null) {
    if (typeof role !== 'string' || role.trim().length === 0) {
      errors.push('Role must be a non-empty string');
    }
  }

  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validate UUID format for user ID
const validateUserId = (req, res, next) => {
  const { id } = req.params;
  
  // UUID v4 regex pattern
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!id || !uuidRegex.test(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID format. Must be a valid UUID'
    });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateUserId
};
