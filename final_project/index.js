const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const regd_routes = require('./router/registered.js').authenticated;
const public_routes = require('./router/general.js').general;

// Add the code for creating an Express app instance


// Add the code for parsing incoming requests with JSON payloads


app.use("/registered",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/registered/auth/*", function auth(req,res,next){
   let token = req.session.authorization;
   if(token) {
       token = token['accessToken'];
       jwt.verify(token, "access",(err,user)=>{
           if(!err){
               req.user = user;
               next();
           }
           else{
               return res.status(403).json({message: "User not authenticated"})
           }
        });
    } else {
        return res.status(403).json({message: "User not logged in"})
    }
});
 
const PORT = 5000;

// Add the code for mounting the middleware for the 2 routes


// Add the code for the server to listen on Port 5000

