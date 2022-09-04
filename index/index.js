const dotenv =require("dotenv")
dotenv.config({path:".env"});
const express=require("express");
const app =express();
let sanjeev=require("../Model/db")


app.use(express.json());

const cors =require("cors");
app.use(cors());
const port =3001;


const {userRoutes}= require('../Routes/login.routes')
app.use('/user', userRoutes);

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,(err)=>{
    console.log(`server is connected is port http://localhost:${port}`)
})