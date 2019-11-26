"use strict";

const loadBeverageLogs = function() {
  let doesFileExists = fs.existsSync("./logs.json");
  if (!doesFileExists) {
    return {};
  }
  let file = fs.readFileSync("./logs.json", "utf8");
  let beverageLogs = JSON.parse(file);
  return beverageLogs;
};
exports.loadBeverageLogs = loadBeverageLogs;
