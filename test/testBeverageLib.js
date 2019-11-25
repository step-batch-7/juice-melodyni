"use strict";
const assert = require("assert");
const saveTransaction = require("../src/beverageLib").saveTransaction;
const query = require("../src/beverageLib").query;
const getTotalBeverageCount = require("../src/beverageLib")
  .getTotalBeverageCount;
const getDate = require("../src/beverageLib").getDate;
const displayForSave = require("../src/beverageLib").displayForSave;

describe("saveTransaction", function() {
  it("should make another Object for non existing employee", function() {
    let actual = saveTransaction({}, 123, "orange", 1);
    let expected = {
      123: {
        orders: [
          {
            beverage: "orange",
            quantity: 1,
            time: actual["123"].orders[0]["time"]
          }
        ]
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should add current order with the existing operationArg for existing employee", function() {
    let existingoperationArg = {
      123: {
        orders: [{ beverage: "orange", quantity: 1, time: "11:00" }]
      }
    };
    let actual = saveTransaction(existingoperationArg, 123, "watermelon", 2);
    let expected = {
      123: {
        orders: [
          { beverage: "orange", quantity: 1, time: "11:00" },
          {
            beverage: "watermelon",
            quantity: 2,
            time: actual["123"]["orders"][1]["time"]
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
          { beverage: "orange", quantity: 2, time: "12:45" },
          { beverage: "watermelon", quantity: 1, time: "1:12" }
        ]
      },
      111: {
        orders: [
          { beverage: "orange", quantity: 2, time: "12:45" },
          { beverage: "watermelon", quantity: 1, time: "1:12" }
        ]
      }
    };
    let expected = [
      { beverage: "orange", quantity: 2, time: "12:45" },
      { beverage: "watermelon", quantity: 1, time: "1:12" },
      3
    ];
    let actual = query(logs, 123);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("displayForSave", function() {
  it("should return feilds in string", function() {
    let logs = {
      "123": {
        orders: [{ beverage: "orange", quantity: 1, time: "11:00" }]
      }
    };
    let actual = displayForSave(logs, 123);
    let status = "Transaction Recorded:";
    let title = "EmployeeID, Beverage, Quantity, Date";
    let ordersFeild = logs["123"]["orders"][0];
    let detail =
      "123" +
      ", " +
      ordersFeild["beverage"] +
      ", " +
      ordersFeild["quantity"] +
      ", " +
      ordersFeild["time"];
    let expected = status + "\n" + title + "\n" + detail;
    assert.strictEqual(actual, expected);
  });
});
