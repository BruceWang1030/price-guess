const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YES",
  database: "dojo"
});

db.connect();
//get all houses
app.get("/data/house", function(req, res) {
  var sql = "SELECT * FROM ninja";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//get single house
app.get("/data/house/id", function(req, res) {
  console.log("req.query: " + req.query.no);
  var sql = "SELECT * FROM ninja where no=" + req.query.no;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//post a new house
app.post("/data/house", function(req, res) {
  console.log(req.body);
  var data = { nama: req.body.nama, usia: req.body.usia };
  var sql = "INSERT INTO ninja SET ?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data sukses diinput!",
      no: null,
      nama: req.body.nama,
      usia: req.body.usia
    });
  });
});

app.get("/data/knight", function(req, res) {
  var sql = "SELECT * FROM knight";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/data/knight", function(req, res) {
  console.log(req.body);
  var data = { nama: req.body.nama, usia: req.body.usia };
  var sql = "INSERT INTO knight SET ?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data sukses diinput!",
      no: null,
      nama: req.body.nama,
      usia: req.body.usia
    });
  });
});

app.listen(3210, () => {
  console.log("Server aktif di port 3210");
});
