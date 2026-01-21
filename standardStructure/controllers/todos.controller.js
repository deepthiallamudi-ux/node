import { readDB, writeDB } from '../models/todo.model.js';

// Get all todos
export const getAllTodos = (req, res) => {
    const db = readDB();
    res.json(db.todos);
};

// Get a single todo by ID
export const getTodoById = (req, res) => {
    const db = readDB();
    const todo = db.todos.find(t => t.id === parseInt(req.params.todoId));
    
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
};

// Create a new todo
export const createTodo = (req, res) => {
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

// Update a todo
export const updateTodo = (req, res) => {
    const db = readDB();
    const todoIndex = db.todos.findIndex(t => t.id === parseInt(req.params.todoId));
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    db.todos[todoIndex] = {
        ...db.todos[todoIndex],
        ...req.body,
        id: db.todos[todoIndex].id
    };
    
    writeDB(db);
    res.json(db.todos[todoIndex]);
};

// Delete a todo
export const deleteTodo = (req, res) => {
    const db = readDB();
    const todoIndex = db.todos.findIndex(t => t.id === parseInt(req.params.todoId));
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    const deletedTodo = db.todos.splice(todoIndex, 1)[0];
    writeDB(db);
    
    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
};
