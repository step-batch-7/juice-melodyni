"use strict";
const fileUtil = require("../src/fileUtil");
const assert = require("assert");

describe("LoadTransactions", function() {
  it("should load transactions from the file", function() {
    const readFile = function(path, code) {
      assert.strictEqual(path, "path");
      assert.strictEqual(code, "utf8");
      return "{}";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileOperation = {
      reader: readFile,
      fileExist: existsFile,
      path: "path",
      code: "utf8"
    };
    let actual = fileUtil.LoadTransactions(fileOperation);
    assert.deepStrictEqual(actual, {});
  });
  it("should return empty object if file doesn't exits", function() {
    const readFile = function(path, code) {
      assert.strictEqual(path, "path");
      assert.strictEqual(code, "utf8");
      return "{}";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const fileOperation = {
      reader: readFile,
      fileExist: existsFile,
      path: "path",
      code: "utf8"
    };
    let actual = fileUtil.LoadTransactions(fileOperation);
    assert.deepStrictEqual(actual, {});
  });
});
