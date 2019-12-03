"use strict";
const assert = require("assert");
const isInputValid = require("../src/inputOptionValidation").isInputValid;
describe("isInputValid", () => {
  it("should validate for valid inputs", () => {
    assert.ok(
      isInputValid([
        "--save",
        "--beverage",
        "Orange",
        "--empId",
        "1234",
        "--qty",
        "1"
      ])
    );
  });
  it("should validate for valid inputs", () => {
    assert.ok(
      isInputValid(["--query", "--beverage", "Orange", "--empId", "1234"])
    );
  });
});
