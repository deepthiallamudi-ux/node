import express from 'express';
const app=express();   //creating an express application
const port=3000;  //defining a port number
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
});
app.get('/home',(req,res)=>{   
    res.send('<h1 style="color:pink">This is home page </h1>');   
}
);
app.get('/contactus',(req,res)=>{   
    res.send('<h3 style="color:olive;">contact us at contact@example.com</h3>');   
});

app.get('/about',(req,res)=>{
    res.json({info: 'We are a company that values excellence and innovation.'});
});