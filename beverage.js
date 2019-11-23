"use strict";
let fs = require("fs");
const save = require("./src/beverageLib").save;

const main = function() {
  let doesFileExists = fs.existsSync("./logs.json");
  if (!doesFileExists) {
    fs.writeFileSync("./logs.json", "{}", "utf8");
  }
  let file = fs.readFileSync("./logs.json", "utf8");
  let data = [
    "--save",
    "--beverage",
    "watermelon",
    "--empID",
    "9999",
    "--qty",
    "1"
  ];
  let commands = { "--save": save, "--query": "query" };

  let userCmd = commands[data[0]];
  let beverageName = data[2];
  let empID = data[4];
  let qty = Number(data[6]);

  let beverageLogs = JSON.parse(file);
  beverageLogs = userCmd(beverageLogs, empID, beverageName, qty);
  fs.writeFileSync("./logs.json", JSON.stringify(beverageLogs), "utf8");
  console.log("Anna Juice Ltd");
};

main();
