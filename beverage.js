"use strict";
let fs = require("fs");
const lib = require("./src/beverageLib");
const util = require("./src/utilities");
const LoadTransactions = require("./src/fileUtil").LoadTransactions;
const { getDataStorePath, timeStamp } = require("./src/config");

const main = function() {
  let date = timeStamp(process.env);
  let filePath = getDataStorePath(process.env);
  let optionWithArg = process.argv.slice(3).reduce(util.getPaired, []);
  let newOrder = lib.parseArg(optionWithArg);
  let empId = util.getValue(optionWithArg, "--empId");

  let userCmd = lib.getActionReference(process.argv.slice(2));
  let fileOperation = lib.getFileOperation(filePath);
  let beverageRecords = LoadTransactions(fileOperation);

  beverageRecords = userCmd(beverageRecords, newOrder, date, fileOperation);
  console.log(beverageRecords);
};

main();
