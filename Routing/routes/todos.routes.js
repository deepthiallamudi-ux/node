import express from "express";
import {readFileSync, writeFileSync} from "fs";
import fs from "fs";
const TodosRouter = express.Router();
const dbPath = './db.json';
 const readDB = () => {
    const data = readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDB= (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

TodosRouter.get('/', (req, res) => {
    const db = readDB();
    res.json(db.todos);
});
TodosRouter.post('/add',(req,res)=>{
    const db= readDB();
    const newTodo={
        id: db.todos.length + 1,
        title: req.body.title,
        completed: false    
    }
    db.todos.push(newTodo);
    writeDB(db);
    if(newTodo.title){
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Title is required' });
    }
});

TodosRouter.get('/:todoId',(req,res)=>{
    const db= readDB();
    const todo=db.todos.find(t=>t.id===parseInt(req.params.todoId));
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

TodosRouter.put('/update/:todoId',(req,res)=>{
    const db= readDB();
    const todoIndex=db.todos.findIndex(t=>t.id===parseInt(req.params.todoId));
    if(todoIndex){
        const updatedTodo={
            id: db.todos[todoIndex].id,
            title: req.body.title || db.todos[todoIndex].title,
            completed: req.body.completed !== undefined ? req.body.completed : db.todos[todoIndex].completed
        };
        db.todos[todoIndex]=updatedTodo;
        writeDB(db);
        res.json(updatedTodo);
    } else {
        return res.status(404).json({ error: 'Todo not found' });
    }
});

TodosRouter.delete('/delete/:todoId',(req,res)=>{
    const db= readDB();
    const todoIndex=db.todos.findIndex(t=>t.id===parseInt(req.params.todoId));
    if(todoIndex===-1){
        return res.status(404).json({ error: 'Todo not found' });
    }
    db.todos.splice(todoIndex,1);
    writeDB(db);
    res.json({ message: 'Todo deleted successfully' });
});

export default TodosRouter;