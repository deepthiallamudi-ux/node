// Route-specific middleware: Validates the request body for POST /todos/add
// Ensures only 'title' field is present and no extra fields

const validateTodo = (req, res, next) => {
  // Extract title from request body
  const { title } = req.body;
  // Get all keys/fields in the request body
  const bodyKeys = Object.keys(req.body);
  
  // Check if title is missing OR there are extra fields OR the only field is not 'title'
  if (!title || bodyKeys.length !== 1 || bodyKeys[0] !== 'title') {
    // Send error response if validation fails
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }
  
  // If validation passes, proceed to the next middleware or route handler
  next();
};

// Export the validation middleware
export default validateTodo;
