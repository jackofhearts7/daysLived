const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.conntect('mongodb://localhost:27017/people', {
  useUnifiedTopology: true,
  useNewURLParser: true,
});


/*
    Startup routine. Check
    - ability to connect to db (w/ messages about how to correct)
    - presence of daysLived db - if not present, create and notify
    - presence of persons collection - if not present, create and notify
    - presence of daysLived collection - if not present, create and notify
    - presence of any persons in the persons collection - if not recommend running populateDb.js
    
*/