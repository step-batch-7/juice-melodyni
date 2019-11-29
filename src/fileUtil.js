"use strict";
const fs = require("fs");

const writeOnToFile = function(fileOperation, beverageRecords) {
  let fileContent = JSON.stringify(beverageRecords);
  fileOperation.writer(fileOperation.path, fileContent, fileOperation.code);
};

const readFromFile = function(fileOperation) {
  return fileOperation.reader(fileOperation.path, fileOperation.code);
};

const doesFileExist = function(fileOperation) {
  return fileOperation.fileExist(fileOperation.path);
};

const LoadTransactions = function(fileOperation) {
  let fileContent = "{}";
  let fileExistStatus = doesFileExist(fileOperation);
  if (fileExistStatus) {
    fileContent = readFromFile(fileOperation);
  }
  let beverageRecords = JSON.parse(fileContent);
  return beverageRecords;
};

exports.writeOnToFile = writeOnToFile;
exports.LoadTransactions = LoadTransactions;
