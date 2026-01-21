// App-level middleware: Logs every incoming request
// This helps us track all API calls made to our server

const loggerMiddleware = (req, res, next) => {
  // Get current date and time
  const timestamp = new Date().toLocaleString();
  
  // Log the HTTP method (GET, POST, etc.), URL, and timestamp
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  // Call next() to pass control to the next middleware or route handler
  next();
};

// Export the middleware so it can be used in other files
export default loggerMiddleware;
