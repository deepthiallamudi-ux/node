import express from 'express';
import fs from 'fs';

const UserRouter = express.Router();

const dbPath = './db.json';

const readDB = () => {
    const data=fs.readFileSync(dbPath,'utf-8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

UserRouter.get('/', (req, res) => {
    const db = readDB();
    res.json(db.users);
});

UserRouter.post('/add',(req,res)=>{
    const db = readDB();
    const newUser = {
        id: db.users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    db.users.push(newUser);
    writeDB(db);
    if(newUser.name && newUser.email){
        res.status(201).json(newUser);
    } else {
        res.status(400).json({ error: 'Name and email are required' });
    }
});

UserRouter.get('/:userId',(req,res)=>{
    const db= readDB();
    const user=db.users.find(u=>u.id===parseInt(req.params.userId));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

UserRouter.put('/update/:userId',(req,res)=>{
    const db= readDB();
    const userIndex=db.users.findIndex(u=>u.id===parseInt(req.params.userId));
    if(userIndex===-1){
        return res.status(404).json({ error: 'User not found' });
    }   
    const updatedUser={
        id: db.users[userIndex].id,
        name: req.body.name || db.users[userIndex].name,
        email: req.body.email || db.users[userIndex].email
    };
    db.users[userIndex]=updatedUser;
    writeDB(db);
    res.json(updatedUser);
});
UserRouter.delete('/delete/:userId',(req,res)=>{
    const db= readDB();
    const userIndex=db.users.findIndex(u=>u.id===parseInt(req.params.userId));
    if(userIndex===-1){
        return res.status(404).json({ error: 'User not found' });
    }
    db.users.splice(userIndex,1);
    writeDB(db);
    res.json({ message: 'User deleted successfully' });
});

export default UserRouter;