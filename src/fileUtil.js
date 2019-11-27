"use strict";
const fs = require("fs");

const writeOnToFile = function(filePath, beverageRecords) {
  fs.writeFileSync(filePath, JSON.stringify(beverageRecords), "utf8");
};

const readFromFile = function(filePath) {
  return fs.readFileSync(filePath, "utf8");
};

const isFileEmpty = function(filePath) {
  let content = readFromFile(filePath);
  return content == "";
};

const doesFileExist = function(filePath) {
  return fs.existsSync(filePath);
};

const loadBeverageTransactions = function() {
  let fileContent = "{}";
  let filePath = "./logs.json";
  let fileExistStatus = doesFileExist(filePath);
  let fileEmptyStatus = isFileEmpty(filePath);
  if (fileExistStatus && !fileEmptyStatus) {
    fileContent = readFromFile(filePath);
  }
  let beverageRecords = JSON.parse(fileContent);
  return beverageRecords;
};

exports.writeOnToFile = writeOnToFile;
exports.loadBeverageTransactions = loadBeverageTransactions;
