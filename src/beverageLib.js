"use strict";
const fs = require("fs");
const getPaired = require("./utilities").getPaired;
const getValue = require("./utilities").getValue;

const writeOnToFile = function(path, beverageLogs) {
  fs.writeFileSync(path, JSON.stringify(beverageLogs), "utf8");
};

const parseArg = function(optionWithArg) {
  let newOrder = {};
  newOrder["beverage"] = getValue(optionWithArg, "--beverage");
  newOrder["quantity"] = Number(getValue(optionWithArg, "--qty"));
  return newOrder;
};

const saveTransaction = function(beverageLogs, empID, newOrder) {
  let orderEntrydate = new Date();
  newOrder["date"] = orderEntrydate;
  if (!beverageLogs.hasOwnProperty(empID)) {
    beverageLogs[empID] = { orders: [] };
  }
  beverageLogs[empID]["orders"].push(newOrder);
  writeOnToFile("./logs.json", beverageLogs);
  return beverageLogs;
};

const query = function(beverageLogs, empID) {
  let empTransactions = beverageLogs[empID]["orders"];
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

const displayForSave = function(beverageLogs, empID) {
  let status = "Transaction Recorded:";
  let title = "EmployeeID, Beverage, Quantity, date";
  let ordersfields = beverageLogs[empID]["orders"][0];
  let detail =
    empID +
    ", " +
    ordersfields["beverage"] +
    ", " +
    ordersfields["quantity"] +
    ", " +
    ordersfields["date"];
  let transactionStatus = status + "\n" + title + "\n" + detail;
  return transactionStatus;
};

exports.saveTransaction = saveTransaction;
exports.query = query;
exports.parseArg = parseArg;
exports.getTotalBeverageCount = getTotalBeverageCount;
exports.displayForSave = displayForSave;
//exports.displayForQuery = displayForQuery;
