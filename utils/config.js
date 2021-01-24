"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const jwt_decode = require("jwt-decode");
// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restfull-login-sample",
});

//create root path
const path = "/restful-login-sample";

// create function extract token
const token_decode = (token, callback) =>{
    const auth = token.split(' ')[1];
    callback(jwt_decode(auth));
}

// create function query login
const get_login = (email, pass, callback) => {
  let sql =
    "SELECT * FROM users where email='" +
    email +
    "' and password='" +
    pass +
    "'";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
};

// create function query 
const query = (sql, callback) => {
    conn.query(sql, (err, results) => {
      callback(results);
    });
};

// export function and path
module.exports = { token_decode, path, get_login, query };
