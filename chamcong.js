const xlsx = require("xlsx");
const workbook = xlsx.readFile("./cong.xlsx");
// Lấy dữ liệu từ sheet "Chấm công"
const sheetName = "Chấm công";
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);
// console.log(data);

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

// Vòng lặp này đi qua từng hàng dữ liệu bắt đầu từ hàng thứ 4 là 4 NV trong bảng excel
for (let row = 4; row < data.length; row++) {
  let totalMoney = 0; //Tổng tiền
  // Khởi tạo biến
  let moneyArray = []; // Lưu số tiền từng người
  let personObj = {}; // Thông tin từng người join
  let gcVal = null;
  let cnVal = null;
  let tcVal = null;
  let gc1Val = null;
  let tc1Val = null;
  let wkd = null;

  // Vòng lặp này đi qua từng cột của hàng thứ 4 (chứa thông tin về các cột)
  for (let column in data[3]) {
    // Nếu cột là cột tiền tệ, đẩy giá trị tương ứng của hàng này vào mảng moneyArray
    const value = data[3][column];
    const colValue = data[row][column] !== undefined ? data[row][column] : 0;
    if (value == "$") {
      moneyArray.push(colValue);
    }
    // Nếu cột là GC, lưu giá trị tương ứng cho hàng này vào biến gcVal
    // Nếu không, hãy thêm giá trị này vào đối tượng personObj với khóa là tên của người đó (data[1][column])
    if (value == "GC") {
      if (gcVal === null) {
        gcVal = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          GC: colValue,
        }; //tìm GC và thên vào
      }
    }
    // console.log(personObj);
    // Logic tương tự như trên áp dụng cho các cột CN, GC1, TC, TC1
    if (value == "CN") {
      if (cnVal === null) {
        cnVal = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          CN: colValue,
        }; //tìm CN và thên vào
      }
    }
    if (value == "GC1") {
      if (gc1Val === null) {
        gc1Val = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          GC1: colValue,
        }; //tìm GC1 và thên vào
      }
    }
    if (value == "TC") {
      if (tcVal === null) {
        tcVal = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          TC: colValue,
        }; //tìm TC và thên vào
      }
    }
    if (value == "TC1") {
      if (tc1Val === null) {
        tc1Val = colValue;
      } else {
        personObj[data[1][column]] = {
          ...personObj[data[1][column]],
          TC1: colValue,
        }; //tìm TC1 và thên vào
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

    for (let person in personObj) {
      // Cộng dồn để lấy tổng tiền tháng
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

    allData[data[row].__EMPTY_2] = personObj;
  }
}
// Đăng nhập đối tượng allpersonObj
console.log(allData);
