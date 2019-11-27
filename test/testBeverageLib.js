"use strict";
const fs = require("fs");
const assert = require("assert");
let file = "../src/beverageLib";
const lib = require(file);

describe("getFileOperation", function() {
  it("should give an object of required fs functions,path & encoding", function() {
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
  it("should return saveTransaction reference", function() {
    assert.strictEqual(lib.getActionReference("--save"), lib.saveTransaction);
  });
  it("should return FetchTransaction reference", function() {
    assert.strictEqual(lib.getActionReference("--query"), lib.fetchTransaction);
  });
});

describe("getDisplayReference", function() {
  it("should return saveTransaction reference", function() {
    assert.strictEqual(lib.getDisplayReference("--save"), lib.displayForSave);
  });
  it("should return FetchTransaction reference", function() {
    assert.strictEqual(lib.getDisplayReference("--query"), lib.displayForQuery);
  });
});

describe("parseArg", function() {
  it("should parse arguments into object fields", function() {
    let userArg = [
      ["--beverage", "orange"],
      ["--qty", "1"],
      ["--empID", 123]
    ];
    let actual = lib.parseArg(userArg);
    let expected = {
      beverage: "orange",
      quantity: 1,
      empID: 123
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
  it("should make another Object for non existing employee", function() {
    let newOrder = {
      beverage: "orange",
      quantity: 1,
      empID: 111
    };
    let actual = lib.saveTransaction({}, newOrder, mockDate, fileOperation);
    let expected = {
      111: {
        orders: [
          {
            beverage: "orange",
            quantity: 1,
            date: mockDate
          }
        ]
      }
    };
    assert.deepStrictEqual(actual, expected);
    assert.strictEqual(writerIsCalled, 1);
    writerIsCalled = 0;
  });
  it("should add current order with the existing operationArg for existing employee", function() {
    let existingoperationArg = {
      123: {
        orders: [{ beverage: "orange", quantity: 1, date: "11:00" }]
      }
    };

    let newOrder = {
      beverage: "watermelon",
      quantity: 2,
      empID: 123
    };
    let actual = lib.saveTransaction(
      existingoperationArg,
      newOrder,
      mockDate,
      fileOperation
    );
    let expected = {
      123: {
        orders: [
          { beverage: "orange", quantity: 1, date: "11:00" },
          {
            beverage: "watermelon",
            quantity: 2,
            date: mockDate
          }
        ]
      }
    };
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
  it("should add field quantity of each object of given array", function() {
    assert.strictEqual(actual, 4);
  });
});

describe("fetchTransaction", function() {
  it("should give order and totalBeverageCount details of given employee", function() {
    let logs = {
      123: {
        orders: [
          { beverage: "watermelon", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      },
      111: {
        orders: [
          { beverage: "orange", quantity: 2, date: "12:45" },
          { beverage: "watermelon", quantity: 1, date: "1:12" }
        ]
      }
    };
    let expected = [
      { beverage: "orange", quantity: 2, date: "12:45" },
      { beverage: "watermelon", quantity: 1, date: "1:12" },
      3
    ];
    let empDetail = { empID: 111 };
    let actual = lib.fetchTransaction(logs, empDetail);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("displayForSave", function() {
  it("should return order fields in string", function() {
    let logs = {
      "123": {
        orders: [{ beverage: "orange", quantity: 1, date: "11:00" }]
      }
    };
    let actual = lib.displayForSave(logs, 123);
    let status = "Transaction Recorded:";
    let title = "EmployeeID, Beverage, Quantity, date";
    let ordersfields = logs["123"]["orders"][0];
    let detail = [
      "123",
      ordersfields["beverage"],
      ordersfields["quantity"],
      ordersfields["date"]
    ].join(",");
    let expected = [status, title, detail].join("\n");
    assert.strictEqual(actual, expected);
  });
});

describe("displayForQuery", function() {
  it("should display all transactions of given employee with total beverage count", function() {
    let orderList = [
      { beverage: "orange", quantity: 1, date: "11:00" },
      { beverage: "watermelon", quantity: 2, date: "12:34" },
      3
    ];
    let actual = lib.displayForQuery(orderList, 123);
    let title = "EmployeeID, Beverage, Quantity, date";
    let transactions = "123,orange,1,11:00\n123,watermelon,2,12:34";
    let totalJuiceMessage = ["Total:", 3, "Juices"].join(" ");
    let expected = [title, transactions, totalJuiceMessage].join("\n");
    assert.strictEqual(actual, expected);
  });
});
