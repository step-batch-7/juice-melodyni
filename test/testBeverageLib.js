"use strict";
const assert = require("assert");
let file = "../src/beverageLib";
const saveTransaction = require(file).saveTransaction;
const query = require(file).query;
const getTotalBeverageCount = require(file).getTotalBeverageCount;
const getdate = require(file).getdate;
const displayForSave = require(file).displayForSave;
const parseArg = require(file).parseArg;

describe("parseArg", function() {
  it("should parse arguments into object fields", function() {
    let userArg = [
      ["--beverage", "orange"],
      ["--qty", "1"]
    ];
    let actual = parseArg(userArg);
    let expected = {
      beverage: "orange",
      quantity: 1
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("saveTransaction", function() {
  it("should make another Object for non existing employee", function() {
    let newOrder = {
      beverage: "orange",
      quantity: 1
    };
    let actual = saveTransaction({}, 111, newOrder);
    let expected = {
      111: {
        orders: [
          {
            beverage: "orange",
            quantity: 1,
            date: actual["111"].orders[0]["date"]
          }
        ]
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should add current order with the existing operationArg for existing employee", function() {
    let existingoperationArg = {
      123: {
        orders: [{ beverage: "orange", quantity: 1, date: "11:00" }]
      }
    };
    let newOrder = {
      beverage: "watermelon",
      quantity: 2
    };
    let actual = saveTransaction(existingoperationArg, 123, newOrder);
    let expected = {
      123: {
        orders: [
          { beverage: "orange", quantity: 1, date: "11:00" },
          {
            beverage: "watermelon",
            quantity: 2,
            date: actual["123"]["orders"][1]["date"]
          }
        ]
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getTotalBeverageCount", function() {
  let logs = [
    { beverage: "watermelon", quantity: 1 },
    { beverage: "orange", quantity: 1 },
    { beverage: "orange", quantity: 2 }
  ];
  let actual = getTotalBeverageCount(logs);
  it("should add field quantity of each object of given array", function() {
    assert.strictEqual(actual, 4);
  });
});

describe("query", function() {
  it("should give order and totalBeverageCount details of given employee", function() {
    let logs = {
      123: {
        orders: [
          { beverage: "orange", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      },
      111: {
        orders: [
          { beverage: "orange", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      }
    };
    let expected = [
      { beverage: "orange", quantity: 2, date: "12:45" },
      { beverage: "watermelon", quantity: 1, date: "1:12" },
      3
    ];
    let actual = query(logs, 123);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("displayForSave", function() {
  it("should return fieldss in string", function() {
    let logs = {
      "123": {
        orders: [{ beverage: "orange", quantity: 1, date: "11:00" }]
      }
    };
    let actual = displayForSave(logs, 123);
    let status = "Transaction Recorded:";
    let title = "EmployeeID, Beverage, Quantity, date";
    let ordersfields = logs["123"]["orders"][0];
    let detail =
      "123" +
      ", " +
      ordersfields["beverage"] +
      ", " +
      ordersfields["quantity"] +
      ", " +
      ordersfields["date"];
    let expected = status + "\n" + title + "\n" + detail;
    assert.strictEqual(actual, expected);
  });
});
