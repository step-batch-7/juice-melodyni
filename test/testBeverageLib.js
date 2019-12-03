"use strict";
const fs = require("fs");
const assert = require("assert");
const lib = require("../src/beverageLib");

describe("getFileOperation", function() {
  it("should give an object of required fs functions, path & encoding", function() {
    let expected = {
      reader: fs.readFileSync,
      writer: fs.writeFileSync,
      fileExist: fs.existsSync,
      path: "./logs.json",
      code: "utf8"
    };
    assert.deepStrictEqual(lib.getFileOperation(), expected);
  });
});

describe("getActionReference", function() {
  it("should give reference of saveTransaction for --save option", function() {
    assert.strictEqual(lib.getActionReference("--save"), lib.saveTransaction);
  });
  it("should give reference of FetchTransaction for --query option", function() {
    assert.strictEqual(lib.getActionReference("--query"), lib.fetchTransaction);
  });
});

describe("getDisplayReference", function() {
  it("should give reference of displayForSave for --save option", function() {
    assert.strictEqual(lib.getDisplayReference("--save"), lib.displayForSave);
  });
  it("should give reference of displayforQuery for --query option ", function() {
    assert.strictEqual(lib.getDisplayReference("--query"), lib.displayForQuery);
  });
});

describe("parseArg", function() {
  it("should parse arguments into object fields", function() {
    let userArg = [
      ["--beverage", "orange"],
      ["--qty", "1"],
      ["--empId", 123],
      ["--date", "2019-11-28"]
    ];
    let actual = lib.parseArg(userArg);
    let expected = {
      beverage: "orange",
      quantity: 1,
      empId: 123,
      date: "2019-11-28"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("saveTransaction", function() {
  let mockDate = new Date();
  let writerIsCalled = 0;
  let writeFile = function(path, content, code) {
    writerIsCalled++;
    assert.strictEqual(path, "path");
    assert.strictEqual(code, "utf8");
    return;
  };
  let fileOperation = {
    writer: writeFile,
    path: "path",
    code: "utf8"
  };
  it("should make another object of transaction for non existing employee", function() {
    let newOrder = {
      beverage: "orange",
      quantity: 1,
      empId: 111
    };
    let actual = lib.saveTransaction({}, newOrder, mockDate, fileOperation);
    let status = "Transaction Recorded:";
    let title = "EmployeeID, Beverage, Quantity, date";
    let detail = [111, "orange", 1, mockDate.toJSON()].join(",");
    let expected = [status, title, detail].join("\n");
    assert.deepStrictEqual(actual, expected);
    assert.strictEqual(writerIsCalled, 1);
    writerIsCalled = 0;
  });
  it("should add current transaction with previous record for existing employee", function() {
    let existingoperationArg = {
      123: {
        orders: [{ beverage: "orange", quantity: 1, date: "11:00" }]
      }
    };
    let newOrder = { beverage: "watermelon", quantity: 2, empId: 123 };
    let actual = lib.saveTransaction(
      existingoperationArg,
      newOrder,
      mockDate,
      fileOperation
    );
    let status = "Transaction Recorded:";
    let title = "EmployeeID, Beverage, Quantity, date";
    let detail = [123, "watermelon", 2, mockDate.toJSON()].join(",");
    let expected = [status, title, detail].join("\n");

    assert.deepStrictEqual(actual, expected);
    assert.strictEqual(writerIsCalled, 1);
  });
});

describe("getTotalBeverageCount", function() {
  let logs = [
    { beverage: "watermelon", quantity: 1 },
    { beverage: "orange", quantity: 1 },
    { beverage: "orange", quantity: 2 }
  ];
  let actual = lib.getTotalBeverageCount(logs);
  it("should give the total beverage count", function() {
    assert.strictEqual(actual, 4);
  });
});

describe("fetchTransaction", function() {
  it("should club all transaction details on given empID ", function() {
    let logs = {
      111: {
        orders: [
          { beverage: "watermelon", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      },
      123: {
        orders: [
          { beverage: "orange", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      }
    };
    let title = "EmployeeID, Beverage, Quantity, date";
    let transactions = "123,orange,2,12:45\n123,watermelon,1,1:12";
    let totalJuiceMessage = ["Total:", 3, "Juices"].join(" ");
    let expected = [title, transactions, totalJuiceMessage].join("\n");

    let filterByOption = { empId: 123 };
    let actual = lib.fetchTransaction(logs, filterByOption);
    assert.deepStrictEqual(actual, expected);
  });
  it("should club all transaction details on given beverage ", function() {
    let orderDetails = {
      111: {
        orders: [
          { beverage: "watermelon", quantity: 2, date: "12:45" },
          { beverage: "orange", quantity: 1, date: "1:12" }
        ]
      },
      123: {
        orders: [
          { beverage: "orange", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      }
    };
    let filterByOption = { beverage: "watermelon" };

    let title = "EmployeeID, Beverage, Quantity, date";
    let transactions = "111,watermelon,2,12:45\n123,watermelon,1,1:12";
    let totalJuiceMessage = ["Total:", 3, "Juices"].join(" ");
    let expected = [title, transactions, totalJuiceMessage].join("\n");
    let actual = lib.fetchTransaction(orderDetails, filterByOption);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("displayForSave", function() {
  it("should give order fields in string", function() {
    let newOrder = {
      beverage: "orange",
      quantity: 2,
      empId: 123
    };
    let mockDate = new Date("2019-11-29T15:20:21.926Z");
    let actual = lib.displayForSave(newOrder, mockDate);
    let status = "Transaction Recorded:";
    let title = "EmployeeID, Beverage, Quantity, date";
    let detail = [123, "orange", 2, "2019-11-29T15:20:21.926Z"].join(",");
    let expected = [status, title, detail].join("\n");
    assert.strictEqual(actual, expected);
  });
});

describe("displayForQuery", function() {
  it("should give transactions with total beverage count in string", function() {
    let orderList = [
      { beverage: "orange", quantity: 1, date: "11:00", empId: 222 },
      { beverage: "watermelon", quantity: 2, date: "12:34", empId: 111 },
      3
    ];
    let actual = lib.displayForQuery(orderList);
    let title = "EmployeeID, Beverage, Quantity, date";
    let transactions = "222,orange,1,11:00\n111,watermelon,2,12:34";
    let totalJuiceMessage = ["Total:", 3, "Juices"].join(" ");
    let expected = [title, transactions, totalJuiceMessage].join("\n");
    assert.strictEqual(actual, expected);
  });
  it("should give transactions with total beverage count and should display Juice if count is 1 or 0 ", function() {
    let orderList = [
      { beverage: "orange", quantity: 1, date: "11:00", empId: 222 },
      1
    ];
    let actual = lib.displayForQuery(orderList);
    let title = "EmployeeID, Beverage, Quantity, date";
    let transactions = "222,orange,1,11:00";
    let totalJuiceMessage = ["Total:", 1, "Juice"].join(" ");
    let expected = [title, transactions, totalJuiceMessage].join("\n");
    assert.strictEqual(actual, expected);
  });
});
