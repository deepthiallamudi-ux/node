
import express from 'express';
import todoRouter from './routes/todos.js';
import loggerMiddleware from './middleware/logger.js';


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(loggerMiddleware);

app.use('/todos', todoRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
