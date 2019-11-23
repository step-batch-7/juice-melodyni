"use strict";
const save = function(beverageLogs, empID, beverageName, qty) {
  let entryTime = new Date();
  let newOrder = { beverage: beverageName, quantity: qty, time: entryTime };
  if (beverageLogs[empID] == undefined) {
    beverageLogs[empID] = { orders: [], total: 0 };
  }
  beverageLogs[empID]["orders"].push(newOrder);
  beverageLogs[empID]["total"] += qty;

  return beverageLogs;
};

exports.save = save;
