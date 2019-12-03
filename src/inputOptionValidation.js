"use strict";

const isCmdOptionVld = function(command) {
  return command == "--save" || "--query";
};

const checkValidCondition = function(userArg) {
  const options = {
    "--query": ["--beverage", "--empId", "--qty", "--date"],
    "--save": ["--beverage", "--empId", "--qty"]
  };
  return options[userArg];
};

const isInputValid = function(userArg) {
  let isInputVld;
  if (isCmdOptionVld(userArg[0])) {
    const requiredArgs = checkValidCondition(userArg[0]);
    if (userArg == "--save") {
      isInputVld = requiredArgs.every(args => userArg.includes(args));
    }
    isInputVld = requiredArgs.some(args => userArg.includes(args));
  }
  return isInputVld;
};

exports.isInputValid = isInputValid;
