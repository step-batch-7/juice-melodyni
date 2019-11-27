"use strict";
const fs = require("fs");
const getPaired = require("./utilities").getPaired;
const getValue = require("./utilities").getValue;
const writeOnToFile = require("./fileUtil").writeOnToFile;

const getFileOperation = function() {
  let fileUtils = {
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    fileExist: fs.existsSync,
    path: "./logs.json",
    code: "utf8"
  };
  return fileUtils;
};

const saveTransaction = function(
  beverageRecords,
  newOrder,
  date,
  fileOperation
) {
  let empNewOrder = {
    beverage: newOrder["beverage"],
    quantity: newOrder["quantity"],
    date: date
  };
  if (!beverageRecords.hasOwnProperty(newOrder["empID"])) {
    beverageRecords[newOrder["empID"]] = { orders: [] };
  }
  beverageRecords[newOrder["empID"]]["orders"].push(empNewOrder);
  writeOnToFile(fileOperation, beverageRecords);
  return beverageRecords;
};
const parseArg = function(optionWithArg) {
  let newOrder = {};
  newOrder["beverage"] = getValue(optionWithArg, "--beverage");
  newOrder["quantity"] = Number(getValue(optionWithArg, "--qty"));
  newOrder["empID"] = getValue(optionWithArg, "--empID");
  return newOrder;
};

const fetchTransaction = function(beverageRecords, newOrder) {
  let empTransactions = beverageRecords[newOrder["empID"]]["orders"];
  let totalOrderedBeverage = getTotalBeverageCount(empTransactions);
  empTransactions.push(totalOrderedBeverage);
  return empTransactions;
};

const getTotalBeverageCount = function(empTransactions) {
  let totalBeverageCount = empTransactions.reduce(add, 0);
  return totalBeverageCount;
};

const add = function(totalQuantity, order) {
  totalQuantity = order.quantity + totalQuantity;
  return totalQuantity;
};

const displayForSave = function(beverageRecords, empID) {
  let status = "Transaction Recorded:";
  let title = "EmployeeID, Beverage, Quantity, date";
  let ordersfields = beverageRecords[empID]["orders"][0];
  let transactionDetail = [
    empID,
    ordersfields["beverage"],
    ordersfields["quantity"],
    ordersfields["date"]
  ].join(",");
  let transactionStatus = [status, title, transactionDetail].join("\n");
  return transactionStatus;
};

const convertToString = function(empID) {
  return function(order) {
    return [empID, order.beverage, order.quantity, order.date].join(",");
  };
};

const displayForQuery = function(empbeverageRecords, empID) {
  let title = "EmployeeID, Beverage, Quantity, date";
  let totalCount = empbeverageRecords.pop();
  let totalJuiceMessage = ["Total:", totalCount, "Juices"].join(" ");
  let transactionDetail = empbeverageRecords.map(convertToString(empID));
  let transactions = transactionDetail.join("\n");
  let transactionStatus = [title, transactions, totalJuiceMessage].join("\n");
  return transactionStatus;
};
const getActionReference = function(referenceKey) {
  let commands = {
    "--save": saveTransaction,
    "--query": fetchTransaction
  };
  return commands[referenceKey];
};

const getDisplayReference = function(referenceKey) {
  let display = {
    "--save": displayForSave,
    "--query": displayForQuery
  };
  return display[referenceKey];
};

exports.saveTransaction = saveTransaction;
exports.fetchTransaction = fetchTransaction;
exports.parseArg = parseArg;
exports.getTotalBeverageCount = getTotalBeverageCount;
exports.displayForSave = displayForSave;
exports.displayForQuery = displayForQuery;
exports.getActionReference = getActionReference;
exports.getDisplayReference = getDisplayReference;
exports.getFileOperation = getFileOperation;
