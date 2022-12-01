const fs = require("fs");
const { parse } = require("csv-parse");


//  Read in the csv file with all the people
fs.createReadStream("./people.csv")
  .pipe(parse({ delimiter: ",", from_line: 1, relax_quotes: true}))
  .on("data", function (row) {
      let birthDate = new Date(row[1].trim());
      let deathDate = new Date(row[2].trim());
      let d = (deathDate - birthDate) / (1000 * 60 * 60 * 24);
      //const person = { name: row[0], birth: birthDate, death: deathDate, link: row[3]};
      const person = { name: row[0], birth: birthDate, death: deathDate, daysLived: d, link: row[3].trim()};
      //console.log(row);
      console.log(person);
  })

  
