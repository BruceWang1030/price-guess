const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

//personal
// const db = mysql.createConnection({
//   host: "35.203.127.86",
//   user: "brucewang",
//   port: "3306",
//   password: "Roger173",
//   database: "huckleberry_game_data"
// });

const db = mysql.createConnection({
  host: "mydb.co3yccf4vocd.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "05241030",
  database: "mydb"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", function(req, res) {
  res.send("Hello");
});

//fetch house single
app.get("/data/houses/id", function(req, res) {
  console.log("req.query: " + req.query.house_id);
  console.log(req.query);
  console.log(req.params);
  var sql = "SELECT * FROM houses where house_id=" + req.query.house_id;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//fetch user
app.get("/data/users", function(req, res) {
  console.log("req.query: " + req.query.user_id);
  var sql = "SELECT * FROM users where user_id=" + req.query.user_id;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//post a new user
app.post("/data/users", function(req, res) {
  console.log("post new user to users");
  console.log(req.body);
  var data = { level: req.body.level, created_at: req.body.created_at };
  var sql =
    "INSERT INTO users (level,created_at) VALUES (" +
    data.level +
    ",'" +
    data.created_at +
    "')";
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data sent",
      level: data.level,
      created: data.created_at
    });
  });
});

app.put("/data/users", function(req, res) {
  console.log("update user");
  console.log(req.body);
  var data = { level: req.body.level, user_id: req.body.user_id };
  console.log(data);
  // var data = { level: 10, user_id: 1 };
  // console.log(data);
  var sql =
    "UPDATE users SET level = " +
    data.level +
    " WHERE (user_id = " +
    data.user_id +
    ")";
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data sent",
      user_id: data.user_id,
      level: data.level
    });
  });
});

app.listen(8080, () => {
  console.log("Server listening to port 8080");
});
