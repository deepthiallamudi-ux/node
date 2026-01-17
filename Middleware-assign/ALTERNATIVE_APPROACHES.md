# Alternative Ways to Write the Code

## 1. VALIDATION MIDDLEWARE - Alternative Approaches

### Method 1: Current Approach
```javascript
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  const bodyKeys = Object.keys(req.body);
  
  if (!title || bodyKeys.length !== 1 || bodyKeys[0] !== 'title') {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }
  
  next();
};
```

### Method 2: Using JSON.stringify comparison (Simple way)
```javascript
const validateTodo = (req, res, next) => {
  // Check if the request body only has 'title' field
  if (!req.body.title || Object.keys(req.body).length !== 1) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }
  
  next();
};
```

### Method 3: Using Array.every() (Functional approach)
```javascript
const validateTodo = (req, res, next) => {
  const hasOnlyTitle = Object.keys(req.body).every(key => key === 'title');
  
  if (!req.body.title || !hasOnlyTitle) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }
  
  next();
};
```

### Method 4: Schema validation (Most professional)
```javascript
const validateTodo = (req, res, next) => {
  const allowedFields = ['title'];
  const receivedFields = Object.keys(req.body);
  const isValid = receivedFields.length === 1 && 
                  receivedFields[0] === 'title' && 
                  req.body.title;
  
  if (!isValid) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }
  
  next();
};
```

---

## 2. RATE LIMITER - Alternative Approaches

### Method 1: Current Approach (Using express-rate-limit package)
```javascript
const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: {
    status: 429,
    error: 'Too many requests, please try again later'
  }
});
```

### Method 2: Custom rate limiter (Manual implementation)
```javascript
const requestCounts = {};

const customRateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  // Initialize or reset if time window has passed
  if (!requestCounts[ip] || now - requestCounts[ip].startTime > 60000) {
    requestCounts[ip] = { count: 1, startTime: now };
    return next();
  }
  
  // Check if limit exceeded
  if (requestCounts[ip].count >= 15) {
    return res.status(429).json({
      error: 'Too many requests, please try again later'
    });
  }
  
  requestCounts[ip].count++;
  next();
};
```

### Method 3: Using in-memory with Map (Better performance)
```javascript
const rateLimitMap = new Map();

const rateLimiter = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const limit = 15;
  const windowMs = 60 * 1000;
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  const record = rateLimitMap.get(key);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return next();
  }
  
  if (record.count >= limit) {
    return res.status(429).json({
      error: 'Too many requests, please try again later'
    });
  }
  
  record.count++;
  next();
};
```

---

## 3. DATABASE OPERATIONS - Alternative Approaches

### Method 1: Current Approach (Synchronous)
```javascript
const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
```

### Method 2: Asynchronous with async/await
```javascript
const readDB = async () => {
  const data = await fs.promises.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeDB = async (data) => {
  await fs.promises.writeFile(dbPath, JSON.stringify(data, null, 2));
};

// Usage in routes:
router.get('/', async (req, res) => {
  const db = await readDB();
  res.json(db.todos);
});
```

### Method 3: With error handling
```javascript
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { todos: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};
```

---

## 4. ROUTE HANDLERS - Alternative Approaches

### Method 1: Current Approach
```javascript
router.post('/add', validateTodo, (req, res) => {
  const db = readDB();
  const newTodo = {
    id: db.todos.length + 1,
    title: req.body.title,
    completed: false
  };
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json(newTodo);
});
```

### Method 2: Using separate controller function
```javascript
const createTodo = (req, res) => {
  const db = readDB();
  const newTodo = {
    id: db.todos.length + 1,
    title: req.body.title,
    completed: false
  };
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json(newTodo);
};

router.post('/add', validateTodo, createTodo);
```

### Method 3: Using a service layer (Most professional)
```javascript
class TodoService {
  static addTodo(title) {
    const db = readDB();
    const newTodo = {
      id: db.todos.length + 1,
      title,
      completed: false
    };
    db.todos.push(newTodo);
    writeDB(db);
    return newTodo;
  }
}

router.post('/add', validateTodo, (req, res) => {
  const newTodo = TodoService.addTodo(req.body.title);
  res.status(201).json(newTodo);
});
```

### Method 4: Using controller class (MVC Pattern)
```javascript
class TodoController {
  static create(req, res) {
    const db = readDB();
    const newTodo = { id: db.todos.length + 1, title: req.body.title, completed: false };
    db.todos.push(newTodo);
    writeDB(db);
    res.status(201).json(newTodo);
  }
  
  static getAll(req, res) {
    const db = readDB();
    res.json(db.todos);
  }
  
  static getOne(req, res) {
    const db = readDB();
    const todo = db.todos.find(t => t.id === parseInt(req.params.todoId));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  }
}

router.post('/add', validateTodo, TodoController.create);
router.get('/', rateLimiter, TodoController.getAll);
router.get('/:todoId', TodoController.getOne);
```

---

## Summary: Which Approach is Best?

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| **Current (Simple)** | Learning, Small projects | Easy to understand | Not scalable |
| **Custom Middleware** | Custom logic | Full control | More code |
| **Service/Controller** | Medium projects | Organized, Reusable | More files |
| **MVC Pattern** | Large projects | Very organized | Complex |
| **express-rate-limit** | Production | Battle-tested | Less control |

**Recommendation for beginners:** Stick with the current approach! It's simple and works great for learning.
