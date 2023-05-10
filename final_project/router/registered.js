const express = require('express');
const jwt = require('jsonwebtoken');
let movies = require("./movies_db.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  let userwithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userwithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{
  let validUser = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validUser.length > 0){
    return true;
  } else {
    return false;
  }
}

//Login for registered users
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
        return res.status(404).json({message: "Error logging in!"});
    }
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
          data: password
        }, 'access', { expiresIn: 60 * 20 });
        req.session.authorization = {
          accessToken, username

      }
      return res.status(200).send("User successfully logged in!");
    } else {
      return res.status(208).send("Incorrect Login. Please Check the credentials entered!");
    }
});

// Add or Update a review for a movie by its ID
regd_users.put("/auth/review/:id", (req, res) => {

  const id = req.params.id;
  let filtered_movie = movies[id]
  if (filtered_movie) {
      let review = req.query.review;
      let reviewer = req.session.authorization['username'];
      if(review) {
        filtered_movie['reviews'][reviewer] = review;
          movies[id] = filtered_movie;
      }
      res.send(`Review for the movie with ID  ${id} added/updated!`);
  }
  else{
      res.send("Unable to find this movie!");
  }
});


// Deleting a movie review

regd_users.delete("/auth/review/:id", (req, res) => {
    const id = req.params.id;
    let reviewer = req.session.authorization['username'];
    let filtered_review = mvoies[id]["reviews"];
    if (filtered_review[reviewer]){
        delete filtered_review[reviewer];
        res.send(`Reviews for movie ID  ${isbn} posted by user: ${reviewer} deleted!`);
    }
    else{
        res.send("Can't delete, as this review has been posted by a different user!");
    }
    });


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
