const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const regd_routes = require('./router/registered.js').authenticated;
const public_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

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

app.use("/registered", regd_routes);
app.use("/", public_routes);

app.listen(PORT,()=>console.log("Server running on Port 5000..."));