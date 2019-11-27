"use strict";
let fs = require("fs");
const lib = require("./src/beverageLib");
const util = require("./src/utilities");
const LoadTransactions = require("./src/fileUtil").LoadTransactions;

const main = function() {
  let date = new Date();
  let optionWithArg = process.argv.slice(3).reduce(util.getPaired, []);
  let newOrder = lib.parseArg(optionWithArg);
  let empID = util.getValue(optionWithArg, "--empID");

  let userCmd = lib.getActionReference(process.argv[2]);
  let displayTransaction = lib.getDisplayReference(process.argv[2]);
  let fileOperation = lib.getFileOperation();
  let beverageRecords = LoadTransactions(fileOperation);

  beverageRecords = userCmd(beverageRecords, newOrder, date, fileOperation);
  let transactionStatus = displayTransaction(beverageRecords, empID);
  console.log("Anna Juice Ltd\n");
  console.log(transactionStatus);
};

main();
