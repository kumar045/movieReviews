const express = require('express');
const public_users = express.Router();
let movies = require("./movies_db.js");
let isValid = require("./registered.js").isValid;
let users = require("./registered.js").users;
const axios = require("axios").default;


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Successfully registred! You can now login."});
    } else {
      return res.status(404).json({message: "User with same username already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user!"});
});

// Get the list of movies
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({movies}, null, 4));
});

// Get movies based on ID
public_users.get('/id/:id',function (req, res) {
  const id = req.params.id;
  res.send(movies[id])
 });
  
// Get movies based on director
public_users.get('/director/:director',function (req, res) {
  let moviesbydirector = [];
  let ids = Object.keys(movies);
  ids.forEach((id) => {
    if(movies[id]["director"] === req.params.director) {
      moviesbydirector.push({"id":id,
                          "name":movies[id]["name"],
                          "reviews":movies[id]["reviews"]});
    }
  });
  res.send(JSON.stringify({moviesbydirector}, null, 4));
});

// Get movies by their name
public_users.get('/name/:name',function (req, res) {
  let moviesbyname = [];
  let ids = Object.keys(movies);
  ids.forEach((id) => {
    if(movies[id]["name"] === req.params.name) {
      moviesbyname.push({"id":id,
                          "director":movies[id]["director"],
                          "reviews":movies[id]["reviews"]});
    }
  });
  res.send(JSON.stringify({moviesbyname}, null, 4));
});

//  Get movie reviews by ID
public_users.get('/review/:id',function (req, res) {
  const id = req.params.id;
  res.send(movies[id]["reviews"])
});


module.exports.general = public_users;
