"use strict";
const assert = require("assert");
const util = require("../src/utilities");

describe("insertEmpID", function() {
  it("should insert a key of empId in the object", function() {
    let order = { beverage: "orange", quantity: 1, date: "28/11/2019" };
    let expected = {
      beverage: "orange",
      quantity: 1,
      date: "28/11/2019",
      empId: 123
    };
    let insertInTo = util.insertEmpID(123);
    assert.deepStrictEqual(insertInTo(order), expected);
  });
});

describe("getAllTransaction", function() {
  it("should give array of all transactions having empId in it", function() {
    let beverageRecord = {
      "111": {
        orders: [{ beverage: "Watermelon", quantity: 2, date: "28/11/2019" }]
      },
      "123": {
        orders: [{ beverage: "Orange", quantity: 1, date: "28/Nov/2019" }]
      }
    };
    let actual = util.getAllTransactions(beverageRecord);
    let expected = [
      { beverage: "Watermelon", quantity: 2, date: "28/11/2019", empId: 111 },
      { beverage: "Orange", quantity: 1, date: "28/Nov/2019", empId: 123 }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testGetValue", function() {
  it("should get the value of the given key", function() {
    let actual = util.getValue([["--beverage", "orange"]], "--beverage");
    assert.strictEqual(actual, "orange");
  });
  it("should give undefined for the key which is not available in array", function() {
    let actual = util.getValue([["--bev", "watermelon"]], "--beverage");
    assert.strictEqual(actual, undefined);
  });
});

describe("getPaired", function() {
  it("should make pair of the elements of the array", function() {
    let array = ["--beverage", "orange", "--empId", "1234"];
    let actual = array.reduce(util.getPaired, []);
    assert.deepStrictEqual(actual, [
      ["--beverage", "orange"],
      ["--empId", "1234"]
    ]);
  });
});
