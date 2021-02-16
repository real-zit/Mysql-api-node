const express = require("express");
const mysql = require("mysql");

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

// Create Database
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

// Create Table
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected");
  //   let sql = "ALTER TABLE customer ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  //
  /* let sql = "INSERT INTO customer (name, address) VALUES ?";
  let values = [
    ["John", "Highway 71"],
    ["Peter", "Lowstreet 4"],
    ["Amy", "Apple st 652"],
    ["Hannah", "Mountain 21"],
    ["Michael", "Valley 345"],
    ["Sandy", "Ocean blvd 2"],
    ["Betty", "Green Grass 1"],
    ["Richard", "Sky st 331"],
    ["Susan", "One way 98"],
    ["Vicky", "Yellow Garden 2"],
    ["Ben", "Park Lane 38"],
    ["William", "Central st 954"],
    ["Chuck", "Main Road 989"],
    ["Viola", "Sideway 1633"],
  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(" Number of  records add");
  });
  */
});

app.get("/", (req, res) => {
  //   res.send("Hello");
  con.query("SELECT * FROM customer", (err, result, fields) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log(fields);
  });
});

app.get("customer/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let sql = "SELECT name FROM customer WHERE id=?";
  con.query(sql, [id], (err, result, fields) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(fields);
    console.log(fields);
  });
});

app.post("/post", (req, res) => {
  let sql = "INSERT INTO customer (name, address) VALUES ('raju', 'Guwahati')";
  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    console.log("Record inserted");
  });
});

app.get("/del/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM customer WHERE id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    console.log("data deleted");
  });
});

// update data
app.put("/customer/:id", (req, res) => {
  let id = req.params.id;
  let sql =
    "UPDATE customer SET address = 'Kotahbari' WHERE address='Valley 345'";
  con.query(sql, [id], (err, result) => {
    if (err) {
      res.status(400).json(err);
    }
    console.log("Data Updated");
  });
});

app.listen(3000, () => {
  console.log("Server started");
});

con.end();
