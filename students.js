import express from 'express';
import fs from 'fs';
const app = express();
const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/students', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Failed to fetch students' });
        }
        const students = JSON.parse(data);
        res.json(students);
    });
});
   

    app.post('/students', (req, res) => {
        res.json({ message: 'New student added' });
    });

    app.put('/students/:id', (req, res) => {
        const studentId = req.params.id;
        res.json({ message: `Student with id ${studentId} updated` });
    });

    app.delete('/students/:id', (req, res) => {
        const studentId = req.params.id;
        res.json({ message: `Student with id ${studentId} deleted` });
    });