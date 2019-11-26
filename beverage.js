"use strict";
let fs = require("fs");
const saveTransaction = require("./src/beverageLib").saveTransaction;
const fetchTransaction = require("./src/beverageLib").fetchTransaction;
const getPaired = require("./src/utilities").getPaired;
const parseArg = require("./src/beverageLib").parseArg;
const getValue = require("./src/utilities").getValue;
const displayForSave = require("./src/beverageLib").displayForSave;
const displayForQuery = require("./src/beverageLib").displayForQuery;
const loadBeverageLogs = require("./src/fileUtil").loadBeverageLogs;

const main = function() {
  let commands = { "--save": saveTransaction, "--query": fetchTransaction };
  let display = { "--save": displayForSave, "--query": displayForQuery };

  let operationArg = process.argv.slice(3);
  let optionWithArg = operationArg.reduce(getPaired, []);
  let newOrder = parseArg(optionWithArg);
  let empID = getValue(optionWithArg, "--empID");

  let userCmd = commands[process.argv[2]];
  let displayTransaction = display[process.argv[2]];
  let beverageLogs = loadBeverageLogs();

  beverageLogs = userCmd(beverageLogs, empID, newOrder);
  let transactionStatus = displayTransaction(beverageLogs, empID);
  console.log("Anna Juice Ltd");
  console.log(transactionStatus);
};

main();
