import express from 'express';
import fs from 'fs';

const analyticsRouter = express.Router();
const dbPath = './db.json';

// Read database
const readDB = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Get all orders with count using forEach
analyticsRouter.get('/allorders', (req, res) => {
    const db = readDB();
    let count = 0;
    const allOrders = [];

    db.orders.forEach(order => {
        count++;
        allOrders.push(order);
    });

    res.json({ totalCount: count, orders: allOrders });
});

// Get cancelled orders with count using filter
analyticsRouter.get('/cancelled-orders', (req, res) => {
    const db = readDB();
    
    const cancelledOrders = db.orders.filter(order => order.status === 'cancelled');
    
    res.json({ totalCount: cancelledOrders.length, orders: cancelledOrders });
});

// Get shipped orders with count using filter
analyticsRouter.get('/shipped', (req, res) => {
    const db = readDB();
    
    const shippedOrders = db.orders.filter(order => order.status === 'shipped');
    
    res.json({ totalCount: shippedOrders.length, orders: shippedOrders });
});

// Get total revenue by product using filter and reduce
analyticsRouter.get('/total-revenue/:productId', (req, res) => {
    const db = readDB();
    const productId = parseInt(req.params.productId);
    
    const product = db.products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const productOrders = db.orders.filter(order => 
        order.productId === productId && order.status !== 'cancelled'
    );
    
    const totalRevenue = productOrders.reduce((sum, order) => {
        return sum + (order.quantity * product.price);
    }, 0);
    
    res.json({ 
        productId, 
        productName: product.name, 
        totalRevenue, 
        orderCount: productOrders.length 
    });
});

// Get overall revenue using filter and reduce
analyticsRouter.get('/alltotalrevenue', (req, res) => {
    const db = readDB();
    
    const activeOrders = db.orders.filter(order => order.status !== 'cancelled');
    
    const totalRevenue = activeOrders.reduce((sum, order) => {
        const product = db.products.find(p => p.id === order.productId);
        if (product) {
            return sum + (order.quantity * product.price);
        }
        return sum;
    }, 0);
    
    res.json({ 
        totalRevenue, 
        totalActiveOrders: activeOrders.length,
        totalCancelledOrders: db.orders.filter(o => o.status === 'cancelled').length
    });
});

export default analyticsRouter;
