const express = require('express');
const jwt = require('jsonwebtoken');
// Import the movies_db/js file/module

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
//   This code fetches the "username" from the HTTP request body
  const username = req.body.username;
  
//   Add the code for fetching the password from the body

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

// Add the code here!
});


// Deleting a movie review

regd_users.delete("/auth/review/:id", (req, res) => {
    const id = req.params.id;
    let reviewer = req.session.authorization['username'];
    let filtered_review = movies[id]["reviews"];
    if (filtered_review[reviewer]){
        delete filtered_review[reviewer];
        res.send(`Reviews for movie ID  ${id} posted by user: ${reviewer} deleted!`);
    }
    else{
        res.send("Can't delete, as this review has been posted by a different user!");
    }
    });


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
