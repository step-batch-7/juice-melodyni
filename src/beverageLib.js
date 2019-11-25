"use strict";

const writeOnToFile = function(path, beverageLogs) {
  fs.writeFileSync(path, JSON.stringify(beverageLogs), "utf8");
};

const fs = require("fs");
const saveTransaction = function(beverageLogs, empID, beverageName, qty) {
  let entryTime = new Date();
  let newOrder = { beverage: beverageName, quantity: qty, time: entryTime };
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
  let title = "EmployeeID, Beverage, Quantity, Date";
  let ordersFeild = beverageLogs[empID]["orders"][0];
  let detail =
    empID +
    ", " +
    ordersFeild["beverage"] +
    ", " +
    ordersFeild["quantity"] +
    ", " +
    ordersFeild["time"];
  let transactionStatus = status + "\n" + title + "\n" + detail;
  return transactionStatus;
};

exports.saveTransaction = saveTransaction;
exports.query = query;
exports.getTotalBeverageCount = getTotalBeverageCount;
exports.displayForSave = displayForSave;
//exports.displayForQuery = displayForQuery;
