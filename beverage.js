"use strict";
let fs = require("fs");
const saveTransaction = require("./src/beverageLib").saveTransaction;
const query = require("./src/beverageLib").query;
const getPaired = require("./src/utilities").getPaired;
const parseArg = require("./src/beverageLib").parseArg;
const displayForSave = require("./src/beverageLib").displayForSave;
const loadBeverageLogs = require("./src/fileUtil").loadBeverageLogs;

const main = function() {
  let commands = { "--save": saveTransaction, "--query": query };
  let display = { "--save": displayForSave, "--query": "displayForQuery" };

  let operationArg = process.argv(3);
  let optionWithArg = operationArg.reduce(getPaired, []);
  let newOrder = parseArg(optionWithArg);
  let empID = newOrder[empID];

  let userCmd = commands[process.argv(2)];
  let displayTransaction = display[process.argv(2)];
  let beverageLogs = loadBeverageLogs();

  beverageLogs = userCmd(beverageLogs, empID, newOrder);
  //let transactionStatus = displayTransaction(beverageLogs, empID);
  console.log("Anna Juice Ltd");
  console.log(beverageLogs);
};

main();
