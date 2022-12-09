
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




const fs = require("fs");
const { parse } = require("csv-parse");


//  Read in the csv file with all the people
fs.createReadStream("./people.csv")
  .pipe(parse({ delimiter: ",", from_line: 1, relax_quotes: true}))
  .on("data", function (row) {
    
    
    const birth = new Date(row[1].trim());
    //console.log('birth = ' + birth);
    const death = new Date(row[2].trim());
    //console.log('death = ' + death);
    const daysLived = ((death - birth) / (1000 * 60 * 60 * 24));
    //console.log('daysLived = ' + daysLived);
    const person = new personModel({
      name: row[0].trim(),
      birth: birth,
      death: death,
      daysLived: daysLived,
      link: row[3].trim()
    });
    try {
      person.save();
    } catch (error) {
      console.log("Error saving " + person.name);
      console.log(error);
    }
    
    console.log("Saved " + row[0].trim());
    
  
    /*
      let birthDate = 
      let deathDate = new Date();
      let d = (deathDate - birthDate) / (1000 * 60 * 60 * 24);
      //const person = { name: row[0], birth: birthDate, death: deathDate, link: row[3]};
      const person = { name: row[0], birth: birthDate, death: deathDate, daysLived: d, link: row[3].trim()};
      //console.log(row);
      console.log(person);
    */
  });

  
