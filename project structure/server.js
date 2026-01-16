import express from  'express';
    import {readFileSync, writeFileSync} from './model/todo.model.js';

    const app= express()
    const PORT=3000;
    app.use(express.json());

    
app.get("/todos",(req,res)=>{
    const data=readData();
    res.send(data).todos;
})

        app.get("/users/:id",(req,res)=>{ 
            const data=readData();
            const user = data.users.find(u => u.id === parseInt(req.params.id));
            if(user) {
                res.send(user);
            } else {
                res.status(404).send("User not found");
            }
        })
        
        // update user

        app.put("/users/:id",(req,res)=>{
            const data=readData();
            const user=data.users.find(u => u.id === parseInt(req.params.id));   
            if(user){
                user.name=req.body.name;
                writeData(data);
                res.send("user updated");
            } else {
                res.status(404).send("User not found");
            }
        })

        // delete user

        app.delete("/todos/:id",(req,res)=>{
            const data=readData();
            const filteredTodos=data.todos.filter(t => t.id !== parseInt(req.params.id));
        })


    app.listen(3000,()=>{
        console.log("server started at port 3000")
    })