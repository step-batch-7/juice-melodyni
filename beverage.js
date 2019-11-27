"use strict";
let fs = require("fs");
let date = new Date();
const lib = require("./src/beverageLib");
const util = require("./src/utilities");
const loadBeverageTransactions = require("./src/fileUtil")
  .loadBeverageTransactions;

const main = function() {
  let operationArg = process.argv.slice(3);
  let optionWithArg = operationArg.reduce(util.getPaired, []);
  let newOrder = lib.parseArg(optionWithArg);
  let empID = util.getValue(optionWithArg, "--empID");

  let userCmd = lib.getActionReference(process.argv[2]);
  let displayTransaction = lib.getDisplayReference(process.argv[2]);
  let beverageRecords = loadBeverageTransactions();

  beverageRecords = userCmd(beverageRecords, empID, newOrder, date);
  let transactionStatus = displayTransaction(beverageRecords, empID);
  console.log("Anna Juice Ltd");
  console.log(transactionStatus);
};

main();
