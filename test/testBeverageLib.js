"use strict";
const assert = require("assert");
const save = require("../src/beverageLib").save;
const getDate = require("../src/beverageLib").getDate;
describe("save", function() {
  it("should make another Object for non existing employee", function() {
    let actual = save({}, 123, "orange", 1);
    let expected = {
      123: {
        orders: [
          {
            beverage: "orange",
            quantity: 1,
            time: actual["123"].orders[0]["time"]
          }
        ],
        total: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should add current order with the existing data for existing employee", function() {
    let existingData = {
      123: {
        orders: [{ beverage: "orange", quantity: 1, time: "11:00" }],
        total: 1
      }
    };
    let actual = save(existingData, 123, "watermelon", 2);
    let expected = {
      123: {
        orders: [
          { beverage: "orange", quantity: 1, time: "11:00" },
          {
            beverage: "watermelon",
            quantity: 2,
            time: actual["123"]["orders"][1]["time"]
          }
        ],
        total: 3
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});
