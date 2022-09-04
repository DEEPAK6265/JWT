const express =require("express");

const userRoutes =express.Router();
const {userRegister, userlogin}=require('../Controller/login')

userRoutes.post('/register', userRegister)
userRoutes.post('/login', userlogin);

module.exports={userRoutes}