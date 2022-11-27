const fs = require("fs");
const { parse } = require("csv-parse");


//  Read in the csv file with all the people
fs.createReadStream("./people.csv")
  .pipe(parse({ delimiter: ",", from_line: 1, relax_quotes: true}))
  .on("data", function (row) {
      let birthDate = new Date(row[1]);
      let deathDate = new Date(row[2]);
      const person = { name: row[0], birth: birthDate, death: deathDate, link: row[3]};
      //console.log(row);
      console.log(person);
  })
  
