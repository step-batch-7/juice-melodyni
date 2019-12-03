"use strict";
const find = function(table, key) {
  return table.find(function(e) {
    return e[0] == key;
  });
};

const getValue = function(table, key) {
  let e = find(table, key);
  if (e) {
    return e[1];
  }
};

const getPaired = function(paired, elm, idx) {
  if (idx % 2 == 0) {
    paired.push([elm]);
    return paired;
  }
  paired[paired.length - 1].push(elm);
  return paired;
};

const insertEmpID = function(empId) {
  return function(order) {
    order["empId"] = +empId;
    return order;
  };
};

const getAllTransactions = function(beverageRecord) {
  let allTransactions = [];
  for (let empId in beverageRecord) {
    let empTransactions = beverageRecord[empId]["orders"];
    let empAllTransactions = empTransactions.map(insertEmpID(empId));
    allTransactions = allTransactions.concat(empAllTransactions);
  }
  return allTransactions;
};

exports.getPaired = getPaired;
exports.getValue = getValue;
exports.find = find;
exports.insertEmpID = insertEmpID;
exports.getAllTransactions = getAllTransactions;
