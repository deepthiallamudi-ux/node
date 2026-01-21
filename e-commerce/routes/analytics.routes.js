import express from 'express';
import fs from 'fs';

const analyticsRouter = express.Router();
const dbPath = './db.json';


const readDB = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

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

analyticsRouter.get('/cancelled-orders', (req, res) => {
    const db = readDB();
    
    const cancelledOrders = db.orders.filter(order => order.status === 'cancelled');
    
    res.json({ totalCount: cancelledOrders.length, orders: cancelledOrders });
});

analyticsRouter.get('/shipped', (req, res) => {
    const db = readDB();
    
    const shippedOrders = db.orders.filter(order => order.status === 'shipped');
    
    res.json({ totalCount: shippedOrders.length, orders: shippedOrders });
});

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
