const xlsx = require("xlsx");
const workbook = xlsx.readFile("./cong.xlsx");
// Lấy dữ liệu từ sheet "Chấm công"
const sheetName = "Chấm công";
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// Lọc ra những data còn trống
const addMissingKey = (object) => {
  [object].forEach((obj) => {
    let prevValue = null;
    console.log();
    for (let i = 1; i <= 140; i++) {
      const key = `__EMPTY_${i}`;
      if (!(key in obj)) {
        obj[key] = prevValue;
      } else {
        prevValue = obj[key];
      }
    }
  });
};
addMissingKey(data[1]);

// Khởi tạo một đối tượng rỗng để chứa dữ liệu
const allData = {};

// Loop qua 4 hàng nhân viên
for (let row = 4; row < data.length; row++) {
  // Khởi tạo biến
  let totalMoney = 0; //Tổng tiền
  let moneyArray = []; // Lưu số tiền từng người
  let personObj = {}; // Thông tin từng người join
  let gcVal = null;
  let cnVal = null;
  let tcVal = null;
  let gc1Val = null;
  let tc1Val = null;
  let wkd = null;

  // Loop qua từng cột của hàng thứ 4 trong data
  for (let column in data[3]) {
    const value = data[3][column]; //
    const colValue = data[row][column] !== undefined ? data[row][column] : 0;
    // Nếu cột có value là '$', đẩy giá trị tương ứng của hàng này vào mảng moneyArray
    if (value == "$") {
      moneyArray.push(colValue);
    }
    // Nếu true, add value tương ứng cho gcVal. False, add value này vào đối tượng personObj với key là tên của người đó (data[1][column])
    if (value == "GC") {
      if (gcVal === null) {
        gcVal = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          GC: colValue,
        };
      }
    }
    // console.log(personObj);

    if (value == "CN") {
      if (cnVal === null) {
        cnVal = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          CN: colValue,
        };
      }
    }

    if (value == "GC1") {
      if (gc1Val === null) {
        gc1Val = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          GC1: colValue,
        };
      }
    }

    if (value == "TC") {
      if (tcVal === null) {
        tcVal = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          TC: colValue,
        };
      }
    }

    if (value == "TC1") {
      if (tc1Val === null) {
        tc1Val = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          TC1: colValue,
        };
      }
    }

    if (value == "WKD") {
      if (wkd === null) {
        wkd = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          WKD: colValue,
        };
      }
    }

    // Loop qua từng personObj để đẩy obj vào person
    for (let person in personObj) {
      // Cộng dồn để lấy tổng tiền của mỗi người * gtri trong personObj đối tượng các gtri tương ứng trog moneyArrray và thêm vào totalMoney.
      totalMoney +=
        (personObj[person]["CN"] !== undefined ? personObj[person]["CN"] : 0) *
          moneyArray[0] +
        (personObj[person]["GC"] !== undefined ? personObj[person]["GC"] : 0) *
          moneyArray[1] +
        (personObj[person]["TC"] !== undefined ? personObj[person]["TC"] : 0) *
          moneyArray[2] +
        (personObj[person]["GC1"] !== undefined
          ? personObj[person]["GC1"]
          : 0) *
          moneyArray[3] +
        (personObj[person]["TC1"] !== undefined
          ? personObj[person]["TC1"]
          : 0) *
          moneyArray[4];

      //Tổng tiền ngày
      // personObj[person]["totalMoney"] = ...: update personObj đối tượng bằng một cặp key-value mới (key = "totalMoney", value = tổng tiền tính cho người hiện tại)
      personObj[person]["totalMoney"] =
        (personObj[person]["CN"] !== undefined ? personObj[person]["CN"] : 0) *
          moneyArray[0] +
        (personObj[person]["GC"] !== undefined ? personObj[person]["GC"] : 0) *
          moneyArray[1] +
        (personObj[person]["TC"] !== undefined ? personObj[person]["TC"] : 0) *
          moneyArray[2] +
        (personObj[person]["GC1"] !== undefined
          ? personObj[person]["GC1"]
          : 0) *
          moneyArray[3] +
        (personObj[person]["TC1"] !== undefined
          ? personObj[person]["TC1"]
          : 0) *
          moneyArray[4];
      // Cộng tổng số tiền vào đối tượng personObj
      personObj["totalMoney"] = totalMoney;
    }

    allData[data[row].__EMPTY_2] = personObj; //update allData
  }
}
console.log(allData);
