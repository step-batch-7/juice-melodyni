"use strict";
const assert = require("assert");
const getValue = require("../src/utilities").getValue;
const getPaired = require("../src/utilities").getPaired;

describe("testGetValue", function() {
  it("should get the value of the given key", function() {
    let actual = getValue([["--beverage", "orange"]], "--beverage");
    assert.strictEqual(actual, "orange");
  });
  it("should give undefined for the key which is not available in array", function() {
    let actual = getValue([["--bev", "watermelon"]], "--beverage");
    assert.strictEqual(actual, undefined);
  });
});

describe("getPaired", function() {
  it("should make pair of the elements of the array", function() {
    let array = ["--beverage", "orange", "--empID", "1234"];
    let actual = array.reduce(getPaired, []);
    assert.deepStrictEqual(actual, [
      ["--beverage", "orange"],
      ["--empID", "1234"]
    ]);
  });
});
