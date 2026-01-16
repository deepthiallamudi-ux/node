import express from 'express';
import rateLimit from 'express-rate-limit';
const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message:{status: 429,
    error:'Too many requests from this IP, please try again after 1 minute'
}   
});
 app.use(limiter);

