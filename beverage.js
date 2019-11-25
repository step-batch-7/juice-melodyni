"use strict";
let fs = require("fs");
const saveTransaction = require("./src/beverageLib").saveTransaction;
const query = require("./src/beverageLib").query;
const getPaired = require("./src/utilities").getPaired;
const getValue = require("./src/utilities").getValue;
const displayForSave = require("./src/beverageLib").displayForSave;

const loadBeverageLogs = function() {
  let doesFileExists = fs.existsSync("./logs.json");
  if (!doesFileExists) {
    return {};
  }
  let file = fs.readFileSync("./logs.json", "utf8");
  let beverageLogs = JSON.parse(file);
  return beverageLogs;
};

const main = function() {
  let userArg = process.argv.slice(2);
  let operationArg = userArg.slice(1);
  let optionWithArg = operationArg.reduce(getPaired, []);

  let commands = { "--save": saveTransaction, "--query": query };
  let display = { "--save": displayForSave, "--query": "displayForQuery" };

  let userCmd = commands[userArg[0]];
  let displayTransaction = display[userArg[0]];
  let beverageName = getValue(optionWithArg, "--beverage");
  let empID = getValue(optionWithArg, "--empID");
  let qty = Number(getValue(optionWithArg, "--qty"));
  let beverageLogs = loadBeverageLogs();

  beverageLogs = userCmd(beverageLogs, empID, beverageName, qty);
  //let transactionStatus = displayTransaction(beverageLogs, empID);
  console.log("Anna Juice Ltd");
  console.log(beverageLogs);
};

main();
