
console.log('Starting up...');
const mongoose = require('mongoose');

console.log('Connecting to the database...');
mongoose.connect('mongodb://localhost:27017/daysLived', {
  useUnifiedTopology: true,
  useNewURLParser: true,
});
//  TODO - handle case where connection fails
console.log("Successfully connected to the database.");

/*
    Startup routine. Check
    - ability to connect to db (w/ messages about how to correct)
    - presence of daysLived db - if not present, create and notify
    - presence of persons collection - if not present, create and notify
    - presence of daysLived collection - if not present, create and notify
    - presence of any persons in the persons collection - if not recommend running populateDb.js
    
*/

const personSchema = new mongoose.Schema({
  name: String,
  birth: Date,
  death: Date,
  daysLived: Number,
  link: String
});
//  To facilitate Express/Vue code in using 'id' instead of "_id"
personSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
personSchema.set('toJSON', { virtuals: true });

const personModel = new mongoose.model('persons', personSchema);


const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));


app.get('/api/persons', async (req, res) => {
  try {
    let persons = await personModel.find();
    res.send({persons: persons});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/persons', async (req, res) => {
  console.log('req.body.birth = ' + req.body.birth);
  console.log('req.body.death = ' + req.body.death);
  const birth = new Date(req.body.birth);
  console.log('birth = ' + birth);
  const death = new Date(req.body.death);
  console.log('death = ' + death);
  const daysLived = ((death - birth) / (1000 * 60 * 60 * 24));
  console.log('daysLived = ' + daysLived);
  const person = new personModel({
    name: req.body.name,
    birth: req.body.birth,
    death: req.body.death,
    daysLived: daysLived,
    link: req.body.link
  });
  try {
    await person.save();
    res.send({person:person});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);    
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  try {
    await personModel.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);    
  }
});

app.put('/api/persons/:id', async (req, res) => {
  
});

app.listen( 3000, () => console.log('Server listening on port 3000.'));
