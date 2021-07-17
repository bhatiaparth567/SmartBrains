const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'chidia123',
        database:'smartbrain'
    }
})




const app=express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.json(database.users);
})

app.post('/signin',(req,res)=>{signin.handleRequest(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)} );

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    profile.handleRequest(req,res,id,db);
})

app.put('/image',(req,res)=>{image.handleRequest(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})


app.listen(3000,()=>{
    console.log("LISTENING ON PORT 3000")
})