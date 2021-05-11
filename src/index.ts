import "reflect-metadata";
import { createConnection } from "typeorm";
import { Movie } from "./entity/Movie";
import { processLine } from "./processLine";
import * as readline from "readline";
import * as fs from "fs";

createConnection()
  .then(async (connection) => {
    // Read file line by line
    const file = readline.createInterface({
      input: fs.createReadStream("./data/movies.tsv"),
      output: process.stdout,
      terminal: false,
    });

    let isFirstLine = true;
    file.on("line", (line) => {
      // Avoid reading column names (the first line of the tsv file)
      if (!isFirstLine) {
        processLine(line);
      } else {
        isFirstLine = false;
      }
    });
  })
  .catch((error) => console.log(error));
