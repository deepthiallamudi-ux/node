import express from 'express';
import productsRouter from './routes/products.routes.js';
import ordersRouter from './routes/orders.routes.js';
import analyticsRouter from './routes/analytics.routes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/analytics', analyticsRouter);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
