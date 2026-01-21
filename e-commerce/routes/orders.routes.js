import express from 'express';
import fs from 'fs';

const ordersRouter = express.Router();
const dbPath = './db.json';

// Read database
const readDB = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Write database
const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Get today's date
const getTodayDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
};

// Create Order
ordersRouter.post('/', (req, res) => {
    const db = readDB();
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'ProductId and quantity are required' });
    }

    const product = db.products.find(p => p.id === parseInt(productId));

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock === 0) {
        return res.status(400).json({ error: 'Product out of stock' });
    }

    if (quantity > product.stock) {
        return res.status(400).json({ error: `Insufficient stock. Available: ${product.stock}` });
    }

    const totalAmount = product.price * quantity;
    const newId = db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1;

    const newOrder = {
        id: newId,
        productId: parseInt(productId),
        quantity,
        totalAmount,
        status: 'placed',
        createdAt: getTodayDate()
    };

    product.stock -= quantity;
    db.orders.push(newOrder);
    writeDB(db);

    res.status(201).json(newOrder);
});

// Get All Orders
ordersRouter.get('/', (req, res) => {
    const db = readDB();
    res.json(db.orders);
});

// Cancel Order (Soft Delete)
ordersRouter.delete('/:orderId', (req, res) => {
    const db = readDB();
    const order = db.orders.find(o => o.id === parseInt(req.params.orderId));

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'cancelled') {
        return res.status(400).json({ error: 'Order is already cancelled' });
    }

    if (order.createdAt !== getTodayDate()) {
        return res.status(400).json({ error: 'Order can only be cancelled on the same day it was created' });
    }

    const product = db.products.find(p => p.id === order.productId);
    if (product) {
        product.stock += order.quantity;
    }

    order.status = 'cancelled';
    writeDB(db);

    res.json({ message: 'Order cancelled successfully', order });
});

// Change Order Status
ordersRouter.patch('/change-status/:orderId', (req, res) => {
    const db = readDB();
    const order = db.orders.find(o => o.id === parseInt(req.params.orderId));

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'cancelled' || order.status === 'delivered') {
        return res.status(400).json({ error: `Cannot change status of ${order.status} order` });
    }

    const { newStatus } = req.body;

    if (!newStatus) {
        return res.status(400).json({ error: 'newStatus is required' });
    }

    const statusFlow = { placed: 'shipped', shipped: 'delivered' };

    if (statusFlow[order.status] !== newStatus) {
        return res.status(400).json({ error: `Invalid status transition. Current: ${order.status}, Expected: ${statusFlow[order.status]}` });
    }

    order.status = newStatus;
    writeDB(db);

    res.json({ message: 'Order status updated', order });
});

export default ordersRouter;
