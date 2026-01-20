import express from 'express';
import TodosRouter from './routes/todos.routes.js';
import UserRouter from './routes/users.route.js';

const app = express();
app.use(express.json());    
const Port=5000;

app.use('/users', UserRouter);
app.use('/todos', TodosRouter);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})