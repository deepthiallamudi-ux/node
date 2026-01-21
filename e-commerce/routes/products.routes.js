import express from 'express';
import fs from 'fs';

const productsRouter = express.Router();
const dbPath = './db.json';

const readDB = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

productsRouter.get('/', (req, res) => {
    const db = readDB();
    res.json(db.products);
});


productsRouter.get('/:productId', (req, res) => {
    const db = readDB();
    const product = db.products.find(p => p.id === parseInt(req.params.productId));
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
});


productsRouter.post('/', (req, res) => {
    const db = readDB();
    const { name, price, stock } = req.body;
    
    if (!name || !price || stock === undefined) {
        return res.status(400).json({ error: 'Name, price, and stock are required' });
    }
    
    const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name,
        price,
        stock
    };
    
    db.products.push(newProduct);
    writeDB(db);
    res.status(201).json(newProduct);
});


productsRouter.put('/:productId', (req, res) => {
    const db = readDB();
    const product = db.products.find(p => p.id === parseInt(req.params.productId));
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const { name, price, stock } = req.body;
    
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock !== undefined) product.stock = stock;
    
    writeDB(db);
    res.json(product);
});

productsRouter.delete('/:productId', (req, res) => {
    const db = readDB();
    const index = db.products.findIndex(p => p.id === parseInt(req.params.productId));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    db.products.splice(index, 1);
    writeDB(db);
    res.json({ message: 'Product deleted successfully' });
});

export default productsRouter;
