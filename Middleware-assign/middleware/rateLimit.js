// Import the express-rate-limit package
import rateLimit from 'express-rate-limit';

// Route-level middleware: Limits the number of requests to prevent abuse
// Applied only to GET /todos route

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // Time window: 1 minute (60 seconds * 1000 milliseconds)
  max: 15, // Maximum 15 requests allowed per time window
  message: {
    error: 'Too many requests, please try again later' // Error message sent when limit exceeded
  }
});

// Export the rate limiter to use in routes
export default rateLimiter;

