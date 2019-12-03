"use strict";
const config = require("../src/config");
const assert = require("assert");
const { timeStamp, getDataStorePath } = config;

describe("getDataStorePath", function() {
  it("should pick the path from the env variable", () => {
    const env = { path: "./appTest/JUICE_MELODYNI_WRITE_ONLY.json" };
    assert.strictEqual(
      getDataStorePath(env),
      "./appTest/JUICE_MELODYNI_WRITE_ONLY.json"
    );
  });
  it("should give default path when not configured", () => {
    const env = {};
    assert.strictEqual(getDataStorePath(env), "./logs.json");
  });
});

describe("timeStamp", function() {
  it("should give current time by default", function() {
    assert.deepStrictEqual(timeStamp({}), new Date());
  });
  it("should give stubbed time from env variable", function() {
    const stubbedDate = new Date("2019-12-03");
    const env = { date: stubbedDate };
    assert.deepStrictEqual(timeStamp(env), stubbedDate);
  });
});
