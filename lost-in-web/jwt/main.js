const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123key";

const app = express();
app.use(express.json())

//In memory db for testing
const ALL_USERS = [
  {
    username: "user1@mail.com",
    password: "123",
    name: "user1",
  },
  {
    username: "user2@mail.com",
    password: "123",
    name: "user2",
  },
  {
    username: "user3@gmail.com",
    password: "123",
    name: "user3",
  },
];

function userExists(username, password) {
  let userExist = false;
  for(let i = 0;i< ALL_USERS.length; i++) {
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
      userExist= true;
    }
  }
  return userExist;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
