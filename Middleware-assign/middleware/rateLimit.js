import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // Time window: 1 minute (60 seconds * 1000 milliseconds)
  max: 15, // Maximum 15 requests allowed per time window
  message: {
    status: 429, 
    error: 'Too many requests, please try again later' 
  }
});

// Export the rate limiter to use in routes
export default rateLimiter;

