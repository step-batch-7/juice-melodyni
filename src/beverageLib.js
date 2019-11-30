"use strict";
const fs = require("fs");
const getPaired = require("./utilities").getPaired;
const getValue = require("./utilities").getValue;
const writeOnToFile = require("./fileUtil").writeOnToFile;
const getAllTransactions = require("./utilities").getAllTransactions;

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
  if (!beverageRecords.hasOwnProperty(newOrder["empId"])) {
    beverageRecords[newOrder["empId"]] = { orders: [] };
  }
  beverageRecords[newOrder["empId"]]["orders"].push(empNewOrder);
  writeOnToFile(fileOperation, beverageRecords);
  let transaction = displayForSave(newOrder, date);
  return transaction;
};
const parseArg = function(optionWithArg) {
  let newOrder = {};
  newOrder["beverage"] = getValue(optionWithArg, "--beverage");
  newOrder["quantity"] = Number(getValue(optionWithArg, "--qty"));
  newOrder["empId"] = getValue(optionWithArg, "--empId");
  newOrder["date"] = getValue(optionWithArg, "--date");
  return newOrder;
};

const filterBy = function(newOrder) {
  return function(transaction) {
    let empId = newOrder["empId"] || transaction["empId"];
    let beverage = newOrder["beverage"] || transaction["beverage"];
    let date = newOrder["date"] || transaction["date"].slice(0, 10);
    let quantity = newOrder["quantity"] || transaction["quantity"];
    const validDate = date == transaction["date"].slice(0, 10);
    const validEmpID = empId == transaction["empId"];
    const validBeverage = beverage == transaction["beverage"];
    const validQuantity = quantity == transaction["quantity"];
    return validBeverage && validEmpID && validDate && validQuantity;
  };
};

const fetchTransaction = function(beverageRecords, newOrder) {
  let allTransactions = getAllTransactions(beverageRecords);
  let requiredTransactions = allTransactions.filter(filterBy(newOrder));
  let totalBeverageCount = getTotalBeverageCount(requiredTransactions);
  requiredTransactions.push(totalBeverageCount);
  let transactions = displayForQuery(requiredTransactions);
  return transactions;
};

const getTotalBeverageCount = function(empTransactions) {
  let totalBeverageCount = empTransactions.reduce(add, 0);
  return totalBeverageCount;
};

const add = function(totalQuantity, order) {
  totalQuantity = order.quantity + totalQuantity;
  return totalQuantity;
};

const displayForSave = function(newOrder, date) {
  let status = "Transaction Recorded:";
  let title = "EmployeeID, Beverage, Quantity, date";
  let transactionDetail = [
    newOrder.empId,
    newOrder.beverage,
    newOrder.quantity,
    date.toJSON()
  ].join(",");
  let transactionStatus = [status, title, transactionDetail].join("\n");
  return transactionStatus;
};

const convertToString = function(transaction) {
  return [
    transaction.empId,
    transaction.beverage,
    transaction.quantity,
    transaction.date
  ].join(",");
};

const displayForQuery = function(beverageRecords) {
  let title = "EmployeeID, Beverage, Quantity, date";
  let totalCount = beverageRecords.pop();
  let totalJuiceMessage = ["Total:", totalCount, "Juices"].join(" ");
  let transactionDetail = beverageRecords.map(convertToString);
  let transactionStatus = [title, ...transactionDetail, totalJuiceMessage].join(
    "\n"
  );
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
