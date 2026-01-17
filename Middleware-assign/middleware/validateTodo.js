// Route-specific middleware: Validates the request body for POST /todos/add
// Ensures only 'title' field is present and no extra fields

const validateTodo = (req, res, next) => {
 
  const { title } = req.body;
  // Get all keys/fields in the request body
  const bodyKeys = Object.keys(req.body);
  
  // Check if title is missing OR there are extra fields OR the only field is not 'title'
  if (!title || bodyKeys.length !== 1 || bodyKeys[0] !== "title") {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }
  

  next();
};


export default validateTodo;
